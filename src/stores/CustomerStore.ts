import axios from "axios";
import { defineStore } from "pinia";
import Customer from "@/models/Customer";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as Customer[],
  }),
  actions: {
    async createBusinessCustomer(postData: Object): Promise<Customer | null> {
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
    ): Promise<Customer | null> {
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

    async getCustomer(business: Business, customer_id: any): Promise<Customer> {
      const cacheKey = `kola.business.${business.id}.customers`;
      await storage.has(cacheKey);
      const data = await storage.get(cacheKey);
      const customers = data.map((el: object) => new Business(el));
      return customers.find((c: Customer) => c.id == customer_id);
    },

    async deleteCustomer(customer: Customer) {
      const userStore = useUserStore();

      return axios
        .delete(
          `/v2/businesses/${userStore.activeBusiness?.id}/customers/${customer.id}`
        )
        .then(() => {
          const index = this.customers.findIndex((c) => c.id == customer.id);
          if (index > -1) {
            this.customers.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },
  },
});
