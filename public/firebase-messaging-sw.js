// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBq0qh8BL8LDqSBK6IXiXctqkB2MX1VfjQ",
  authDomain: "kola-market-app.firebaseapp.com",
  projectId: "kola-market-app",
  storageBucket: "kola-market-app.appspot.com",
  messagingSenderId: "177435463423",
  appId: "1:177435463423:web:25371b7f315362fbb606ca",
  measurementId: "G-093DTNK2FF",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


