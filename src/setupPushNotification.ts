import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import { useDeviceStore } from "./stores/DeviceStore";
import { Capacitor } from "@capacitor/core";

const FCMToken = localStorage.getItem("FCMToken");

export async function setupPushNotifications() {
  if (!Capacitor.isNativePlatform()) {
    return;
  }
  const status = await PushNotifications.checkPermissions();
  if (FCMToken && status.receive == "granted") {
    return;
  }
  localStorage.removeItem("FCMToken");
  // Request notification permission
  const result = PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
      return true;
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", (token: Token) => {
    useDeviceStore().registerDevice(token.value);
    localStorage.setItem("FCMToken", token.value);
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
      //   alert("Push received: " + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      //   alert("Push action performed: " + JSON.stringify(notification));
    }
  );

  return result;
}

// setupPushNotifications()
