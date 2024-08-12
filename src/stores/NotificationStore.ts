import axios from "axios";
import { defineStore } from "pinia";
import Notification from "@/models/Notification";
import AppStorage from "./AppStorage";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { useUserStore } from "./UserStore";
import requestPermission from "@/setupPWAPushNotifications";

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
        await storage.remove("kola.notification-status");
      } else {
        await storage.set("kola.notification-status", status, 7, "days");
      }
    },
    async askForNotificationPermission() {
      await storage.init();

      if (Capacitor.isNativePlatform()) {
        const permission = await PushNotifications.checkPermissions();
        if (permission.receive == "prompt") {
          const notification_status = await storage.get(
            "kola.notification-status"
          );
          if (notification_status != "cancel") {
            await storage.remove("kola.notification-status");
            if (useUserStore().user != null && !notification_status) {
              return true;
            }
          }
        }
      }
      if (!Capacitor.isNativePlatform()) {
        const permission = window.Notification.permission;
        if (permission == "default") {
          const notification_status = await storage.get(
            "kola.notification-status"
          );
          if (notification_status != "cancel") {
            await storage.remove("kola.notification-status");
            if (useUserStore().user != null && !notification_status) {
              return true;
            }
          }
        }
      }
    },
  },
});
