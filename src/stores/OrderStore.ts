import { defineStore } from "pinia";
import Country from "../models/Country";
import Region from "../models/Region";
import AppStorage from "./AppStorage";
export interface Order {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export const useOrderStore = defineStore('order', {

    state: () => {
        return {
            orders: [] as Order[], 
        }
    },
});
