<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/shopper/cart-business"></IonBackButton>
      </IonButtons>
      <IonTitle size="small" class="fw-bold">Payment Options </IonTitle>
      <SaveForLaterButton />
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
import SaveForLaterButton from "@/components/buttons/SaveForLaterButton.vue";

export default {
  components: {
    IonTitle,
    IonButtons,
    IonHeader,
    IonBackButton,
    IonToolbar,
    SaveForLaterButton,
  },
};
</script>
