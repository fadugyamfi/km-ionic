import { defineStore } from "pinia";
import Product from "@/models/Product";
import axios from "axios";
import AppStorage from "./AppStorage";
import { handleAxiosRequestError } from "../utilities";
import { useToastStore } from "./ToastStore";
import Promotion from "@/models/Promotion";
import PromotionItem from "../models/PromotionItem";
import { useUserStore } from "./UserStore";

const storage = new AppStorage();
const KOLA_PROMOTIONS = "kola.promotions";
const KOLA_PROMOTION_ITEMS = "kola.promotion-items";
const userStore = useUserStore();

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
            i.product = i._product;
            i.product = new Product(i._product)
          });
          return new Promotion(el);
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
    async fetchGuestPromotions() {
      await this.loadFromStorage();

      if (this.promotions.length > 0) {
        return this.promotions;
      }

      return axios
        .get("/v2/guest/promotions")
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
        if (!userStore.isInGuestMode) {
          await this.fetchPromotions();
        } else {
          await this.fetchGuestPromotions();
        }
      }

      return this.promotions;
    },

    async getPromotion(promotionIdOrSlug: number | string): Promise<Promotion | null> {
      if (this.promotions.length > 0) {
        const promotion = this.promotions.find((p) => p.id == promotionIdOrSlug || p.slug == promotionIdOrSlug);

        if (promotion) {
          return promotion;
        }
      }

      return axios
        .get(`/v2/promotions/${promotionIdOrSlug}`)
        .then((response) => {
          const promotion = new Promotion(response.data.data);

          return promotion;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },

    async getGuestPromotion(promotionIdOrSlug: number | string): Promise<Promotion | null> {
      if (this.promotions.length > 0) {
        const promotion = this.promotions.find((p) => p.id == promotionIdOrSlug || p.slug == promotionIdOrSlug);
        if (promotion) {
          return promotion;
        }
      }

      return axios
        .get(`/v2/guest/promotions/${promotionIdOrSlug}`)
        .then((response) => {
          const promotion = new Promotion(response.data.data);

          return promotion;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },

    async getPromotionItems(
      promotionId: number
    ): Promise<PromotionItem[] | null> {
      const storedItems = await this.loadItemsFromStorage(promotionId);

      if( storedItems && storedItems.length > 0 ) {
        return storedItems;
      }

      const params = {
        promotion_id: promotionId,
        limit: 100,
      };
      return axios
        .get(`/v2/promotion-items`, { params })
        .then((response) => {
          return this.mapAndStorePromotionItems(promotionId, response)
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },

    async getGuestPromotionItems(
      promotionId: number
    ): Promise<PromotionItem[] | null> {
      const storedItems = await this.loadItemsFromStorage(promotionId);

      if( storedItems && storedItems.length > 0 ) {
        return storedItems;
      }

      const params = {
        promotion_id: promotionId,
        limit: 100,
      };
      return axios
        .get(`/v2/guest/promotion-items`, { params })
        .then((response) => {
          return this.mapAndStorePromotionItems(promotionId, response);
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },

    mapAndStorePromotionItems(promotionId: number, response: any) {
      const promotionItems = response.data.data.map(
        (el: object) => new PromotionItem(el)
      );

      storage.set(`${KOLA_PROMOTION_ITEMS}.${promotionId}`, promotionItems, 2, 'hours');

      return promotionItems;
    },

    async loadItemsFromStorage(promotionId: number): Promise<PromotionItem[] | null> {
      const response = await storage.get(`${KOLA_PROMOTION_ITEMS}.${promotionId}`);

      if( response ) {
        return response.data.data.map(
          (el: object) => new PromotionItem(el)
        );
      }

      return null;
    }
  },
});
