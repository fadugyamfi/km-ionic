import axios from "axios";
import { defineStore } from "pinia";
import { useToastStore } from "@/stores/ToastStore";
import AppStorage from "./AppStorage";
import User from "@/models/User";
import { SaleType } from "@/models/SaleType";
import { Sale } from "@/models/Sale";
import Product from "../models/Product";
import { SaleItem } from "../models/SaleItem";
import { useUserStore } from "./UserStore";
import {
  formatDateMySQL,
  formatMySQLDateTime,
  handleAxiosRequestError,
} from "../utilities";
import { SalePayment } from "../models/SalePayment";
import Business from "../models/Business";
import { useGeolocation } from "../composables/useGeolocation";
import { useProductStore } from "./ProductStore";
import { v4 as uuidv4 } from "uuid";
import { useAppStore } from "./AppStore";

const storage = new AppStorage();
const KOLA_SALES = "kola.sales";
const KOLA_SALE_AGENT_SALE = "kola.sale-agent-sale";
const KOLA_INVENTORY = "kola.sales.inventory";
const KOLA_AGENT_INVENTORY = "kola.sales.agent-inventory";
const KOLA_RECORDED_SALES = "kola.recorded-sales";

export const useSaleStore = defineStore("sale", {
  state() {
    return {
      newSale: new Sale({}),
      sales: [] as Sale[],
      recordedSales: [] as Sale[],
      selectedCustomer: {} as Business,
      saleSyncTimer: null as any,
      inventory: [] as Product[],
      agentInventory: [] as Product[],
    };
  },

  actions: {
    async loadFromStorage() {
      let newSaleData = await storage.get(KOLA_SALE_AGENT_SALE);
      Object.assign(this.newSale, newSaleData);
    },

    async loadCachedRecordedSales() {
      if (this.recordedSales.length > 0) {
        return;
      }

      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_SALES}.${userStore.activeBusiness?.id}`;

      const records = await storage.get(CACHE_KEY);

      if (records) {
        this.recordedSales = records.map(
          (record: object) => new Sale(record)
        ) as Sale[];
      }

      this.startSaleDataSync();
    },

    async startSaleDataSync() {
      if (this.saleSyncTimer != null) {
        return;
      }

      console.log("Starting sale data sync");

      const appStore = useAppStore();

      this.saleSyncTimer = setInterval(async () => {
        if (this.recordedSales.length == 0 || !appStore.networkConnected) {
          return;
        }

        const sale = this.recordedSales.shift() as Sale;

        try {
          const synced = await this.recordSaleOnline(sale);
          if (synced) {
            this.persistRecordedSales(); // save new cache without synced sale
          } else {
            this.recordedSales.push(sale);
          }
        } catch (error: any) {
          if (!error.message.includes("duplicate")) {
            this.recordedSales.push(sale);
          } else {
            this.persistRecordedSales();
          }
        }
      }, 1000 * 15);
    },

    resetForNewSale() {
      const userStore = useUserStore();

      this.newSale = new Sale({
        uuid: uuidv4(),
        businesses_id: userStore.activeBusiness?.id,
        cms_users_id: userStore.user?.id,
        credits_id: 1,
        gps_location: "-",
        delivery_location: "Ghana",
        product_units_id: 1,
        payment_modes_id: 1,
        inventory_id: 1,
        sale_types_id: 1,
        sale_started_at: formatMySQLDateTime(new Date().toISOString()),
        sale_ended_at: "",
        total_items: 0,
        total_sales_price: 0,
        total_discount: 0,
        description: "",
        due_date: new Date().toISOString()
      });
    },

    addProductToSale(product: Product) {
      const saleItem = new SaleItem({
        uuid: uuidv4(),
        quantity: 1,
        unit_price: product.product_price,
        total_price: product.product_price,
        products_id: product.id,
        product: product,
        product_units_id: 1,
        currencies_id: 1,
        cms_users_id: this.newSale.cms_users_id,
        businesses_id: this.newSale.businesses_id,
        description: "",
        is_on_sale: 0,
      });
      this.newSale.sale_items?.push(saleItem);
    },

    removeProductFromSale(product: Product) {
      const index = this.newSale.sale_items?.findIndex(
        (item: SaleItem) => item.products_id == product.id
      );
      this.newSale.sale_items?.splice(index as number, 1);
    },

    isProductSelected(product: Product): boolean {
      const index = this.newSale.sale_items?.findIndex(
        (item: SaleItem) => item.products_id == product.id
      ) as number;

      return !isNaN(index) ? index > -1 : false;
    },

    async recordSale(): Promise<Sale | null> {
      const location = useGeolocation();
      const coordinates = await location.getCurrentLocation();

      this.newSale.update({
        sale_ended_at: formatMySQLDateTime(new Date().toISOString()),
        gps_location: coordinates
          ? `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`
          : "-",
      });

      this.recordedSales.push(this.newSale);
      this.persistRecordedSales();
      this.startSaleDataSync();

      return this.newSale;
    },

    async persistRecordedSales() {
      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_SALES}.${userStore.activeBusiness?.id}`;

      storage.set(CACHE_KEY, this.recordedSales, 14, "days");
    },

    async recordSaleOnline(sale: Sale): Promise<Sale | null> {
      const payload = Object.assign({}, sale, {
        sale_items: sale._sale_items,
      });

      return axios
        .post("/v2/sales", payload)
        .then((response) => {
          const savedSale = new Sale(response.data.data);
          const unsyncedIndex = this.sales.findIndex(
            (s: Sale) => s.uuid == sale.uuid
          );

          if (unsyncedIndex > -1) {
            this.sales[unsyncedIndex] = sale;
          } else {
            this.sales.unshift(savedSale);
          }

          return savedSale;
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          throw new Error(error.response.data.api_message);
        });
    },

    async fetchInventory(options = {}) {
      if (this.inventory.length > 0) {
        return this.inventory;
      }

      const userStore = useUserStore();
      const productStore = useProductStore();

      const CACHE_KEY = `${KOLA_INVENTORY}.${userStore.activeBusiness?.id}`;

      if (await storage.has(CACHE_KEY)) {
        const data = await storage.get(CACHE_KEY);
        this.inventory = data.map((p: object) => new Product(p));
        return this.inventory;
      }

      const params = {
        businesses_id: userStore.activeBusiness?.id,
        limit: 500,
        sort: "latest",
        stock_quantity_gt: 0,
        ...options,
      };

      const products = await productStore.fetchProducts(params);

      if (products) {
        storage.set(CACHE_KEY, products, 1, "days");
        this.inventory = products;
      }

      return products;
    },
    async fetchAgentInventory(options = {}) {
      if (this.agentInventory.length > 0) {
        return this.agentInventory;
      }

      const userStore = useUserStore();
      const productStore = useProductStore();

      const CACHE_KEY = `${KOLA_AGENT_INVENTORY}.${userStore.activeBusiness?.id}`;

      if (await storage.has(CACHE_KEY)) {
        const data = await storage.get(CACHE_KEY);
        this.agentInventory = data.map((p: object) => new Product(p));
        return this.agentInventory;
      }

      const params = {
        limit: 500,
        sort: "latest",
        ...options,
      };

      const products = await productStore.fetchAgentProducts(params);

      if (products) {
        storage.set(CACHE_KEY, products, 7, "days");
        this.agentInventory = products;
      }

      return products;
    },

    async fetchSales(options = {}): Promise<Sale[]> {
      const userStore = useUserStore();
      const params = {
        businesses_id: userStore.activeBusiness?.id,
        limit: 50,
        ...options,
      };

      return axios
        .get("/v2/sales", { params })
        .then((response) => {
          const sales = response.data.data.map((el: object) => new Sale(el));

          this.sales = [...sales];

          return sales;
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          return [];
        });
    },

    async fetchSale(sale_id: number, options = {}): Promise<Sale | null> {
      const params = { ...options };

      return axios
        .get(`/v2/sales/${sale_id}`, { params })
        .then((response) => {
          return new Sale(response.data.data);
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          return null;
        });
    },

    async deleteSale(sale: Sale) {
      return axios
        .delete(`/v2/sales/${sale.id}`)
        .then(() => {
          const index = this.sales.findIndex((s) => s.id == sale.id);
          if (index > -1) {
            this.sales.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },

    async recordRepayment(payment: SalePayment) {
      return axios
        .post(`/v2/sale-payments`, payment)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            payment.update(response.data.data);
            return payment;
          } else {
            handleAxiosRequestError(response);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          return error;
        });
    },
    async fetchSalesSummary(options: {}) {
      const userStore = useUserStore();
      const params = {
        businesses_id: userStore.activeBusiness?.id,
        ...options,
      };
      return axios
        .get("v2/sales/summary", { params })
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          return null;
        });
    },
    async persist() {
      await storage.set(KOLA_SALE_AGENT_SALE, this.newSale, 1, "days");
    },
  },
});
