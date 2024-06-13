import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import Agent from "@/models/Agent";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import AppStorage from "./AppStorage";
import { Sale } from "../models/Sale";

const storage = new AppStorage();

export const useAgentsStore = defineStore("agents", {
  state: () => ({
    agents: [] as Agent[],
    meta: {},
    sales: [] as Sale[],
  }),
  actions: {
    async getBusinessSaleAgents(
      business: Business,
      limit: number = 50,
      options = {},
      refresh = false
    ): Promise<Agent[]> {
      const cacheKey = `kola.business.${business.id}.sale-agents`;

      if ((await storage.has(cacheKey)) && !refresh) {
        const data = await storage.get(cacheKey);
        this.agents = data.map((el: object) => new Agent(el));
        return this.agents;
      }

      try {
        const params = {
          businesses_id: business.id,
          limit,
          sort: "name:asc",
          ...options,
        };

        const response = await axios.get(`/v2/sale-agents`, { params });

        if (response) {
          const { data } = response.data;
          const agents: Agent[] = data.map((el: any) => new Agent(el));

          await storage.set(cacheKey, agents, 7, "days");
          this.agents = agents;
          return agents;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return [];
    },
    async fetchTopPerformingAgents(
      business: Business,
      limit: number = 50,
      options = {},
      filter: string = "by-value",
      refresh = false
    ): Promise<TopPerformingAgent[]> {
      try {
        const params = {
          businesses_id: business.id,
          limit,
          filter,
          ...options,
        };
        const response = await axios.get(`/v2/metrics/top-agents`, { params });

        if (response) {
          const { data } = response.data;
          const topPerformingAgents = data;
          return topPerformingAgents;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
      return [];
    },

    async getAgent(
      business: Business,
      agent_id: any,
      options: Object,
      refresh = false
    ): Promise<Agent | null> {
      try {
        const params = {
          businesses_id: business.id,
          ...options,
        };
        if (!refresh) {
          const agent = this.agents.find((agent) => agent.id === agent_id);
          if (agent) {
            return new Agent(agent);
          }
        }
        const response = await axios.get(`/v2/sale-agents/${agent_id}`, {
          params,
        });
        if (response) {
          const agent = response.data.data;
          return new Agent(agent);
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async deleteAgent(agent: Agent) {
      return axios
        .delete(`/v2/sale-agents/${agent.id}`)
        .then(() => {
          const index = this.agents.findIndex((c) => c.id == agent.id);
          if (index > -1) {
            this.agents.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },

    async fetchSales(options = {}): Promise<Sale[]> {
      const userStore = useUserStore();
      const params = {
        cms_users_id: userStore.user?.id,
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
  },
});
