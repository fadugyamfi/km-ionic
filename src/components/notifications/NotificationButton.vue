<template>
  <IonButton @click="showNotifications()">
    <IonIcon :icon="notificationsOutline" color="dark"></IonIcon>
  </IonButton>
  <LoginRequiredSheet
    :isOpen="showFilterSheet"
    @didDismiss="showFilterSheet = false"
  >
  </LoginRequiredSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationsModal from "./NotificationsModal.vue";
import { IonButton, IonIcon, modalController } from "@ionic/vue";
import { notificationsOutline } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import LoginRequiredSheet from "../modules/LoginRequiredSheet.vue";

export default defineComponent({
  components: {
    IonButton,
    NotificationsModal,
    IonIcon,
    LoginRequiredSheet,
  },

  data() {
    return {
      notificationsOutline,
      showFilterSheet: false,
    };
  },

  methods: {
    async showNotifications() {
      const userStore = useUserStore();
      if (userStore.isInGuestMode()) {
        this.showFilterSheet = true;
        return;
      }
      const modal = await modalController.create({
        component: NotificationsModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        // message.value = `Hello, ${data}!`;
      }
    },
  },
});
</script>
