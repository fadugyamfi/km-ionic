import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import AppStorage from "./AppStorage";
import { useToastStore } from "./ToastStore";
import Product from "@/models/Product";
import { useRouter } from "vue-router";

const storage = new AppStorage();
const toastStore = useToastStore();

export const useBusinessStore = defineStore("business", {
  state: () => ({
    businesses: null as Business[] | null,
    customers: null as Business[] | null,
    selectedBusiness: null as Business | null,
    selectedToView: null as Business | null,
    registration: {
      name: "",
      phone_number: "",
      location: "",
      business_types_id: 1,
      business_owner_name: "",
      business_owner_phone: "",
      email: "",
      value: "",
      gps: "",
      country_id: 83,
      region_id: 54,
      city: "",
      currency_id: 1,
      logo_image: "",
      tax_number: "",
      min_order_amount: 0,
      socials: {
        facebook: "",
        twitter: "",
        instagram: "",
        website: "",
      },
      attributes: {
        year_established: "",
        primary_product_category_id: "",
        number_of_products: "",
        number_of_unique_products: "",
        number_of_small_retailers: "",
        catalog_update_frequency: "",
        number_of_stores: "",
        brand_is_in_large_retail_chain: "No",
        how_you_heard_about_kola: "",
        goals_and_expectation_of_kolamarket: "",
        applied_to: "sell",
      },
      user: {
        pin: "",
        pin_confirmation: "",
      },
    },
    searchQuery: "",
    SearchResults: [] as Business[],
    businessSummary: null as any | null,
  }),

  actions: {
    async loadCachedBusinesses() {
      if (!this.businesses) {
        this.businesses = (await storage.get("kola.businesses")) || [];
      }

      if (!this.selectedBusiness) {
        this.selectedBusiness = (await storage.get(
          "kola.store.business"
        )) as Business;
      }
    },

    async getCacheBusinessData() {
      return await storage.get("businessInfo");
    },

    async cacheBusinessData(data: object) {
      let formData = this.getCacheBusinessData();

      if (formData !== null) {
        Object.assign(formData, data);
        await storage.set("businessInfo", formData);
        return;
      }

      await storage.set("businessInfo", data);
    },

    async getSuppliers(searchTerm = "", options = {}): Promise<Business[]> {
      const params = {
        approved_vendor: 1,
        ...options,
      };

      return this.getBusinesses(searchTerm, params);
    },

    async getBusinesses(
      searchQuery = "",
      options = {},
      append = false
    ): Promise<Business[]> {
      try {
        const response = await axios.get("/v2/businesses", {
          params: {
            name_like: searchQuery,
            ...options,
          },
        });

        if (response) {
          const { data, links } = response.data;
          const businesses: Business[] = data.map(
            (el: any) => new Business(el)
          );

          if (append) {
            this.businesses = [...(this.businesses || []), ...businesses];
          } else {
            this.businesses = businesses;
          }

          return this.businesses;
        }

        return [];
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },

    async getBusiness(businessId: number): Promise<Business | null> {
      try {
        const response = await axios.get(`/v2/businesses/${businessId}`);

        if (response) {
          const { data } = response.data;
          return new Business(data);
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async updateBusiness(
      businessId: number,
      businessData: Object
    ): Promise<Business | null> {
      try {
        const response = await axios.put(
          `/v2/businesses/${businessId}`,
          businessData
        );

        if (response) {
          const { data } = response.data;
          return new Business(data);
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async getBusinessProducts(
      business: Business,
      limit: number = 50
    ): Promise<Product[]> {
      try {
        const params = {
          businesses_id: business.id,
          limit,
          product_name_has: this.searchQuery,
        };

        const response = await axios.get(`/v2/products`, { params });
        if (response) {
          const { data } = response.data;
          const products: Product[] = data.map((el: any) => new Product(el));
          return products;
        }
        return [];
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },

    async getBusinessCustomers(
      business: Business,
      limit: number = 50,
      options = {},
      refresh = false
    ): Promise<Business[]> {
      const cacheKey = `kola.business.${business.id}.customers`;
      if ((await storage.has(cacheKey)) && !refresh) {
        const data = await storage.get(cacheKey);
        return data.map((el: object) => new Business(el));
      }

      try {
        const params = {
          limit,
          sort: "name:asc",
          ...options,
        };

        const response = await axios.get(
          `/v2/businesses/${business.id}/customers`,
          { params }
        );

        if (response) {
          const { data } = response.data;
          const customers: Business[] = data.map((el: any) => new Business(el));

          await storage.set(cacheKey, customers, 7, "days");

          return customers;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return [];
    },

    async getBusinessSaleAgents(
      business: Business,
      limit: number = 50,
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

    async storeBusinesses() {
      await storage.set("store.businesses", this.businesses);
    },

    async setSearchQuery(query: string) {
      this.searchQuery = query;
      await this.clearBusinesses();
    },

    clearBusinesses() {
      this.businesses = [];
    },

    getSelectedBusiness() {
      return this.selectedBusiness;
    },

    hasSelectedBusiness() {
      return this.selectedBusiness != null;
    },

    async clearSelectedBusiness() {
      this.selectedBusiness = null;
      await storage.remove("kola.store.business");
    },

    async setSelectedBusiness(business: any) {
      this.selectedBusiness = business;
      await storage.set("kola.store.business", business);
    },

    selectDefaultBusiness() {
      this.setSelectedBusiness(
        this.businesses != null ? this.businesses[0] : null
      );
    },

    async createBusinessAsShopper(postData: object): Promise<Business | null> {
      return axios
        .post("/v2/businesses", postData)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const userStore = useUserStore();
            const data = response.data.data;

            this.setSelectedBusiness(data.business);
            userStore.setActiveBusiness(data.business);
            userStore.storeOnboarded(true);

            return data.business;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async createBusinessAsVendor() {
      return axios
        .post("/v2/businesses", this.registration)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const userStore = useUserStore();
            const data = response.data.data;

            this.setSelectedBusiness(data.business);
            userStore.setActiveBusiness(data.business);
            userStore.storeOnboarded(true);

            return data.business;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async loadCachedRegistrationInfo() {
      if (await storage.has("kola.business-registration")) {
        this.registration = await storage.get("kola.business-registration");
      }
    },

    async cacheRegistrationInfo() {
      await storage.set(
        "kola.business-registration",
        this.registration,
        3,
        "days"
      );
    },

    async clearCachedRegistrationInfo() {
      await storage.remove("kola.business-registration");
    },

    async addToFavorites(business: Business) {
      const toastStore = useToastStore();
      business.addToFavorites();

      try {
        const response = await axios.post(
          `/v2/businesses/${business.id}/favorites`
        );
        const favoriteData = response.data.data;

        business.addToFavorites({
          businesses_id: business.id as number,
          cms_users_id: favoriteData.cms_users_id,
        });

        toastStore.showSuccess("Added To Favorites");
        this.persist();
      } catch (error) {
        handleAxiosRequestError(error);
        business.unfavorite();
      }
    },

    persist() {
      this.storeBusinesses();
    },

    async removeFromFavorites(business: Business) {
      const toastStore = useToastStore();
      business.unfavorite();

      try {
        const response = await axios.delete(
          `/v2/businesses/${business.id}/favorites`
        );
        toastStore.showError("Removed From Favorites");
        this.persist();
      } catch (error) {
        handleAxiosRequestError(error);
        business.addToFavorites();
      }
    },

    viewBusiness(business: Business) {
      this.selectedToView = business;
    },

    getSelectedForViewing() {
      return this.selectedToView;
    },

    async getBusinessSummary(business: Business, options = {}) {
      const params = { ...options };

      return axios
        .get(`/v2/businesses/${business.id}/summary`, { params })
        .then((response) => {
          this.businessSummary = response.data.data;
          return this.businessSummary;
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async getTopSellingProducts(business: Business, options = {}) {
      const params = {
        businesses_id: business.id,
        limit: 30,
        filter: "by-value",
        ...options,
      };

      return axios
        .get("/v2/metrics/top-products", { params })
        .then((response) => response.data.data)
        .catch((error) => handleAxiosRequestError(error));
    },
  },
});
