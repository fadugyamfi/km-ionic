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
import './theme/variables.css';
import './theme/app.scss';

import VOtpInput from "vue3-otp-input";
import axios from 'axios';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import AppStorage from './stores/AppStorage';
import messages from './locales';

const storage = new AppStorage();

async function configureAxios() {
  axios.defaults.baseURL = 'http://api.kolamarket.local/api'; // import.meta.env.VITE_API_BASE_URL || 'https://api-staging.kola.market/api';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const authResult = await storage.get('kola.auth');

  if( authResult && typeof authResult== 'string' ) {
      const auth = JSON.parse(authResult);
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.access_token}`;
  }
}

const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});

configureAxios()

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
