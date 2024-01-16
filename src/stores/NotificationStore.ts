import axios from "axios";
import { defineStore } from "pinia";
import Notification from "@/models/Notification";
import AppStorage from "./AppStorage";

const storage = new AppStorage();

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as Notification[],
    fetching: false,
  }),

  actions: {
    async fetchNotifications() {
      this.fetching = true;

      return axios
        .get("/v2/notifications")
        .then((response) => {
          this.notifications = response.data.data.map(
            (obj: object) => new Notification(obj)
          );
        })
        .finally(() => (this.fetching = false));
    },

    getGeneralNotifications() {
      return this.notifications.filter(
        (notification) => notification.type != "Order"
      );
    },

    getOrderNotifications() {
      return this.notifications.filter(
        (notification) => notification.type == "Order"
      );
    },

    async cacheNotificationStatus(status: string) {
      if (status !== "default" && status !== "cancel") {
        await storage.remove("kola.notification-status")
      } else {
        await storage.set("kola.notification-status", status, 7, "days");
      }
    },
  },
});
