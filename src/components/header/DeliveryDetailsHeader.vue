<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton
          :defaultHref="`/shopper/cart/business/${$route.params.id}/orders`"
        ></IonBackButton>
      </IonButtons>
      <div class="segment-button">
     
        <IonTitle class="fw-bold">  Shipping Details</IonTitle>

        <IonButtons slot="end" style="margin-right: 10px">
          <!-- <IonButton class="save-for-later-button">Save for later</IonButton> -->
        </IonButtons>
      </div>
    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import {
  IonText,
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
    SaveForLaterButton,
    IonButton,
    IonText,
  },
};
</script>
<style scoped="scss">
.save-for-later-button {
  --background: #f0f0f0 !important;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --color: #8d9093;
  --border-radius: 8px !important;
  --box-shadow: none;
  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;
}
.segment-button {
  text-align: center;
}
</style>
