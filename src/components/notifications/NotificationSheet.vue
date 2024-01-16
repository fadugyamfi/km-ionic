<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]">
    <IonContent class="ion-padding">
      <header class="ion-padding ion-text-center" style="margin-top: 80px">
        Kola wants to send you notifications
      </header>
      <main class="ion-padding-vertical">
        <KolaYellowButton
          @click="enableNotification()"
          class="ion-margin-bottom"
          >Enable Notification</KolaYellowButton
        >
        <KolaWhiteButton @click="cancel()">Cancel</KolaWhiteButton>
      </main>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import { IonContent, IonModal } from "@ionic/vue";
import { defineComponent } from "vue";
import { useNotificationStore } from "@/stores/NotificationStore";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { setupPushNotifications } from "@/setupPushNotification";
import requestPermission from "@/setupPWAPushNotifications";
import AppStorage from "@/stores/AppStorage";
import { mapStores } from "pinia";

const storage = new AppStorage();

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    KolaYellowButton,
    KolaWhiteButton,
  },

  computed: {
    ...mapStores(useNotificationStore),
  },

  methods: {
    enableNotification() {
      setupPushNotifications();
      requestPermission();
      this.$el.dismiss();
    },
    async cancel() {
      await storage.init();
      this.notificationsStore.cacheNotificationStatus("cancel");
      this.$el.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}
</style>
