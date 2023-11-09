<template>
  <IonCard>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText class="fw-semibold">Items total</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">{{ totalCost }}</IonText>
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
        <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>Delivery Address
      </IonText>
      <section class="d-flex ion-align-items-center"  @click="showChangeAddressSheet = true">
        <IonText class="ion-margin-end date-color">Change address</IonText>
      </section>
    </section>
    <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
      <IonText class="fw-semibold">Total Cost</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">{{ totalCost }}</IonText>
      </section>
    </section>
  </IonCard>
  
  <DeliveryAddressSheet :isOpen="showChangeAddressSheet" @didDismiss="showChangeAddressSheet = false">
  </DeliveryAddressSheet>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import { IonText, IonCard } from "@ionic/vue";
import { useCartStore } from "@/stores/CartStore";
import { locationOutline, timeOutline } from "ionicons/icons";
import DeliveryAddressSheet from "@/components/modules/carts/DeliveryAddressSheet.vue";

import { useRoute } from "vue-router";

const showChangeAddressSheet = ref(false);

const route = useRoute();

const cartStore = useCartStore();

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const totalCost = computed(() => {
  const business = cartOrders.value.find(
    (business: any) => business?.businesses_id == route.params.id
  );
  if (business) {
    const total = business.order_items?.reduce(
      (total, item) => total + (item.total_price || 0),
      0
    );
    if (total) {
      return total.toFixed(2);
    }
  }
});
</script>


<style scoped lang="scss">
.date-color {
  color: #666EED;
}

ion-card {
  padding: 9px;
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
