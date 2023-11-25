import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";
import { handleAxiosRequestError } from "../utilities";
import { useToastStore } from "./ToastStore";
import Promotion from "@/models/Promotion";

const storage = new AppStorage();
const KOLA_PROMOTIONS = "kola.promotions";

export const usePromotionStore = defineStore("promotion", {
  state: () => {
    return {
      promotions: [] as Promotion[],
    };
  },

  actions: {
    async persist() {
      storage.set(KOLA_PROMOTIONS, this.promotions);
    },

    async loadFromStorage(): Promise<Promotion[]> {
      const promotions = await storage.get(KOLA_PROMOTIONS);

      if (promotions) {
        this.promotions = promotions.map((el: object) => new Promotion(el));
      }

      return this.promotions;
    },

    async fetchPromotions() {
      await this.loadFromStorage();

      if (this.promotions.length > 0) {
        return this.promotions;
      }

      return axios
        .get("/v2/promotions")
        .then((response) => {
          this.promotions = response.data.data.map(
            (el: object) => new Promotion(el)
          );
          this.persist();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPromotions(): Promise<Promotion[]> {
      if (this.promotions.length == 0) {
        await this.fetchPromotions();
      }

      return this.promotions;
    },

    // async fetchBestSellersProducts(options = {}): Promise<Product[]> {
    //     const params = {
    //       ...options,
    //     };

    //     try {
    //       const response = await axios.get("/v2/products/recently-viewed", {
    //         params,
    //       });
    //       this.bestSellers = response.data.data.map(
    //         (el: { product: any }) => new Product(el.product)
    //       );
    //     } catch (error) {
    //       handleAxiosRequestError(error);
    //     }

    //     return this.bestSellers;
    //   },
  },
});
