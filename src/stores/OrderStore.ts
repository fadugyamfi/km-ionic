import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { Order } from "../models/Order";

const storage = new AppStorage();

export const useOrderStore = defineStore('order', {

    state: () => {
        return {
            orders: [
                new Order({
                    id: 1,
                    businesses_id: 71,
                    customer_id: 72,
                    start_dt: '2023-10-25 10:00:00',
                    created_at:  '2023-10-25 10:00:00', // <-- use this
                    due_date: '2023-11-01',
                    order_status_id: 8,
                    order_status: {
                        id: 8,
                        name: 'Cancelled'
                    }
                })
            ] as Order[],
        }
    },
});
