import { Capacitor } from "@capacitor/core";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";

const FCMToken = localStorage.getItem("FCMToken");

export const notification = () => {
  const getNotificationStatus = async () => {
    if (Capacitor.isNativePlatform()) {
      const status = await PushNotifications.checkPermissions();
      return status.receive;
    }
    if (!Capacitor.isNativePlatform()) {
      const status = Notification.permission;
      return status;
    }

    //     if (FCMToken && status.receive == "granted") {
    //       return true;
    //     } else {
    //       localStorage.removeItem("FCMToken");
    //       return false;
    //     }
    //   };

    //   const isPWAHasGranted = () => {
    //     if (FCMToken && Notification.permission == "granted") {
    //       return true;
    //     } else {
    //       localStorage.removeItem("FCMToken");
    //       return false;
    //     }
  };

  return {
    getNotificationStatus,
  };
};
