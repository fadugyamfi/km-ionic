import axios from "axios";
import {defineStore} from "pinia";
import { useToastStore } from '@/stores/ToastStore';
import AppStorage from './AppStorage';
import User from "@/models/User";
import { SaleType } from "@/models/SaleType";
import { Sale } from "@/models/Sale";

const storage = new AppStorage();
const KOLA_SALES = 'kola.sales';

export const useSaleStore = defineStore("sale", {

    state() {
        return {
            newSale: new Sale({}),
        }
    },

    actions: {

    }
});
