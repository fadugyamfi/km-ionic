import axios from "axios";
import { defineStore } from "pinia";
import Notification from "@/models/Notification";

export const useNotificationStore = defineStore('notifications', {

    state: () => ({
        notifications: [] as Notification[],
        fetching: false
    }),

    actions: {

        async fetchNotifications() {
            this.fetching = true;

            return axios.get('/v2/notifications')
                .then(response => {
                    this.notifications = response.data.data.map((obj: object) => new Notification(obj))
                })
                .finally(() => this.fetching = false);
        },

        getGeneralNotifications() {
            return this.notifications.filter((notification) => notification.type != 'Order');
        },

        getOrderNotifications() {
            return this.notifications.filter((notification) => notification.type == 'Order');
        }
    }
});
