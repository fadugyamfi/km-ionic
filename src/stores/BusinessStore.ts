import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "./UserStore";
import {handleAxiosRequestError} from "@/utilities";
import { Preferences } from "@capacitor/preferences";

class Business {

    public id: number|null = null;
    public name: string|null = null;
    public location: string|null = null;
    public phone_number: string|null = null;

    constructor(data: object) {
        Object.assign(this, data);
    }
}

export const useBusinessStore = defineStore("business", {
    state: () => ({
        businesses: null as Business[] | null,
        selectedBusiness: null as Business | null,
    }),

    actions: {
        async loadCachedBusinesses() {
            if( !this.businesses ) {
                let { value } = await Preferences.get({ key: 'kola.business' });
                this.businesses = value != null ? JSON.parse(value) : Array.of([]);
            }

            if( !this.selectedBusiness ) {
                let results = await Preferences.get({ key: 'kola.store.business' });
                this.selectedBusiness = results.value != null ? JSON.parse(results.value) : null;
            }
        },

        async getCacheBusinessData() {
            let { value } = await Preferences.get({ key: 'businessInfo' });

            if (value === 'undefined') {
                return null
            }

            return JSON.parse(value || '')
        },

        async cacheBusinessData(data: object) {
            let formData = this.getCacheBusinessData()

            if (formData !== null) {
                Object.assign(formData, data)
                await Preferences.set({ key: 'businessInfo', value: JSON.stringify(formData)});
                return;
            }

            await Preferences.set({ key: 'businessInfo', value: JSON.stringify(data) })
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
            await Preferences.set({ key: 'store.businesses', value: JSON.stringify(this.businesses) });
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
            await Preferences.remove({ key:'kola.business' })
        },

        async setSelectedBusiness(business: any) {
            this.selectedBusiness = business;
            const { value } = await Preferences.get({ key: 'kola.business' });

            if (typeof value == 'string') {
                await Preferences.remove({ key:'kola.business'})
            }

            await Preferences.set({ key: 'kola.business', value: JSON.stringify(business) });
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
