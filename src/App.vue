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

const storage = new AppStorage();

async function configureAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api-staging.kola.market/api';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  await storage.init();
  const auth = await storage.get('kola.auth');

  if( auth ) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.access_token}`;
  }
}

async function addAvailableUpdateListener() {
  if( !("serviceWorker" in navigator) ) {
    return;
  }

  let refreshing = false;
  const toastStore = useToastStore();
  const registration = await navigator.serviceWorker.getRegistration();

  if (registration) {
    registration.addEventListener("updatefound", () => {
      toastStore.showInfo("Installing New Updates In The Background", "Update Available", "top");

      // our new instance is visible under installing property, because it is in 'installing' state
      // let's wait until it changes its state
      setTimeout(() => {
        registration.installing?.addEventListener('statechange', () => {
            if (registration.waiting) {
              console.log('serviceWorker activate listener');
              toastStore.showSuccess("Update Installed. Application will refresh shortly", "Update Installed", "top");
              setTimeout(() => window.location.reload(), 3000);
            } else {
              console.log('serviceWorker activate listener');
              // toastStore.showError("Install Failed. We'll retry again later", "Install Failed", "top");
            }
        });
      }, 1000)

    });

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
    })
  } else {
    setTimeout(() => addAvailableUpdateListener(), 5000);
    console.log("no service worker registration found")
  }
}


onBeforeMount(async () => {
  addAvailableUpdateListener();
  await configureAxios();

  const userStore = useUserStore();
  await userStore.loadStoredData();
})
</script>
