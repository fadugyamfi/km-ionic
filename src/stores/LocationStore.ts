import axios from "axios";
import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { handleAxiosRequestError } from "@/utilities";
import Country from "@/models/Country";
import Region from "@/models/Region";

const storage = new AppStorage();

export const useLocationStore = defineStore('location', {

    state: () => {
        return {
            countries: [] as Country[],
            regions: [] as Region[]
        }
    },

    actions: {
        async fetchCountries() {
            if( await storage.has('kola.countries') ) {
                const data = await storage.get('kola.countries');
                this.countries = data.map((el: any) => new Country(el));
                return this.countries;
            }

            const params = { limit: 300 };

            try {
                const response = await axios.get('/v2/countries', { params });
                this.countries = response.data.data.map((el: any) => new Country(el));
                await storage.set('kola.countries', response.data.data, 3, 'months');
            } catch(error) {
                handleAxiosRequestError(error);
            }

            return this.countries;
        },

        async fetchRegions(country_id: number | null = null) {
            // if( await storage.has('kola.regions') ) {
            //     const data = await storage.get('kola.regions');
            //     this.regions = data.map((el: any) => new Region(el));
            //     return this.regions;
            // }

            const params = { limit: 300, country_id };

            try {
                const response = await axios.get('/v2/states', { params });
                this.regions = response.data.data.map((el: any) => new Region(el));
                await storage.set('kola.regions', response.data.data, 3, 'months');
            } catch(error) {
                handleAxiosRequestError(error);
            }

            return this.regions;
        }
    }
})
