<template>
  <IonHeader class="inner-header">
    <IonToolbar class="ion-align-items-center">
      <IonButtons slot="start">
        <IonBackButton
          :defaultHref="`/shopper/cart/business/${$route.params.id}/orders`"
        ></IonBackButton>
        
      </IonButtons>
      <IonTitle size="small" class="fw-bold"> Shipping Details </IonTitle>
      <IonButtons slot="end" style="margin-right: 10px;">
        <IonButton class="save-for-later-button" 
          >Save for later</IonButton
        >
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
    SaveForLaterButton,
    IonButton,
  },
};
</script>
<style scoped="scss">
ion-title {
  color: #000;
font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; 
}

</style>
