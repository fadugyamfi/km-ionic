// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useDeviceStore } from "@/stores/DeviceStore";
import { Capacitor } from "@capacitor/core";
import { useNotificationStore } from "./stores/NotificationStore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq0qh8BL8LDqSBK6IXiXctqkB2MX1VfjQ",
  authDomain: "kola-market-app.firebaseapp.com",
  projectId: "kola-market-app",
  storageBucket: "kola-market-app.appspot.com",
  messagingSenderId: "177435463423",
  appId: "1:177435463423:web:25371b7f315362fbb606ca",
  measurementId: "G-093DTNK2FF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// let messaging;
function requestPermission() {
  try {
    const messaging = getMessaging(app);
    const FCMToken = localStorage.getItem("FCMToken");

    if (Capacitor.isNativePlatform()) {
      return;
    }

    if (FCMToken && Notification.permission == "granted") {
      return;
    }
    localStorage.removeItem("FCMToken");

    console.log("Requesting permission...");
    const result = Notification.requestPermission().then((permission) => {
      useNotificationStore().cacheNotificationStatus(permission);
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = getToken(messaging, {
          vapidKey:
            "BNtJKjrduSWdDWdtgRZlxpurRzk75440-AP_uB5Ou-hWE9LOq6JTS82wi0K_qgZSu9ZFomlSzwu2mTVOuBPjx7g",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("my token my token", currentToken);
              // Send the token to your server and update the UI if necessary
              useDeviceStore().registerDevice(currentToken);
              localStorage.setItem("FCMToken", currentToken);
              return currentToken;
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              return null;
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            return null;
            // ...
          });
        return token;
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);

      const notificationTitle = payload.notification?.title as string;
      const notificationOptions = {
        body: payload.notification?.body,
        icon: payload.notification?.icon,
      };

      new Notification(notificationTitle, notificationOptions);
    });
    return result;
  } catch (err) {
    console.error("failed to initialize firebase messaging", err);
    return false;
  }
}

export default requestPermission;
