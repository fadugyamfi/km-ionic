import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import AppStorage from "./AppStorage";
import { useToastStore } from "./ToastStore";
import Product from "@/models/Product";
import Address from "@/models/Address";
import { useRouter } from "vue-router";
import Customer from "../models/Customer";

const storage = new AppStorage();
const SEARCH_QUERY = "kola.business-search-query";

export const useBusinessStore = defineStore("business", {
  state: () => ({
    businessLocations: [] as Address[],
    updatebusinessLocation: {},
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
    searchQuery: null as string | null,
    SearchResults: [] as Business[],
    businessSummary: null as any | null,
    business: null as any | null,
  }),

  actions: {
    async setSearchTerm(term: string) {
      this.searchQuery = term;
      storage.set(SEARCH_QUERY, this.searchQuery, 1, "day");
    },

    async getSearchTerm() {
      if (!this.searchQuery && (await storage.has(SEARCH_QUERY))) {
        this.searchQuery = await storage.get(SEARCH_QUERY);
      }

      return this.searchQuery;
    },
    async clearSearchTerm() {
      await storage.remove(SEARCH_QUERY);
      this.searchQuery = null;
    },
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
    async getGuestSuppliers(
      searchTerm = "",
      options = {}
    ): Promise<Business[]> {
      const params = {
        approved_vendor: 1,
        ...options,
      };

      return this.getGuestBusinesses(searchTerm, params);
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
    async getGuestBusinesses(
      searchQuery = "",
      options = {},
      append = false
    ): Promise<Business[]> {
      try {
        const response = await axios.get("/v2/guest/businesses", {
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
          this.business = data;
          return new Business(data);
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async getGuestBusiness(businessId: number): Promise<Business | null> {
      try {
        const response = await axios.get(`/v2/guest/businesses/${businessId}`);

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
      const userStore = useUserStore();

      try {
        const url = `/v2/businesses/${businessId}`;
        const response = await axios.put(url, businessData);

        if (response) {
          const { data } = response.data;
          this.business = data;
          const business = new Business(data);

          userStore.setActiveBusiness(business);

          return business;
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },

    async getBusinessProducts(
      business: Business,
      limit: number = 50,
      url = "/v2/products"
    ): Promise<Product[]> {
      try {
        const params = {
          businesses_id: business.id,
          limit,
          product_name_has: this.searchQuery,
        };

        const response = await axios.get(url, { params });
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
      const cacheSearchQuery = await this.getSearchTerm();
      const cacheKey = `kola.business.${business.id}.customers`;
      
      if ((await storage.has(cacheKey)) && !refresh && !cacheSearchQuery) {
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
          if (!refresh && cacheSearchQuery) {
            await this.clearSearchTerm();
          }
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

    async getBusinessLocations(business_id: number): Promise<Address[] | null> {
      try {
        const response = await axios.get(
          `/v2/businesses/${business_id}/locations`
        );
        this.businessLocations = response.data.data;
        return this.businessLocations;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },

    async createBusinessLocations(postData: Object): Promise<Address[] | null> {
      const userStore = useUserStore();
      return axios
        .post(
          `/v2/businesses/${userStore.activeBusiness?.id}/locations`,
          postData
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            this.businessLocations.unshift(new Address(data));
            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async updateBusinessLocation(
      postData: Object,
      business_id: number | string,
      location_id: number | string
    ): Promise<Address> {
      const userStore = useUserStore();
      return axios
        .put(`/v2/businesses/${business_id}/locations/${location_id}`, {
          ...postData,
          business_id: userStore.activeBusiness?.id,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            const index = this.businessLocations.findIndex(
              (loc) => loc.id == location_id
            );

            if (index > -1) {
              this.businessLocations[index] = new Address(data);
            }

            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },
    async removeBusinessLocation(
      location: Address,
      business_id: number | string
    ) {
      const toastStore = useToastStore();
      try {
        const res = await axios.delete(
          `/v2/businesses/${business_id}/locations/${location.id}`
        );
        if (res) {
          this.businessLocations = this.businessLocations.filter(
            (loc) => loc.id !== res.data?.data?.id
          );
        }
        toastStore.showSuccess(
          "Address has been removed successfully",
          "",
          "bottom"
        );
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError(
          "Failed to remove Address. Please try again",
          "",
          "bottom",
          "footer"
        );
      }
    },
    async addBusiness(businessInfo: object): Promise<Business | null> {
      try {
        const response = await axios.post(`/v2/businesses`, businessInfo);
        const businesss = new Business(response.data.data);
        return businesss;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async getBusinessLocation(
      business_id: any,
      location_id: any
    ): Promise<Address | null> {
      const userStore = useUserStore();
      return axios
        .get(`/v2/businesses/${business_id}/locations/${location_id}`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data;
            return data;
          }
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async getAddress(
      business: Business,
      address_id: any
    ): Promise<Business | null> {
      const cacheKey = `kola.business.${business.id}.location`;

      try {
        if (await storage.has(cacheKey)) {
          const data = await storage.get(cacheKey);

          if (data) {
            const address = data.map((el: object) => new Business(el));
            // You have duplicated 'address' variable. I assume you want to find a specific customer here.
            const foundAddress = address.find(
              (c: Address) => c.id === address_id
            );

            if (foundAddress) {
              return foundAddress;
            }
          }
        }

        const response = await axios.get(
          `/v2/businesses/${business.id}/locations/${address_id}`
        );
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.data;
          const newAddress = new Business(data);
          return newAddress;
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
