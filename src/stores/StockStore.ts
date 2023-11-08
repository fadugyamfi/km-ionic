import axios from "axios";
import { defineStore } from "pinia";
import Stock from "@/models/Stock";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useCustomerStore = defineStore("stock", {
  state: () => ({
    stocks: [] as Stock[],
    nextLink: null as string | null,
    meta: {},
  }),
  actions: {
    async getBusinessCustomers(
      business: Business,
      limit: number = 100,
      options = {},
      refresh = false
    ): Promise<any> {
      try {
        const params = {
          limit,
          sort: "name:asc",
          name_like: "",
          ...options,
        };
        if (refresh) {
          this.stocks = [];
          this.nextLink = null;
        }
        if (this.stocks.length && !this.nextLink) {
          return;
        }
        if (params.name_like) {
          this.nextLink = null;
        }
        const link = this.nextLink || `/v2/businesses/${business.id}/customers`;

        const response = await axios.get(link, { params });
        if (response) {
          const { data, links, meta } = response.data;
          this.stocks = [...this.stocks, ...data];
          this.meta = meta;
          this.nextLink = links.next;

          return this.stocks;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return [];
    },
    async createBusinessCustomer(postData: Object): Promise<Stock | null> {
      const userStore = useUserStore();
      return axios
        .post(
          `/v2/businesses/${userStore.activeBusiness?.id}/customers`,
          postData
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },
    async updateCustomer(
      postData: Object,
      customer_id: any
    ): Promise<Stock | null> {
      const userStore = useUserStore();
      return axios
        .put(
          `/v2/businesses/${userStore.activeBusiness?.id}/customers/${customer_id}`,
          postData
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async getCustomer(business: Business, customer_id: any): Promise<Stock> {
      const cacheKey = `kola.business.${business.id}.customers`;
      await storage.has(cacheKey);
      const data = await storage.get(cacheKey);
      const customers = data.map((el: object) => new Business(el));
      return customers.find((c: Stock) => c.id == customer_id);
    },

    async deleteCustomer(customer: Stock) {
      const userStore = useUserStore();

      return axios
        .delete(
          `/v2/businesses/${userStore.activeBusiness?.id}/customers/${customer.id}`
        )
        .then(() => {
          const index = this.stocks.findIndex((c) => c.id == customer.id);
          if (index > -1) {
            this.stocks.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },
  },
});
