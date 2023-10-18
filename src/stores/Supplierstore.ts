import axios from 'axios';
import { defineStore } from 'pinia';
import Business from '@/models/Business';
import Product from '@/models/Product';
import { handleAxiosRequestError } from '@/utilities';

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    supplier: null as Business | null,
    products: [] as Product[],
  }),

  actions: {
    async getSupplier(supplierId: number) {
      try {
        const response = await axios.get(`https://apistaging.kola.market/api/v2/businesses/${supplierId}/suppliers`);
        this.supplier = response.data.data;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    async fetchSupplierProducts(supplierId: number) {
      try {
        const response = await axios.get(`https://api-staging.kola.market/api/v2/businesses/${supplierId}/products?sort=latest`);
        this.products = response.data.data;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
  },
});
