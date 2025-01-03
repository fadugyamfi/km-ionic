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
const KOLA_RECORDED_REQUESTS = "kola.recorded-requests";

export const useRequestStore = defineStore("request", {
  state: () => {
    return {
      agentRequests: [] as AgentRequest[],
      newRequest: new AgentRequest({}),
      recordedRequests: [] as AgentRequest[],
      requestSyncTimer: null as any,
      approving: false,
      declining: false,
      cancelling: false,
      settingAsDelivered: false,
    };
  },

  actions: {
    resetForNewRequest() {
      this.newRequest = new AgentRequest({
        uuid: uuidv4(),
        businesses_id: userStore.activeBusiness?.id,
        cms_users_id: userStore.user?.id,
        delivery_location: "",
        gps_location: "-",
        request_started_at: formatMySQLDateTime(new Date().toISOString()),
        request_ended_at: "",
        total_items: 0,
        items: [] as OrderItem[],
        total_price: 0,
      });
      this.persist();
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
    },
    removeProductFromRequest(product: Product) {
      const index = this.newRequest.items?.findIndex(
        (item: OrderItem) => item.products_id == product.id
      );
      this.newRequest.items?.splice(index as number, 1);
    },

    async loadFromStorage() {
      let newRequestData = await storage.get(KOLA_SALE_AGENT_REQUEST);

      Object.assign(this.newRequest, newRequestData);
    },

    async fetchAgentRequests(options = {}): Promise<AgentRequest[] | null> {
      try {
        const params = {
          limit: 25,
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
        this.cancelling = true;
        const response = await axios.delete(`/v2/agent-requests/${request_id}`);
        toastStore.showSuccess("Request cancelled successfully");
        return response.data.data;
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to cancel request");
        return null;
      } finally {
        this.cancelling = false;
      }
    },
    async approveRequest(
      request_id: string | number,
      form: {
        approved_by: number | string;
        approved_at: string;
        est_delivery_at: string;
        comment: string;
      }
    ) {
      try {
        this.approving = true;
        const response = await axios.put(
          `/v2/agent-requests/${request_id}/approve`,
          form
        );
        toastStore.showSuccess("Request approved successfully");
        const index = this.agentRequests.findIndex(
          (request) => request.id == response.data.id
        );
        if (index > -1) {
          this.agentRequests[index].approved_by = response.data.approved_by;
        }
        return response.data;
      } catch (error) {
        console.log(error);
        handleAxiosRequestError(error);
        toastStore.showError("Failed to approve request");
        return null;
      } finally {
        this.approving = false;
      }
    },
    async setDelivered(
      request_id: string | number,
      form: {
        approved_by: number | string;
        approved_at: string;
        status: number;
        actual_delivery_at: string;
        comment: string;
      }
    ) {
      try {
        this.settingAsDelivered = true;
        const response = await axios.put(
          `/v2/agent-requests/${request_id}/delivered`,
          form
        );
        toastStore.showSuccess("Agent request marked as delivered");
        const index = this.agentRequests.findIndex(
          (request) => request.id == response.data.agentRequest.id
        );
        if (index > -1) {
          this.agentRequests[index].status = response.data.agentRequest.status;
        }
        return response.data.agentRequest;
      } catch (error) {
        console.log(error);
        handleAxiosRequestError(error);
        toastStore.showError("Failed to mark as delivered");
        return null;
      } finally {
        this.settingAsDelivered = false;
      }
    },
    async declineRequest(request_id: string | number, form: any) {
      try {
        this.declining = true;
        const response = await axios.put(
          `/v2/agent-requests/${request_id}/reject`,
          form
        );
        console.log(response);
        toastStore.showSuccess("Request declined successfully");
        this.agentRequests = this.agentRequests.filter(
          (item) => item.id !== response.data.id
        );
        return response.data;
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to decline request");
        return null;
      } finally {
        this.declining = false;
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
    },
  },
});
