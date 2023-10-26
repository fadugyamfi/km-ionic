import axios from "axios";
import {defineStore} from "pinia";
import { useToastStore } from '@/stores/ToastStore';
import AppStorage from './AppStorage';
import User from "@/models/User";
import { SaleType } from "@/models/SaleType";
import { Sale } from "@/models/Sale";
import Product from "../models/Product";
import { SaleItem } from "../models/SaleItem";

const storage = new AppStorage();
const KOLA_SALES = 'kola.sales';

export const useSaleStore = defineStore("sale", {

    state() {
        return {
            newSale: new Sale({}),
        }
    },

    actions: {
        resetForNewSale() {
            this.newSale = new Sale({});
        },

        addProductToSale(product: Product) {
            const saleItem = new SaleItem({
                products_id: product.id
            });
            this.newSale.items?.push(saleItem)
        },

        removeProductFromSale(product: Product) {
            const index = this.newSale.items?.findIndex((item: SaleItem) => item.products_id == product.id);
            this.newSale.items?.splice(index as number, 1);
        }
    }
});
