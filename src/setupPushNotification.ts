import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";

async function setupPushNotifications() {
  // Request notification permission
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", (token: Token) => {
    console.log('token', token.value)
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
}

setupPushNotifications();
