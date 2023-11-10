import axios from "axios";
import { defineStore } from "pinia";
import Customer from "@/models/Customer";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import { Order } from "@/models/Order";
import Business from "@/models/Business";
import User from "@/models/User";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as Customer[],
    nextLink: null as string | null,
    orders: [] as Order[],
    creditPayments: [],
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
          this.nextLink = null;
          this.customers = [];
        }
        if (this.customers.length && !this.nextLink) {
          return;
        }
        if (params.name_like) {
          this.nextLink = null;
        }
        const link = this.nextLink || `/v2/businesses/${business.id}/customers`;

        const response = await axios.get(link, { params });
        if (response) {
          const { data, links, meta } = response.data;
          this.customers = [
            ...this.customers,
            ...data.map((el: any) => new Customer(el)),
          ];
          this.meta = meta;
          this.nextLink = links.next;

          return this.customers;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return [];
    },
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
      const customer = customers.find((c: Customer) => c.id == customer_id);
      return new Customer(customer);
    },
    // async getCustomer(business: Business, customer_id: any): Promise<Customer> {
    //   return axios
    //     .get(`/v2/businesses/${business.id}/customers/${customer_id}`)
    //     .then((response) => {
    //       if (response.status >= 200 && response.status < 300) {
    //         const data = response.data.data;
    //         return data;
    //       }
    //     });
    // },

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
    async receivedOrders(customerId: any, options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: customerId,
          limit: 50,
          ...options,
        };
        const response = await axios.get("/v2/orders", { params });

        if (response.status === 200) {
          const ordersData = response.data.data;
          this.orders = ordersData.map((data: any) => new Order(data));
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchCustomerCredits(customerId: any, options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: customerId,
          limit: 50,
          ...options,
        };
        const response = await axios.get("/v2/sale-payments", { params });

        if (response.status === 200) {
          const creditData = response.data.data;
          this.creditPayments = creditData.map((data: any) => new Order(data));
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchOrder(orderId: number): Promise<Order | null> {
      try {
        const response = await axios.get(`/v2/orders/${orderId}`);
        if (response.status == 200) {
          const order = new Order(response.data.data);
          return order;
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    clearCustomers() {
      this.customers = [];
    },
  },
});
