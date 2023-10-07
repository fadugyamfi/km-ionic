import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "./UserStore";
import {handleAxiosRequestError} from "@/utilities";
import Business from "@/models/Business";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useBusinessStore = defineStore("business", {
    state: () => ({
        businesses: null as Business[] | null,
        selectedBusiness: null as Business | null,
    }),

    actions: {
        async loadCachedBusinesses() {
            if( !this.businesses ) {
                this.businesses = await storage.get('kola.businesses') || [];
            }

            if( !this.selectedBusiness ) {
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

        async getBusinesses(search_key?: string|null) {
            const userStore = useUserStore();

            try {
                const link = "/v2/businesses";
                const response = await axios.get(link, {
                    params: {
                        name_like: search_key,
                    },
                });
                if (response) {
                    const {data, links} = response.data;
                    this.businesses = [...(this.businesses || []), ...data];

                    if (!this.hasSelectedBusiness() && !userStore.user?.isSuperAdmin()) {
                        this.selectDefaultBusiness();
                    }

                    this.storeBusinesses();
                }
            } catch (error) {
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

        async createBusinessAsShopper(postData: object) {
            return axios.post('/v2/businesses', postData)
                .then(response => {
                    const userStore = useUserStore();
                    const data = response.data.data;

                    this.setSelectedBusiness(data.business);
                    userStore.setActiveBusiness(data.business);
                    userStore.storeOnboarded(true);

                    return data.business;
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async setupBusinessInfo(postData: object) {
            this.cacheBusinessData(postData)

            return axios.post('/api/business-info-setup', postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async setupBusinessLocation(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness?.id}/location`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async setupBusinessBrand(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness?.id}/brand`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },
        async setupBusinessAttributes(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness?.id}/attributes`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async businessImageUpload(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness?.id}/profile-image-upload`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },
    },
});
