import { defineStore } from "pinia";
import { useToastStore } from "./ToastStore";
import AgentRequests from "@/models/AgentRequest";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";

export const useRequestStore = defineStore("request", {
  state: () => {
    return {
      agentRequests: [] as AgentRequests[],
    };
  },

  actions: {
    async fetchAgentRequests(options = {}) {
      try {
        const params = {
          limit: 25,
          ...options,
        };
        const response = await axios.get("/v2/agent-requests", { params });

        if (response.status === 200) {
          const requestData = response.data.data.data;
          this.agentRequests = requestData;
          return this.agentRequests;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchSingleAgentRequest(
      agentRequests: AgentRequests,
      agentRequest_id: any,
      options: Object
    ): Promise<AgentRequests | null> {
      try {
        const params = {
          agentsRequests_id: agentRequests.id,
          ...options,
        };
        const response = await axios.get(
          `/v2/agent-requests/${agentRequest_id}`,
          {
            params,
          }
        );

        if (response.status === 200) {
          const requestData = response.data.data.data;
          this.agentRequests = requestData;
          return new AgentRequests(agentRequests);
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
