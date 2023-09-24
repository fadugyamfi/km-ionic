<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useUserStore } from './stores/UserStore';
import { onMounted, onBeforeMount } from 'vue';

onBeforeMount(async () => {
  const userStore = useUserStore();
  await userStore.loadStoredData();
})
</script>
