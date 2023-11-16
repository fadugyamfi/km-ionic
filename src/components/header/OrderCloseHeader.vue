<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <img loading="lazy" src="/img/icons/close.svg" class="image" />
      </IonButtons>
      <IonTitle class="fw-bold">Order Confirmation</IonTitle>
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
