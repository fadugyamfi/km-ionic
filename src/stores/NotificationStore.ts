import axios from "axios";
import { defineStore } from "pinia";

export class Notification {

    public id: number | null = null;
    public title: string | null = null;
    public content: string | null = null;
    public type: string | null = null;
    public type_id: number | null = null;
    public category: string | null = null;
    public created_at: string | null = null;
    public notifiable: object | null = null;

    constructor(data: object) {
        Object.assign(this, data)
    }
};

export const useNotificationStore = defineStore('notifications', {

    state: () => (<{
        notifications: Notification[],
        fetching: boolean
    }>{
        notifications: [],
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
