import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import { useDeviceStore } from "./stores/DeviceStore";
import { Capacitor } from "@capacitor/core";
import { useNotificationStore } from "./stores/NotificationStore";
import AppStorage from "./stores/AppStorage";

const storage = new AppStorage();

export async function setupPushNotifications() {
  const fcm_token = await storage.get("kola.fcm-token");

  if (!Capacitor.isNativePlatform()) {
    return;
  }
  const status = await PushNotifications.checkPermissions();
  if (fcm_token && status.receive == "granted") {
    return;
  }
  await storage.remove("kola.fcm-token");
  // Request notification permission
  const response = PushNotifications.requestPermissions().then((result) => {
    useNotificationStore().cacheNotificationStatus(result.receive);
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
      return true;
    } else {
      console.log("not granted");
      // Show some error
      return false;
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", async (token: Token) => {
    useDeviceStore().registerDevice(token.value);
    await storage.set("kola.fcm-token", token.value);
    // alert("Push registration success, token: " + token.value);
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener("registrationError", (error: any) => {
    // alert("Error on registration: " + JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      console.log("received notification", notification);
      //   alert("Push received: " + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      // alert("Push action performed: " + JSON.stringify(notification));
      console.log("push notification action performed", notification);
    }
  );
  return response;
}

// setupPushNotifications()
