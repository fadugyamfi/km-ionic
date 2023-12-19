import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";
import { useToastStore } from "./ToastStore";
import { handleAxiosRequestError } from "../utilities";
import { FavoritedProduct } from "../models/types";
import { useUserStore } from "./UserStore";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [] as Product[],
      selectedProduct: null as Product | null,
      recentlyViewedProducts: [] as Product[],
      searchTerm: "",
    };
  },

  actions: {
    async fetchSearchedProducts(page = 1, limit = 50): Promise<Product[]> {
      const userStore = useUserStore();
      try {
        if (!userStore.isInGuestMode()) {
          const products = await this.fetchProducts({
            product_name_has: this.searchTerm,
            limit,
            page,
          });
          return products;
        } else {
          const products = await this.fetchGuestProducts({
            product_name_has: this.searchTerm,
            limit,
            page,
          });
          return products;
        }
      } catch (error) {
        return [];
      }
    },

    async fetchProducts(options = {}): Promise<Product[]> {
      const params = {
        ...options,
      };

      try {
        const response = await axios.get("/v2/products", { params });
        this.products = this.mapResponseToProducts(response);

        return this.products;
      } catch (error) {
        handleAxiosRequestError(error);

        return [];
      }
    },
    async fetchGuestProducts(options = {}): Promise<Product[]> {
      const params = {
        ...options,
      };

      try {
        const response = await axios.get("/v2/guest/products", { params });
        this.products = this.mapResponseToProducts(response);

        return this.products;
      } catch (error) {
        handleAxiosRequestError(error);

        return [];
      }
    },

    async fetchRecentlyViewedProducts(options = {}): Promise<Product[]> {
      const params = {
        ...options,
      };

      try {
        const response = await axios.get("/v2/products/recently-viewed", {
          params,
        });
        this.recentlyViewedProducts = response.data.data.map(
          (el: { product: any }) => new Product(el.product)
        );
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return this.recentlyViewedProducts;
    },

    mapResponseToProducts(response: { data: any }): Product[] {
      return response.data.data.map((el: object) => new Product(el));
    },

    async getProducts(): Promise<Product[]> {
      if (this.products.length == 0) {
        await this.fetchProducts();
      }

      return this.products;
    },

    async fetchProduct(product_id: number): Promise<Product | null> {
      try {
        const response = await axios.get(`/v2/products/${product_id}`);
        const product = new Product(response.data.data);

        return product;
      } catch (error) {
        handleAxiosRequestError(error);

        return null;
      }
    },
    async fetchGuestProduct(product_id: number): Promise<Product | null> {
      try {
        const response = await axios.get(`/v2/guest/products/${product_id}`);
        const product = new Product(response.data.data);

        return product;
      } catch (error) {
        handleAxiosRequestError(error);

        return null;
      }
    },

    setSelectedProduct(product: Product) {
      this.selectedProduct = product;
    },

    async addProductToFavorites(product: Product) {
      const toastStore = useToastStore();
      product.addToFavorites();

      try {
        const response = await axios.post(
          `/v2/products/${product.id}/favorites`
        );
        const favoriteData = response.data.data;
        product.addToFavorites({
          products_id: product.id as number,
          cms_users_id: favoriteData.cms_users_id,
        });

        toastStore.showSuccess("Added To Favorites");
      } catch (error) {
        handleAxiosRequestError(error);
        product.unfavorite();
      }
    },

    async removeFromFavorites(product: Product) {
      const toastStore = useToastStore();
      product.unfavorite();

      try {
        const response = await axios.delete(
          `/v2/products/${product.id}/favorites`
        );
        toastStore.showError("Removed From Favorites");
      } catch (error) {
        handleAxiosRequestError(error);
        product.addToFavorites();
      }
    },
  },
});
