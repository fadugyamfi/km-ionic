import { defineStore } from "pinia";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";
import Promotion from "@/models/Promotion";


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
