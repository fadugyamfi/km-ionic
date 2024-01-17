import { defineStore } from "pinia";
import ProductCategory from "@/models/ProductCategory";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";
import { useUserStore } from "./UserStore";

const storage = new AppStorage();
const KOLA_CATEGORIES = "kola.product-categories";

export const useProductCategoryStore = defineStore("productCategory", {
  state: () => {
    return {
      categories: [] as ProductCategory[],
      selectedCategory: null as ProductCategory | null,
      categoryProducts: [] as Product[],
    };
  },

  actions: {
    async loadFromStorage(): Promise<ProductCategory[]> {
      if( this.categories.length > 0 ) {
        return this.categories;
      }

      const categories = await storage.get(KOLA_CATEGORIES);

      if (categories) {
        this.categories = categories.map(
          (el: object) => new ProductCategory(el)
        );
      }

      return this.categories;
    },

    async fetchCategories() {
      await this.loadFromStorage();

      if (this.categories.length > 0) {
        return this.categories;
      }

      return axios
        .get("/v2/product-categories")
        .then((response) => {
          this.categories = response.data.data.map(
            (el: object) => new ProductCategory(el)
          );
          storage.set(KOLA_CATEGORIES, this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchGuestCategories() {
      await this.loadFromStorage();

      if (this.categories.length > 0) {
        return this.categories;
      }
      return axios
        .get("/v2/guest/product-categories")
        .then((response) => {
          this.categories = response.data.data.map(
            (el: object) => new ProductCategory(el)
          );
          storage.set(KOLA_CATEGORIES, this.categories);
        })
        .catch((error) => {});
    },

    async getCategories(): Promise<ProductCategory[]> {
      const userStore = useUserStore();
      if (!userStore.isInGuestMode) {
        await this.fetchCategories();
      } else {
        await this.fetchGuestCategories();
      }

      return this.categories;
    },

    async getCategory(category_id: number): Promise<ProductCategory> {
      const categories = await this.getCategories();

      return categories.find(
        (category) => category.id == category_id
      ) as ProductCategory;
    },

    setSelectedCategory(category: ProductCategory) {
      this.selectedCategory = category;
    },

    async fetchCategoryProducts(
      category: ProductCategory,
      options: { [key:string]: unknown } = {},
      page = 1,
      limit = 50
    ): Promise<Product[]> {
      try {
        const params = {
          product_categories_id: category.id,
          approved_only: 1,
          limit,
          page,
          sort: "latest",
          ...options
        };

        const response = await axios.get("/v2/products", { params });
        this.categoryProducts = response.data.data.map(
          (el: object) => new Product(el)
        );

        return this.categoryProducts;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    async fetchGuestCategoryProducts(
      category: ProductCategory,
      options: { [key:string]: unknown } = {},
      page = 1,
      limit = 50
    ): Promise<Product[]> {
      try {
        const params = {
          product_categories_id: category.id,
          approved_only: 1,
          limit,
          page,
          sort: "latest",
          ...options
        };

        const response = await axios.get("/v2/guest/products", { params });
        this.categoryProducts = response.data.data.map(
          (el: object) => new Product(el)
        );

        return this.categoryProducts;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
});
