import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import AgentRequest from "@/models/AgentRequest";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";
import { useToastStore } from "./ToastStore";
import router from "@/router";

const userStore = useUserStore();
const toastStore = useToastStore();

export const useRequestStore = defineStore("request", {
  state: () => {
    return {
      agentRequests: [] as AgentRequest[],
    };
  },

  actions: {
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
  },
});
