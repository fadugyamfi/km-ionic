import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import AgentRequest from "@/models/AgentRequest";
import axios from "axios";
import { useToastStore } from "./ToastStore";
import router from "@/router";
import Business from "@/models/Business";
import { v4 as uuidv4 } from "uuid";
import {
  formatDateMySQL,
  formatMySQLDateTime,
  handleAxiosRequestError,
} from "../utilities";
import AppStorage from "./AppStorage";
import Product from "@/models/Product";
import { OrderItem } from "@/models/OrderItem";
import { useGeolocation } from "../composables/useGeolocation";
import { useAppStore } from "./AppStore";

const userStore = useUserStore();
const toastStore = useToastStore();

const storage = new AppStorage();

const KOLA_SALE_AGENT_REQUEST = "kola.sale-agent-request";
const KOLA_AGENT_REQUEST_SELECTED_CUSTOMER =
  "kola.agent-request-selected-customer";
const KOLA_RECORDED_REQUESTS = "kola.recorded-requests";

export const useRequestStore = defineStore("request", {
  state: () => {
    return {
      agentRequests: [] as AgentRequest[],
      newRequest: new AgentRequest({}),
      selectedCustomer: null as Business | null,
      recordedRequests: [] as AgentRequest[],
      requestSyncTimer: null as any,
    };
  },

  actions: {
    resetForNewRequest() {
      this.newRequest = new AgentRequest({
        uuid: uuidv4(),
        businesses_id: userStore.activeBusiness?.id,
        cms_users_id: userStore.user?.id,
        credits_id: 1,
        gps_location: "-",
        product_units_id: 1,
        payment_modes_id: 1,
        request_started_at: formatMySQLDateTime(new Date().toISOString()),
        request_ended_at: "",
        total_items: 0,
        items: [] as OrderItem[],
        total_sales_price: 0,
      });
      console.log(this.newRequest);
    },
    async loadCachedRecordedRequests() {
      if (this.recordedRequests.length > 0) {
        return;
      }

      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_REQUESTS}.${userStore.activeBusiness?.id}`;

      const requests = await storage.get(CACHE_KEY);

      if (requests) {
        this.recordedRequests = requests.map(
          (record: object) => new AgentRequest(record)
        ) as AgentRequest[];
      }

      this.startRequestDataSync();
    },
    async startRequestDataSync() {
      if (this.requestSyncTimer != null) {
        return;
      }

      console.log("Starting order data sync");

      const appStore = useAppStore();

      this.requestSyncTimer = setInterval(async () => {
        if (this.recordedRequests.length == 0 || !appStore.networkConnected) {
          return;
        }

        const request = this.recordedRequests.shift() as AgentRequest;

        try {
          const synced = await this.recordRequestOnline(request);
          if (synced) {
            this.persistRecordedRequests(); // save new cache without synced sale
          } else {
            this.recordedRequests.push(request);
          }
        } catch (error: any) {
          if (!error.message.includes("duplicate")) {
            this.recordedRequests.push(request);
          } else {
            this.persistRecordedRequests();
          }
        }
      }, 1000 * 15);
    },
    async recordRequestOnline(
      request: AgentRequest
    ): Promise<AgentRequest | null> {
      const payload = Object.assign({}, request, {
        items: request.items,
      });

      return axios
        .post("/v2/agent-requests", payload)
        .then((response) => {
          const savedRequest = new AgentRequest(response.data.data);
          const unsyncedIndex = this.agentRequests.findIndex(
            (o: AgentRequest) => o.uuid == request.uuid
          );

          if (unsyncedIndex > -1) {
            this.agentRequests[unsyncedIndex] = request;
          } else {
            this.agentRequests.unshift(savedRequest);
          }

          return savedRequest;
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          throw new Error(error.response.data.api_message);
        });
    },
    isProductSelected(product: Product): boolean {
      const index = this.newRequest.items?.findIndex(
        (item: OrderItem) => item.products_id == product.id
      ) as number;

      return !isNaN(index) ? index > -1 : false;
    },

    addProductToRequest(product: Product) {
      console.log(this.newRequest);
      console.log(product);
      const requestItem = new OrderItem({
        uuid: uuidv4(),
        quantity: 1,
        unit_price: product.product_price,
        total_price: product.product_price,
        products_id: product.id,
        product: product,
        product_units_id: 1,
        currencies_id: 1,
        cms_users_id: this.newRequest.cms_users_id,
        description: "",
        is_on_sale: 0,
        businesses_id: product.businesses_id,
        product_price: product.product_price,
        currency_symbol: product.currency?.symbol,
        product_image: product.image,
        product_name: product.product_name,
      });
      this.newRequest.items?.push(requestItem);
      console.log(this.newRequest);
    },
    removeProductFromRequest(product: Product) {
      const index = this.newRequest.items?.findIndex(
        (item: OrderItem) => item.products_id == product.id
      );
      this.newRequest.items?.splice(index as number, 1);
    },

    async loadFromStorage() {
      let newRequestData = await storage.get(KOLA_SALE_AGENT_REQUEST);
      let selectedCustomerData = await storage.get(
        KOLA_AGENT_REQUEST_SELECTED_CUSTOMER
      );

      Object.assign(this.newRequest, newRequestData);
      Object.assign({}, this.selectedCustomer, selectedCustomerData);
    },

    async fetchAgentRequests(options = {}): Promise<AgentRequest[] | null> {
      try {
        const params = {
          limit: 25,
          // cms_users_id: userStore.user?.id,
          ...options,
        };
        const response = await axios.get("/v2/agent-requests", { params });
        const requestData = response.data.data.data.map(
          (item: AgentRequest) => new AgentRequest(item)
        );
        this.agentRequests = requestData;
        return this.agentRequests;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async fetchAgentRequest(request_id: string | number) {
      try {
        const response = await axios.get(`/v2/agent-requests/${request_id}`);
        const request = response.data.data;
        return request;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async cancelRequest(request_id: string | number) {
      try {
        const response = await axios.delete(`/v2/agent-requests/${request_id}`);
        toastStore.showSuccess("Request cancelled successfully");
        return response.data.data;
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to cancel request");
        return null;
      }
    },
    async recordRequest(): Promise<AgentRequest | null> {
      const location = useGeolocation();
      const coordinates = await location.getCurrentLocation();
      const newRequest = new AgentRequest(this.newRequest);
      newRequest?.update({
        request_ended_at: formatMySQLDateTime(new Date().toISOString()),
        gps_location: coordinates
          ? `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`
          : "-",
      });

      this.recordedRequests.push(newRequest);
      this.persistRecordedRequests();
      this.startRequestDataSync();

      return newRequest;
    },
    async persistRecordedRequests() {
      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_REQUESTS}.${userStore.activeBusiness?.id}`;

      storage.set(CACHE_KEY, this.recordedRequests, 14, "days");
    },
    async persist() {
      await storage.set(KOLA_SALE_AGENT_REQUEST, this.newRequest, 1, "days");
      await storage.set(
        KOLA_AGENT_REQUEST_SELECTED_CUSTOMER,
        this.selectedCustomer,
        1,
        "days"
      );
    },
  },
});
