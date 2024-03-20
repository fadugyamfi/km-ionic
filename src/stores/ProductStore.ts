import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";
import { useToastStore } from "./ToastStore";
import { handleAxiosRequestError } from "../utilities";
import { FavoritedProduct } from "../models/types";
import { useUserStore } from "./UserStore";
import AppStorage from "./AppStorage";

const storage = new AppStorage();
const KOLA_TRENDING = "kola.trending";
const RECENTLY_VIEWED = "kola.recently-viewed";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [] as Product[],
      selectedProduct: null as Product | null,
      recentlyViewedProducts: [] as Product[],
      searchTerm: "",
      trendingProducts: [] as Product[],
    };
  },

  actions: {
    async fetchSearchedProducts(page = 1, limit = 50): Promise<Product[]> {
      const userStore = useUserStore();
      const params = {
        product_name_has: this.searchTerm,
        approved_only: 1,
        limit,
        page,
      };

      let products = [];

      try {
        if (!userStore.isInGuestMode()) {
          products = await this.fetchProducts(params);
        } else {
          products = await this.fetchGuestProducts(params);
        }

        return products;
      } catch (error) {
        return [];
      }
    },

    async fetchProducts(options = {}): Promise<Product[]> {
      const params = {
        approved_only: 1,
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
    async fetchAgentProducts(options = {}): Promise<Product[]> {
      const userStore = useUserStore();

      const params = {
        ...options,
      };

      try {
        const response = await axios.get(
          `/v2/users/${userStore.user?.id}/products`,
          { params }
        );
        this.products = this.mapResponseToProducts(response);

        return this.products;
      } catch (error) {
        handleAxiosRequestError(error);

        return [];
      }
    },

    async fetchGuestProducts(options = {}): Promise<Product[]> {
      const params = {
        approved_only: 1,
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
      const products = await storage.get(RECENTLY_VIEWED);

      if (products) {
        return products.map((el: object) => new Product(el));
      }

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

        storage.set(RECENTLY_VIEWED, this.products, 15, "minutes");
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

    async fetchTrendingProducts(): Promise<Product[]> {
      const userStore = useUserStore();
      const trendingProducts = await storage.get(KOLA_TRENDING);

      if (trendingProducts) {
        this.trendingProducts = trendingProducts.map(
          (el: object) => new Product(el)
        );
      } else {
        if (userStore.isInGuestMode()) {
          this.trendingProducts = await this.fetchGuestProducts({
            sort: "top_selling",
            limit: 100,
          });
        } else {
          this.trendingProducts = await this.fetchProducts({
            sort: "top_selling",
            limit: 100,
          });
        }
        await storage.set(KOLA_TRENDING, this.products, 3, "days");
      }

      return this.trendingProducts;
    },
  },
});
