import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Added by the CLI
// import './registerServiceWorker';
// import "./setupPushNotification";
// import "./messaging_init_in_sw";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import "intl-tel-input/build/css/intlTelInput.css";

import "swiper/scss";
import "@ionic/vue/css/ionic-swiper.css";

/* Virtual Scrolling */
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

/* Theme variables */
// import './theme/variables.css';
import "./theme/app.scss";

import VOtpInput from "vue3-otp-input";
import messages from "./locales";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { RecycleScroller } from "vue-virtual-scroller";
import VueGtag from "vue-gtag";
import { Capacitor } from "@capacitor/core";
import mixpanel from "mixpanel-browser";

// initialize clarity
var success = function (message: string) {};
var failure = function (message: string) {};

declare let ClarityPlugin: any;

if (Capacitor.getPlatform() === "android") {
  ClarityPlugin.initialize("lnbp07y1u3", success, failure, {
    logLevel: ClarityPlugin.LogLevel.None,
    allowMeteredNetworkUsage: true,
    isIonic: true,
  });
}

// initialize mixpanel
mixpanel.init("4001c65a4be2e2aad4ca04eb473f1413", {
  debug: true,
  track_pageview: false,
  persistence: "localStorage",
  ignore_dnt: true,
});
// }
//

// Function to get URL parameter by name
function getParameterByName(name: string, url: any = null) {
  console.log(name);
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Capture UTM parameters
var utmSource = getParameterByName("utm_source");
var utmMedium = getParameterByName("utm_medium");
var utmCampaign = getParameterByName("utm_campaign");

// Send UTM parameters to Mixpanel with an event
if (window.location.hostname != "localhost") {
  mixpanel.track("Mobile Page View", {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  });
}

// Above the createApp() line
defineCustomElements(window);

// prepare for i18n
const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  allowComposition: true,
});

// setup pina
const pinia = createPinia();

// initialize the app
const app = createApp(App)
  .component("v-otp-input", VOtpInput)
  .component("RecycleScroller", RecycleScroller)
  .use(IonicVue, {
    rippleEffect: true,
    mode: "md",
    experimentalCloseWatcher: true,
  })
  .use(i18n)
  .use(pinia)
  .use(router)

  .use(VueGtag, {
    config: { id: "G-093DTNK2FF" },
  });

router.isReady().then(() => {
  app.mount("#app");
});
