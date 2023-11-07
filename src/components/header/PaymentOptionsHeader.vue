<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton
          :defaultHref="`/shopper/cart/business/${$route.params.id}/delivery-details`"
        ></IonBackButton>
      </IonButtons>
      <IonTitle size="small" class="fw-bold">Payment Options </IonTitle>
      <IonButtons slot="end" style="margin-right: 10px;">
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
  IonButton,
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
    IonButton,
    SaveForLaterButton,
  },
};
</script>
