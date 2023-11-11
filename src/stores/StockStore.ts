import { defineStore } from "pinia";
import axios from "axios";
import { useToastStore } from "./ToastStore";
import { handleAxiosRequestError } from "../utilities";
import { FavoritedProduct } from "../models/types";
import Stock from "@/models/Stock";

export const useStockStore = defineStore("stock", {
  state: () => {
    return {
      stocks: [] as Stock[],
      selectedStock: null as Stock | null,
      recentlyViewedStocks: [] as Stock[],
      searchTerm: "",
    };
  },

  actions: {
    async fetchSearchedStocks(page = 1, limit = 50): Promise<Stock[]> {
      try {
        const products = await this.fetchStocks({
          product_name_has: this.searchTerm,
          limit,
          page,
        });

        return products;
      } catch (error) {
        return [];
      }
    },

    async fetchStocks(options = {}): Promise<Stock[]> {
      const params = {
        ...options,
      };

      try {
        const response = await axios.get("/v2/products", { params });
        this.stocks = this.mapResponseToStocks(response);

        return this.stocks;
      } catch (error) {
        handleAxiosRequestError(error);

        return [];
      }
    },

    mapResponseToStocks(response: { data: any }): Stock[] {
      return response.data.data.map((el: object) => new Stock(el));
    },

    async getProducts(): Promise<Stock[]> {
      if (this.stocks.length == 0) {
        await this.fetchStocks();
      }

      return this.stocks;
    },

    async fetchStock(product_id: number): Promise<Stock | null> {
      try {
        const response = await axios.get(`/v2/products/${product_id}`);
        const product = new Stock(response.data.data);

        return product;
      } catch (error) {
        handleAxiosRequestError(error);

        return null;
      }
    },
    async deleteStock(stock: Stock) {
      return axios
        .delete(`/v2/products/${stock.id}`)
        .then(() => {
          const index = this.stocks.findIndex((s) => s.id == stock.id);
          if (index > -1) {
            this.stocks.splice(index, 1);
          }
        })
        .catch((error) => {
          handleAxiosRequestError(error);
        });
    }
  },
});
