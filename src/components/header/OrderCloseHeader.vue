<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <ion-button >
          <!-- <img loading="lazy" src="/img/icons/close.svg" class="image" /> -->
        </ion-button>
      </IonButtons>
      <IonTitle class="fw-bold">Order Confirmation</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton } from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    NotificationButton,
    IonTitle,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const navigateBack = () => {
      const destination = `/shopper/home`;
      router.push(destination);
    };

    return {
      navigateBack,
    };
  },
};
</script>
