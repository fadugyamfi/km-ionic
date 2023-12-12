<template>
  <IonButton @click="showFavorites()">
    <IonIcon :icon="heartOutline" color="dark"></IonIcon>
  </IonButton>
  <LoginRequiredSheet
    :isOpen="showFilterSheet"
    @didDismiss="showFilterSheet = false"
  >
  </LoginRequiredSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FavoritesModal from "./FavoritesModal.vue";
import { IonButton, IonIcon, modalController } from "@ionic/vue";
import { heartOutline } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import LoginRequiredSheet from "../LoginRequiredSheet.vue";

export default defineComponent({
  components: {
    IonButton,
    FavoritesModal,
    IonIcon,
    LoginRequiredSheet
  },

  data() {
    return {
      heartOutline,
      showFilterSheet: false,
    };
  },

  methods: {
    async showFavorites() {
      const userStore = useUserStore();
      if (userStore.isInGuestMode()) {
        this.showFilterSheet = true;
        return;
      }
      const modal = await modalController.create({
        component: FavoritesModal,
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
