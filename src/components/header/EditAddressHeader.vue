<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/profile/address"></IonBackButton>
      </IonButtons>
      <IonTitle class="fw-bold">Edit Address </IonTitle>
      <IonButtons slot="end">

      </IonButtons>
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

<style scoped></style>
