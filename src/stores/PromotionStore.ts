import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";
import { handleAxiosRequestError } from "../utilities";
import { useToastStore } from "./ToastStore";
import Promotion from "@/models/Promotion";
import PromotionItem from "../models/PromotionItem";

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
        this.promotions = promotions.map((el: any) => {
          el.promotion_items = el._promotion_items;
          el.promotion_items.forEach((i: any) => {
            i.product = i._product
          });
          return new Promotion(el)
        });
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

    async getPromotion(promotionId: number): Promise<Promotion|null> {
      if( this.promotions.length > 0 ) {
        const promotion = this.promotions.find(p => p.id == promotionId);
        if( promotion ) {
          return promotion;
        }
      }


      return axios
        .get(`/v2/promotions/${promotionId}`)
        .then((response) => {
          const promotion = new Promotion(response.data.data);

          return promotion;
        })
        .catch((error) => {
          console.log(error);
          return null
        });
    },

    async getPromotionItems(promotionId: number): Promise<PromotionItem[]|null> {
      const params = {
        promotion_id: promotionId,
        limit: 100
      }
      return axios
        .get(`/v2/promotion-items`, { params })
        .then((response) => {
          const promotionItems = response.data.data.map(
            (el: object) => new PromotionItem(el)
          );

          return promotionItems;
        })
        .catch((error) => {
          console.log(error);
          return null
        });
    }
  },
});
