<template>
  <ion-page>
    <ion-tabs>
      <IonRouterOutlet></IonRouterOutlet>

      <AgentTabBar
        v-if="
          userStore.activeRole?.isSalesAssociate()
        "
      ></AgentTabBar>
      <section v-else>
        <ShopperTabBar v-if="userStore.isInShoppingMode()"></ShopperTabBar>
        <VendorTabBar v-if="userStore.isInVendorMode()"></VendorTabBar>
        <GuestTabBar v-if="userStore.isInGuestMode()"></GuestTabBar>
      </section>
      <NotificationSheet :isOpen="showSheet" @didDismiss="cancel()">
      </NotificationSheet>
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
import AppStorage from "../stores/AppStorage";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { useNotificationStore } from "@/stores/NotificationStore";
import { onBeforeMount, onMounted, ref } from "vue";

const storage = new AppStorage();

import NotificationSheet from "@/components/notifications/NotificationSheet.vue";

const userStore = useUserStore();
const notificationStore = useNotificationStore();

const showSheet = ref(false);

const cancel = () => {
  showSheet.value = false;
  notificationStore.cacheNotificationStatus("cancel");
};

const askForNotificationPermission = async () => {
  const res = await notificationStore.askForNotificationPermission();
  if (res) showSheet.value = true;
};

onMounted(() => {
  askForNotificationPermission();
});
</script>
