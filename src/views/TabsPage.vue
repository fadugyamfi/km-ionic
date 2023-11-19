<template>
  <ion-page>
    <ion-tabs>
      <IonRouterOutlet></IonRouterOutlet>

      <ShopperTabBar v-if="userStore.appMode == 'shopping'"></ShopperTabBar>
      <VendorTabBar v-else></VendorTabBar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import { useUserStore } from '../stores/UserStore';
import ShopperTabBar from '../components/layout/ShopperTabBar.vue';
import VendorTabBar from '../components/layout/VendorTabBar.vue';

const userStore = useUserStore();

</script>
