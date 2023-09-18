import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "./UserStore";
import {handleAxiosRequestError} from "@/utilities";

const selectedBusiness = localStorage.getItem("kola.business");
const storedBusinesses = localStorage.getItem('kola.store.businesses');

export const useBusinessStore = defineStore("business", {
    state: () => ({
        businesses: (typeof storedBusinesses == 'string' && JSON.parse(storedBusinesses)) || null,
        selected_business: (typeof selectedBusiness == 'string' && JSON.parse(selectedBusiness)) || null,
        nextLink: null,
    }),

    getters: {
        selectedBusiness: (state) => {
            return state.selected_business;
        }
    },

    actions: {
        getCacheBusinessData() {
            let data = localStorage.getItem('businessInfo');

            if (data === 'undefined') {
                return null
            }

            return JSON.parse(data || '')
        },

        cacheBusinessData(data: object) {
            let formData = this.getCacheBusinessData()

            if (formData !== null) {
                Object.assign(formData, data)
                localStorage.setItem('businessInfo', JSON.stringify(formData))
                return;
            }

            localStorage.setItem('businessInfo', JSON.stringify(data))
        },

        async getBusinesses(search_key?: string|null) {
            const userStore = useUserStore();

            if (search_key) {
                this.nextLink = null;
            }

            try {
                const link = this.nextLink || "/v2/businesses";
                const response = await axios.get(link, {
                    params: {
                        name_like: search_key,
                    },
                });
                if (response) {
                    const {data, links} = response.data;
                    this.businesses = [...this.businesses, ...data];
                    this.nextLink = links.next;

                    if (!this.hasSelectedBusiness() && !userStore.user?.isSuperAdmin()) {
                        this.selectDefaultBusiness();
                    }

                    this.storeBusinesses();
                }
            } catch (error) {
            }
        },

        storeBusinesses() {
            localStorage.setItem('store.businesses', JSON.stringify(this.businesses));
        },

        clearBusinesses() {
            this.businesses = [];
            this.nextLink = null;
        },

        getSelectedBusiness() {
            return this.selected_business;
        },

        hasSelectedBusiness() {
            return this.selected_business != null;
        },

        clearSelectedBusiness() {
            this.selected_business = null;
            localStorage.removeItem('kola.business')
        },

        setSelectedBusiness(business: any) {
            this.selected_business = business;
            const data = localStorage.getItem('kola.business');

            if (typeof data == 'string') {
                localStorage.removeItem('kola.business')
            }

            localStorage.setItem('kola.business', JSON.stringify(business));
        },

        selectDefaultBusiness() {
            this.setSelectedBusiness(this.businesses[0]);
        },

        async createBusinessAsShopper(postData: object) {
            return axios.post('/v2/businesses', postData)
                .then(response => {
                    const data = response.data.data;
                    this.setSelectedBusiness(data.business);
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

            return axios.put(`/api/business-info-setup/${this.selectedBusiness.id}/location`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async setupBusinessBrand(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness.id}/brand`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },
        async setupBusinessAttributes(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness.id}/attributes`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async businessImageUpload(postData: object) {
            this.cacheBusinessData(postData)

            return axios.put(`/api/business-info-setup/${this.selectedBusiness.id}/profile-image-upload`, postData)
                .then(response => {
                    const business = response.data.data
                    this.setSelectedBusiness(business)
                    return business
                })
                .catch(error => handleAxiosRequestError(error))
        },
    },
});
