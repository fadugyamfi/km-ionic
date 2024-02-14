import { defineStore } from "pinia";
import { useToastStore } from "./ToastStore";
import AgentRequest from "@/models/AgentRequest";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";

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
  },
});
