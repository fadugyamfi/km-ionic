import { defineStore } from "pinia";
import ProductCategory from "@/models/ProductCategory";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";

const storage = new AppStorage();
const KOLA_CATEGORIES = 'kola.product-categories';

export const useProductCategoryStore = defineStore("productCategory", {

    state: () => {
        return {
            categories: [] as ProductCategory[],
            selectedCategory: null as ProductCategory | null,
            categoryProducts: [] as Product[]
        }
    },

    actions: {

        async loadFromStorage(): Promise<ProductCategory[]> {
            const categories = await storage.get(KOLA_CATEGORIES);

            if( categories ) {
                this.categories = categories.map((el:object) => new ProductCategory(el));
            }

            return this.categories
        },

        async fetchCategories() {
            await this.loadFromStorage();

            if( this.categories.length > 0 ) {
                return this.categories;
            }

            return axios.get('/v2/product-categories')
                .then(response => {
                    this.categories = response.data.data.map((el: object) => new ProductCategory(el));
                    storage.set(KOLA_CATEGORIES, this.categories);
                })
                .catch(error => {
                    console.log(error)
                })

        },

        async getCategories(): Promise<ProductCategory[]> {
            if( this.categories.length == 0 ) {
                await this.fetchCategories();
            }

            return this.categories;
        },

        async getCategory(category_id: number): Promise<ProductCategory> {
            const categories = await this.getCategories();

            return categories.find(category => category.id == category_id) as ProductCategory;
        },

        setSelectedCategory(category: ProductCategory) {
            this.selectedCategory = category;
        },

        async fetchCategoryProducts(category: ProductCategory, page = 1, limit = 50): Promise<Product[]> {
            try {
                const params = {
                    product_categories_id: category.id,
                    limit,
                    page,
                    sort: 'latest'
                };

                const response = await axios.get('/v2/products', { params });
                this.categoryProducts = response.data.data.map((el: object) => new Product(el))

                return this.categoryProducts
            } catch(error) {
                console.log(error);
                return [];
            }
        }
    }
});
