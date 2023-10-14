import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Added by the CLI
import './registerServiceWorker';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import "intl-tel-input/build/css/intlTelInput.css";

/* Theme variables */
// import './theme/variables.css';
import './theme/app.scss';

import VOtpInput from "vue3-otp-input";
import axios from 'axios';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import AppStorage from './stores/AppStorage';
import messages from './locales';

const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});


const pinia = createPinia();

const app = createApp(App)
  .component("v-otp-input", VOtpInput)
  .use(IonicVue)
  .use(i18n)
  .use(pinia)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
