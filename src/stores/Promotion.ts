import { defineStore } from "pinia";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";
import Promotion from "@/models/Promotion";
import { useUserStore } from "./UserStore";

export const usePromotionStore = defineStore("promotion", {
  state: () => {
    return {
      promotions: [] as Promotion[],
    };
  },

  actions: {
    async fetchPromotions() {
      return axios
        .get("/v2/promotions")
        .then((response) => {
          this.promotions = response.data.data.map(
            (el: object) => new Promotion(el)
          );
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },
    async fetchGuestPromotions() {
      return axios
        .get("/v2/guest/promotions")
        .then((response) => {
          this.promotions = response.data.data.map(
            (el: object) => new Promotion(el)
          );
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    },

    async getPromotions(): Promise<Promotion[]> {
      const userStore = useUserStore();
      if (this.promotions.length == 0) {
        if (!userStore.isInGuestMode) {
          await this.fetchPromotions();
        } else {
          await this.fetchGuestPromotions();
        }
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
