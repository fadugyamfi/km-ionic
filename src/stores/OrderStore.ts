import { defineStore } from "pinia";
import Country from "../models/Country";
import Region from "../models/Region";
import AppStorage from "./AppStorage";


const storage = new AppStorage();

export const useLocationStore = defineStore('order', {

    state: () => {
        return {
            orders: [] as Country[],
        }
    },
});
