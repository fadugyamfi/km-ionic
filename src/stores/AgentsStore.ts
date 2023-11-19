import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useAgentsStore = defineStore("agents", {
  state: () => ({
    agents: [] as User[],
    meta: {},
  }),
  actions: {
    async getBusinessSaleAgents(
      business: Business,
      limit: number = 50,
      options = {},
      refresh = false
    ): Promise<User[]> {
      const cacheKey = `kola.business.${business.id}.sale-agents`;

      if ((await storage.has(cacheKey)) && !refresh) {
        const data = await storage.get(cacheKey);
        return data.map((el: object) => new User(el));
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
          const agents: User[] = data.map((el: any) => new User(el));

          await storage.set(cacheKey, agents, 7, "days");

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
      filter: string = "by-volume",
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
    // async createBusinessCustomer(postData: Object): Promise<Customer | null> {
    //   const userStore = useUserStore();
    //   return axios
    //     .post(
    //       `/v2/businesses/${userStore.activeBusiness?.id}/customers`,
    //       postData
    //     )
    //     .then((response) => {
    //       if (response.status >= 200 && response.status < 300) {
    //         const data = response.data.data;
    //         return data;
    //       }
    //     })
    //     .catch((error) => handleAxiosRequestError(error));
    // },
    // async updateCustomer(
    //   postData: Object,
    //   customer_id: any
    // ): Promise<Customer | null> {
    //   const userStore = useUserStore();
    //   return axios
    //     .put(
    //       `/v2/businesses/${userStore.activeBusiness?.id}/customers/${customer_id}`,
    //       postData
    //     )
    //     .then((response) => {
    //       if (response.status >= 200 && response.status < 300) {
    //         const data = response.data.data;
    //         return data;
    //       }
    //     })
    //     .catch((error) => handleAxiosRequestError(error));
    // },

    async getAgent(business: Business, agent_id: any): Promise<User | null> {
      try {
        const response = await axios.get(`/v2/sale-agents/${agent_id}`);
        if (response) {
          const agent = response.data.data;
          return new User(agent);
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async deleteAgent(agent: User) {
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
  },
});
