<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/shopper/cart/business"></IonBackButton>
      </IonButtons>
      <IonTitle class="fw-bold">Payment Method</IonTitle>

    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";

export default {
  components: {
    NotificationButton,
    IonTitle,
    IonButtons,
    IonHeader,
    IonBackButton,
    IonToolbar,
  },
};
</script>
