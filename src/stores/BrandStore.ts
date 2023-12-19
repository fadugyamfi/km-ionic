import { defineStore } from "pinia";
import Brand from "@/models/Brand";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";
import { handleAxiosRequestError } from "../utilities";
import { useToastStore } from "./ToastStore";
import { useUserStore } from "./UserStore";

const storage = new AppStorage();
const KOLA_BRANDS = "kola.brands";

export const useBrandStore = defineStore("brand", {
  state: () => {
    return {
      brands: [] as Brand[],
      selectedBrand: null as Brand | null,
      brandProducts: [] as Product[],
    };
  },

  actions: {
    async persist() {
      storage.set(KOLA_BRANDS, this.brands);
    },

    async loadFromStorage(): Promise<Brand[]> {
      const brands = await storage.get(KOLA_BRANDS);

      if (brands) {
        this.brands = brands.map((el: object) => new Brand(el));
      }

      return this.brands;
    },

    async fetchBrands() {
      await this.loadFromStorage();

      if (this.brands.length > 0) {
        return this.brands;
      }

      return axios
        .get("/v2/brands")
        .then((response) => {
          this.brands = response.data.data.map((el: object) => new Brand(el));
          this.persist();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchGuestBrands() {
      await this.loadFromStorage();

      if (this.brands.length > 0) {
        return this.brands;
      }
      return axios
        .get("/v2/guest/brands")
        .then((response) => {
          this.brands = response.data.data.map((el: object) => new Brand(el));
          this.persist();
        })
        .catch((error) => {});
    },

    async getBrands(): Promise<Brand[]> {
      const userStore = useUserStore();
      if (this.brands.length == 0) {
        if (!userStore.isInGuestMode) {
          await this.fetchBrands();
        } else {
          await this.fetchGuestBrands();
        }
      }

      return this.brands;
    },

    async getBrand(brand_id: number): Promise<Brand> {
      const brands = await this.getBrands();

      return brands.find((brand) => brand.id == brand_id) as Brand;
    },

    setSelectedBrand(brand: Brand) {
      this.selectedBrand = brand;
    },

    async fetchBrandProducts(
      brand: Brand,
      page = 1,
      limit = 50
    ): Promise<Product[]> {
      try {
        const params = {
          brands_id: brand.id,
          limit,
          page,
          sort: "latest",
        };

        const response = await axios.get("/v2/products", { params });
        this.brandProducts = response.data.data.map(
          (el: object) => new Product(el)
        );

        return this.brandProducts;
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },
    async fetchGuestBrandProducts(
      brand: Brand,
      page = 1,
      limit = 50
    ): Promise<Product[]> {
      try {
        const params = {
          brands_id: brand.id,
          limit,
          page,
          sort: "latest",
        };

        const response = await axios.get("/v2/guest/products", { params });
        this.brandProducts = response.data.data.map(
          (el: object) => new Product(el)
        );

        return this.brandProducts;
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },

    async addToFavorites(brand: Brand) {
      const toastStore = useToastStore();
      brand.addToFavorites();

      try {
        const response = await axios.post(`/v2/brands/${brand.id}/favorites`);
        const favoriteData = response.data.data;
        brand.addToFavorites({
          brands_id: brand.id as number,
          cms_users_id: favoriteData.cms_users_id,
        });

        toastStore.showSuccess("Added To Favorites");
        this.persist();
      } catch (error) {
        handleAxiosRequestError(error);
        brand.unfavorite();
      }
    },

    async removeFromFavorites(brand: Brand) {
      const toastStore = useToastStore();
      brand.unfavorite();

      try {
        const response = await axios.delete(`/v2/brands/${brand.id}/favorites`);
        toastStore.showError("Removed From Favorites");
        this.persist();
      } catch (error) {
        handleAxiosRequestError(error);
        brand.addToFavorites();
      }
    },
  },
});
