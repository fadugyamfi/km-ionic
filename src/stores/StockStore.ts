import { defineStore } from "pinia";
import axios from "axios";
import { useToastStore } from "./ToastStore";
import { handleAxiosRequestError } from "../utilities";
import { FavoritedProduct } from "../models/types";
import Stock from "@/models/Stock";
import { useUserStore } from "./UserStore";

export const useStockStore = defineStore("stock", {
  state: () => {
    return {
      stocks: [] as Stock[],
      meta: { total: null as number | null },
      selectedStock: null as Stock | null,
      recentlyViewedStocks: [] as Stock[],
      productGroups: [],
      productVariations: [],
      productUnits: [],
      searchTerm: "",
    };
  },

  actions: {
    async fetchSearchedStocks(page = 1, limit = 50): Promise<Stock[]> {
      try {
        const products = await this.fetchStocks({
          product_name_has: this.searchTerm,
          limit,
          page,
        });

        return products;
      } catch (error) {
        return [];
      }
    },

    async fetchStocks(options = {}): Promise<Stock[]> {
      const business_id = useUserStore().activeBusiness?.id;
      const params = {
        ...options,
        businesses_id: business_id,
      };

      try {
        const response = await axios.get("/v2/products", { params });
        this.stocks = this.mapResponseToStocks(response);
        this.meta = response.data.meta;

        return this.stocks;
      } catch (error) {
        handleAxiosRequestError(error);

        return [];
      }
    },

    mapResponseToStocks(response: { data: any }): Stock[] {
      return response.data.data.map((el: object) => new Stock(el));
    },

    async getProducts(): Promise<Stock[]> {
      if (this.stocks.length == 0) {
        await this.fetchStocks();
      }

      return this.stocks;
    },

    async fetchStock(product_id: number): Promise<Stock | null> {
      try {
        const response = await axios.get(`/v2/products/${product_id}`);
        const product = new Stock(response.data.data);

        return product;
      } catch (error) {
        handleAxiosRequestError(error);

        return null;
      }
    },
    async deleteStock(stock: Stock) {
      return axios
        .delete(`/v2/products/${stock.id}`)
        .then(() => {
          const index = this.stocks.findIndex((s) => s.id == stock.id);
          if (index > -1) {
            this.stocks.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },
    async fetchProductGroups() {
      try {
        const response = await axios.get("v2/product-groups");
        if (response) {
          this.productGroups = response.data.data;
          return this.productGroups;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchProductVariations() {
      try {
        const response = await axios.get("v2/product-variations");
        if (response) {
          this.productVariations = response.data.data;
          return this.productVariations;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchProductUnits() {
      try {
        const response = await axios.get("v2/product-units");
        if (response) {
          this.productUnits = response.data.data;
          return this.productUnits;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async addStock(stockData: Object) {
      return axios
        .post("v2/products", stockData)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },
    async fetchProduct(product_id: number | string): Promise<Stock | null> {
      try {
        const response = await axios.get(`/v2/products/${product_id}`);
        const product = new Stock(response.data.data);

        return product;
      } catch (error) {
        handleAxiosRequestError(error);

        return null;
      }
    },
    async updateStock(
      product_id: number | string,
      formData: Object
    ): Promise<Stock | null> {
      try {
        const response = await axios.put(
          `/v2/products/${product_id}`,
          formData
        );
        const product = new Stock(response.data.data);
        return product;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
