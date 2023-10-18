import { defineStore } from 'pinia';
import Business from '@/models/Business';
import Product from '@/models/Product';
import axios from 'axios';
import AppStorage from './AppStorage';
import { handleAxiosRequestError } from '../utilities';

const storage = new AppStorage();
const KOLA_SUPPLIERS = 'kola.suppliers';

export const useSupplierStore = defineStore('supplier', {
  state: () => {
    return {
      suppliers: [] as Business[],
      selectedSupplier: null as Business | null,
      supplierProducts: [] as Product[],
    };
  },

  actions: {
    async persist() {
      storage.set(KOLA_SUPPLIERS, this.suppliers);
    },

    async loadFromStorage(): Promise<Business[]> {
      const suppliers = await storage.get(KOLA_SUPPLIERS);

      if (suppliers) {
        this.suppliers = suppliers.map((el: object) => new Business(el));
      }

      return this.suppliers;
    },

    async fetchSuppliers() {
      await this.loadFromStorage();

      if (this.suppliers.length > 0) {
        return this.suppliers;
      }

      return axios
        .get('https://api-staging.kola.market/api/v2/businesses?limit=15&page=1')
        .then((response) => {
          this.suppliers = response.data.data.map((el: object) => new Business(el));
          this.persist();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getSuppliers(): Promise<Business[]> {
      if (this.suppliers.length === 0) {
        await this.fetchSuppliers();
      }

      return this.suppliers;
    },

    async getSupplier(supplierId: number): Promise<Business> {
      const suppliers = await this.getSuppliers();

      return suppliers.find((supplier) => supplier.id === supplierId) as Business;
    },

    setSelectedSupplier(supplier: Business) {
      this.selectedSupplier = supplier;
    },

    async fetchSupplierDetails(supplierId: number): Promise<Business> {
      try {
        const response = await axios.get(`https://api-staging.kola.market/api/v2/businesses/${supplierId}`);
        return new Business(response.data.data);
      } catch (error) {
        handleAxiosRequestError(error);
        throw error;
      }
    },

    async fetchSupplierProducts(supplierId: number, page = 1, limit = 50): Promise<Product[]> {
      try {
        const params = {
          businesses_id: supplierId,
          limit,
          page,
          sort: 'latest',
        };

        const response = await axios.get('https://api-staging.kola.market/api/v2/products', { params });
        return response.data.data.map((el: object) => new Product(el));
      } catch (error) {
        handleAxiosRequestError(error);
        throw error;
      }
    },
  },
});
