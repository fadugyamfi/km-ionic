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
const CUSTOMERS_RESPONSE = "kola.customers.response";
const SEARCH_TERM = "kola.customer-search-term";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as Customer[],
    nextLink: null as string | null,
    orders: [] as Order[],
    searchTerm: "",
    creditPayments: [] as any,
    totalCustomers: 0,
    selectedCustomer: null as Customer | null,
  }),
  actions: {
    async setSearchTerm(term: string) {
      this.searchTerm = term;
      storage.set(SEARCH_TERM, this.searchTerm, 1, "day");
    },

    async getSearchTerm() {
      if (!this.searchTerm && (await storage.has(SEARCH_TERM))) {
        this.searchTerm = await storage.get(SEARCH_TERM);
      }

      return this.searchTerm;
    },
    async getBusinessCustomers(
      business: Business,
      limit: number = 100,
      options = {},
      refresh = false,
      fetchingMore = false
    ): Promise<any> {
      try {
        const params = {
          limit,
          sort: "name:asc",
          name_like: await this.getSearchTerm(),
          ...options,
        };
        const res = await storage.get(CUSTOMERS_RESPONSE);
        if (res && res.customers && !refresh && !fetchingMore) {
          this.customers = res.customers;
          this.nextLink = res.links.next;
          this.totalCustomers = res.meta.total;
          return this.customers;
        }
        if (refresh) {
          this.nextLink = null;
          this.customers = [];
        }
        if (this.customers.length && !this.nextLink) {
          return this.customers;
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
          this.nextLink = links.next;
          this.totalCustomers = meta.total;
          await storage.set(
            CUSTOMERS_RESPONSE,
            { ...response.data, customers: this.customers },
            1,
            "days"
          );
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

    async getCustomer(
      business: Business,
      customer_id: any
    ): Promise<Customer | null> {
      const cacheKey = `kola.business.${business.id}.customers`;
      try {
        if (await storage.has(cacheKey)) {
          const data = await storage.get(cacheKey);

          if (data) {
            const customers = data.map((el: object) => new Business(el));
            const customer = customers.find(
              (c: Customer) => c.id == customer_id
            );
            return new Customer(customer);
          }
        }

        const response = await axios.get(
          `/v2/businesses/${business.id}/customers/${customer_id}`
        );
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.data;
          return new Customer(data);
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
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
    async receivedOrders(customerId: any, options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: customerId,
          businesses_id: userStore.activeBusiness?.id,
          limit: 50,
          ...options,
        };
        const response = await axios.get("/v2/orders", { params });

        const ordersData = response.data.data;
        this.orders = ordersData.map((data: any) => new Order(data));
        return this.orders;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchCustomerCredits(customerId: any, options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: customerId,
          businesses_id: userStore.activeBusiness?.id,
          limit: 50,
          ...options,
        };
        const response = await axios.get("/v2/sale-payments", { params });

        const creditData = response.data.data;
        this.creditPayments = creditData.map((data: any) => new Order(data));
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async deleteCreditPayment(credit_id: any) {
      try {
        const response = await axios.delete(`/v2/sale-paymnents/${credit_id}`);
        if (response.status === 200) {
          const index = this.creditPayments.findIndex(
            (c: any) => c.id == credit_id
          );
          if (index > -1) {
            this.creditPayments.splice(index, 1);
          }
        }
      } catch (error) {}
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
