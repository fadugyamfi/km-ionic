import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";


export const useProductStore = defineStore("product", {

    state: () => {
        return {
            products: [] as Product[],
            selectedProduct: null as Product | null,
            recentlyViewedProducts: [] as Product[],
            searchTerm: ''
        }
    },

    actions: {

        async fetchSearchedProducts(page = 1, limit = 50): Promise<Product[]> {
            try {
                const products = await this.fetchProducts({ product_name_has: this.searchTerm, limit, page });

                return products;
            } catch(error) {
                return [];
            }
        },

        async fetchProducts(options = {}): Promise<Product[]> {
            const params = {
                ...options
            };

            try {
                const response = await axios.get('/v2/products', { params })
                this.products = this.mapResponseToProducts(response);

                return this.products;
            } catch(error) {
                console.log(error);

                return [];
            }
        },

        async fetchRecentlyViewedProducts(options = {}): Promise<Product[]> {
            const params = {
                ...options
            };

            try {
                const response = await axios.get('/v2/products/recently-viewed', { params });
                this.recentlyViewedProducts = response.data.data.map((el: { product: any; }) => new Product(el.product));
            } catch(error) {
                console.log(error);
            }

            return this.recentlyViewedProducts;

        },

        mapResponseToProducts(response: { data: any }): Product[] {
            return response.data.data.map((el: object) => new Product(el))
        },

        async getProducts(): Promise<Product[]> {
            if( this.products.length == 0 ) {
                await this.fetchProducts();
            }

            return this.products;
        },

        async fetchProduct(product_id: number): Promise<Product|null> {
            try {
                const response = await axios.get(`/v2/products/${product_id}`);
                const product = new Product( response.data.data );

                return product;
            } catch(error) {
                console.log(error);

                return null;
            }
        },

        setSelectedProduct(product: Product) {
            this.selectedProduct = product;
        },
    }
});
