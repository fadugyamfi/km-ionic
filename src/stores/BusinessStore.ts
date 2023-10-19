import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import Business from "@/models/Business";
import AppStorage from "./AppStorage";
import { useToastStore } from './ToastStore';
import { business } from "ionicons/icons";

const storage = new AppStorage();
const toastStore = useToastStore();

export const useBusinessStore = defineStore("business", {
  state: () => ({
    businesses: null as Business[] | null,
    selectedBusiness: null as Business | null,
    registration: {
      name: "",
      phone_number: "",
      location: "",
      business_types_id: 1,
      business_owner_name: "",
      business_owner_phone: "",
      email: '',
      gps: '',
      country_id: 83,
      region_id: 54,
      city: "",
      currency_id: 1,
      logo_image: '',
      tax_number: '',
      min_order_amount: 0,
      socials: {
        facebook: '',
        twitter: '',
        instagram: '',
        website: ''
      },
      attributes: {
        year_established: '',
        primary_product_category_id: '',
        number_of_products: '',
        number_of_unique_products: '',
        number_of_small_retailers: '',
        catalog_update_frequency: '',
        number_of_stores: '',
        business_is_in_large_retail_chain: "No",
        how_you_heard_about_kola: '',
        goals_and_expectation_of_kolamarket: ""
      },
      user: {
        pin: '',
        pin_confirmation: ''
      }
    }
  }),

  actions: {
    async loadCachedBusinesses() {
      if (!this.businesses) {
        this.businesses = await storage.get('kola.businesses') || [];
      }

      if (!this.selectedBusiness) {
        this.selectedBusiness = await storage.get('kola.store.business') as Business;
      }
    },

    async getCacheBusinessData() {
      return await storage.get('businessInfo');
    },

    async cacheBusinessData(data: object) {
      let formData = this.getCacheBusinessData()

      if (formData !== null) {
        Object.assign(formData, data)
        await storage.set('businessInfo', formData);
        return;
      }

      await storage.set('businessInfo', data);
    },

    async getSuppliers(options = {}): Promise<Business[]> {
      const params = {
          approved_vendor: 1,
          ...options
      }

      try {
          const response = await axios.get('/v2/businesses', { params });
          const suppliers = response.data.data;

          return suppliers.map((element: any) => new Business(element));

      } catch (error) {
          console.log(error);
          handleAxiosRequestError(error)
      }

      return [];
    },

    async getBusinesses(search_key?: string | null): Promise<Business | null> {
      const userStore = useUserStore();

      try {
        const link = "/v2/businesses";
        const response = await axios.get(link, {
          params: {
            name_like: search_key,
          },
        });

        if (response) {
          const { data, links } = response.data;
          this.businesses = [...(this.businesses || []), ...data];

          if (!this.hasSelectedBusiness() && !userStore.user?.isSuperAdmin()) {
            this.selectDefaultBusiness();
          }

          this.storeBusinesses();

          // Return the first business from the response for demonstration
          return data.length > 0 ? data[0] : null;
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
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

    async storeBusinesses() {
      await storage.set('store.businesses', this.businesses);
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
      await storage.remove('kola.store.business');
    },

    async setSelectedBusiness(business: any) {
      this.selectedBusiness = business;
      await storage.set('kola.store.business', business);
    },

    selectDefaultBusiness() {
      this.setSelectedBusiness(this.businesses != null ? this.businesses[0] : null);
    },

    async createBusinessAsShopper(postData: object): Promise<Business | null> {
      return axios.post('/v2/businesses', postData)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            const userStore = useUserStore();
            const data = response.data.data;

            this.setSelectedBusiness(data.business);
            userStore.setActiveBusiness(data.business);
            userStore.storeOnboarded(true);

            return data.business;
          }
        })
        .catch(error => handleAxiosRequestError(error))
    },

    async createBusinessAsVendor() {
      return axios.post('/v2/businesses', this.registration)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            const userStore = useUserStore();
            const data = response.data.data;

            this.setSelectedBusiness(data.business);
            userStore.setActiveBusiness(data.business);
            userStore.storeOnboarded(true);

            return data.business;
          }
        })
        .catch(error => handleAxiosRequestError(error))
    },

    async loadCachedRegistrationInfo() {
      if (await storage.has('kola.business-registration')) {
        this.registration = await storage.get('kola.business-registration');
      }
    },

    async cacheRegistrationInfo() {
      await storage.set('kola.business-registration', this.registration, 3, 'days');
    },

    async clearCachedRegistrationInfo() {
      await storage.remove('kola.business-registration');
    },
    async addToFavorites(business: Business) {
      const toastStore = useToastStore();
      business.addToFavorites();

      try {
        const response = await axios.post(`/v2/businesss/${business.id}/favorites`);
        const favoriteData = response.data.data;
        // business.addToFavorites({ business_id: business.id as number, cms_users_id: favoriteData.cms_users_id });

        toastStore.showSuccess('Added To Favorites');
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
        const response = await axios.delete(`/v2/businesss/${business.id}/favorites`);
        toastStore.showError('Removed From Favorites');
        this.persist();
      } catch (error) {
        handleAxiosRequestError(error);
        business.addToFavorites();
      }
    }
  }
});
