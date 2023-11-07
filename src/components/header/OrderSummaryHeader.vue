<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton
          :defaultHref="`/shopper/cart/business/${$route.params.id}/payment-options`"
        ></IonBackButton>
      </IonButtons>
      <IonTitle class="fw-bold">Order summary </IonTitle>
      <IonButtons slot="end" style="margin-right: 10px">
        <IonButton class="save-for-later-button">Save for later</IonButton>
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
  IonButton,
  IonTitle,
} from "@ionic/vue";
import SaveForLaterButton from "@/components/buttons/SaveForLaterButton.vue";

export default {
  components: {
    IonTitle,
    IonButtons,
    IonButton,
    IonHeader,
    IonBackButton,
    IonToolbar,
    SaveForLaterButton,
  },
};
</script>
<style scoped="scss">
</style>
