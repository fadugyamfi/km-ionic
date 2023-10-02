import { defineStore } from "pinia";
import Brand from "@/models/Brand";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";

const storage = new AppStorage();
const KOLA_BRANDS = 'kola.brands';

export const useBrandStore = defineStore("brand", {

    state: () => {
        return {
            brands: [] as Brand[],
            selectedBrand: null as Brand | null,
            brandProducts: [] as Product[]
        }
    },

    actions: {

        async loadFromStorage(): Promise<Brand[]> {
            const brands = await storage.get(KOLA_BRANDS);

            if( brands ) {
                this.brands = brands.map((el:object) => new Brand(el));
            }

            return this.brands
        },

        async fetchBrands() {
            await this.loadFromStorage();

            if( this.brands.length > 0 ) {
                return this.brands;
            }

            return axios.get('/v2/brands')
                .then(response => {
                    this.brands = response.data.data.map((el: object) => new Brand(el));
                    storage.set(KOLA_BRANDS, this.brands);
                })
                .catch(error => {
                    console.log(error)
                })

        },

        async getBrands(): Promise<Brand[]> {
            if( this.brands.length == 0 ) {
                await this.fetchBrands();
            }

            return this.brands;
        },

        async getBrand(brand_id: number): Promise<Brand> {
            const brands = await this.getBrands();

            return brands.find(brand => brand.id == brand_id) as Brand;
        },

        setSelectedBrand(brand: Brand) {
            this.selectedBrand = brand;
        },

        async fetchBrandProducts(brand: Brand, page = 1, limit = 50): Promise<Product[]> {
            try {
                const params = {
                    brands_id: brand.id,
                    limit,
                    page,
                    sort: 'latest'
                };

                const response = await axios.get('/v2/products', { params });
                this.brandProducts = response.data.data.map((el: object) => new Product(el))

                return this.brandProducts
            } catch(error) {
                console.log(error);
                return [];
            }
        }
    }
});
