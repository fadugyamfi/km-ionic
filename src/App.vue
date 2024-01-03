<template>
  <ion-app>
    <ion-router-outlet />
    <process-notification></process-notification>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useUserStore } from './stores/UserStore';
import { onMounted, onBeforeMount } from 'vue';
import ProcessNotification from './components/layout/ProcessNotification.vue';
import axios from 'axios';
import AppStorage from './stores/AppStorage';
import { useToastStore } from './stores/ToastStore';
import { useAppStore } from './stores/AppStore';

const storage = new AppStorage();

async function configureAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api-staging.kola.market/api';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  await storage.init();
  const auth = await storage.get('kola.auth');

  if (auth) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.access_token}`;
  }
}


onBeforeMount(async () => {
  const appStore = useAppStore();
  appStore.loadCachedSettings();
  appStore.registerUpdateListeners();

  await configureAxios();

  const userStore = useUserStore();
  await userStore.loadStoredData();
})
</script>
