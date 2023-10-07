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

onBeforeMount(async () => {
  const userStore = useUserStore();
  await userStore.loadStoredData();
})
</script>
