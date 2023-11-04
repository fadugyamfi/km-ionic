<template>
  <IonCard>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText class="fw-semibold">Items total</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
      </section>
    </section>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText class="fw-semibold">Delivery</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
      </section>
    </section>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
        <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>Achimota Golf Club, 180a
      </IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="ion-margin-end date-color">Change address</IonText>
      </section>
    </section>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
        <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon>Delivery Date - 2.08.2023
      </IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="ion-margin-end date-color">Change Date</IonText>
      </section>
    </section>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText class="fw-semibold">Total Cost</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
      </section>
    </section>
  </IonCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonText, IonCard, IonIcon, } from '@ionic/vue';
import { useCartStore } from '@/stores/CartStore';
import { locationOutline, timeOutline } from "ionicons/icons";

const cartStore = useCartStore();
cartStore.loadFromStorage();
const cartItems = computed(() => cartStore.items)

const totalCost = computed(() => {
  return `GHS ${cartItems.value.reduce((total, item) => total + (item.product_price || 0), 0).toFixed(2)}`;
});
</script>

<style scoped lang="scss">
.date-color {
  color: #666EED;
}
ion-card{
  padding:9px;
}
.fw-semibold {
  flex: 1 0 0;
  color: var(--text-primary, #000);
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
}
</style>
