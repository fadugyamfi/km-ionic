<template>
  <ion-page>
    <ion-tabs>
      <IonRouterOutlet></IonRouterOutlet>

      <AgentTabBar
        v-if="userStore.user?.isSaleAgent() || userStore.user?.isSalesManager()"
      ></AgentTabBar>
      <section v-else>
        <ShopperTabBar v-if="userStore.isInShoppingMode()"></ShopperTabBar>
        <VendorTabBar v-if="!userStore.isInShoppingMode() && !userStore.isInGuestMode"></VendorTabBar>
        <GuestTabBar v-if="userStore.isInGuestMode()"></GuestTabBar>
      </section>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonPage, IonRouterOutlet } from "@ionic/vue";
import { useUserStore } from "../stores/UserStore";
import ShopperTabBar from "../components/layout/ShopperTabBar.vue";
import VendorTabBar from "../components/layout/VendorTabBar.vue";
import AgentTabBar from "../components/layout/AgentTabBar.vue";
import GuestTabBar from "../components/layout/GuestTabBar.vue";

const userStore = useUserStore();
</script>
