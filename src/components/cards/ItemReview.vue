<template>
  <IonCard>
    <section
      class="d-flex ion-justify-content-between ion-align-items-center"
      style="margin-bottom: 8px"
    >
      <IonText class="fw-semibold">Items total</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">{{
          Filters.currency(totalCost as number, "GHS")
        }}</IonText>
      </section>
    </section>
    <section
      class="d-flex ion-justify-content-between ion-align-items-center"
      style="margin-bottom: 8px"
    >
      <IonText class="fw-semibold">Delivery Fee</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">
          TBD
          <!-- {{ Filters.currency(deliveryFee, "GHS") }} -->
        </IonText>
      </section>
    </section>
    <section class="d-flex flex-column">
      <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
        <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>
        {{ business?.delivery_location }}
      </IonText>
      <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
        Pay on delivery
      </IonText>
      <!-- <section class="d-flex ion-align-items-center">
      <IonText class="ion-margin-end date-color" @click="toggleFilterSheet">
        Change address
      </IonText>
    </section> -->
    </section>
    <section
      class="d-flex ion-justify-content-between ion-align-items-center"
      style="margin-bottom: 8px"
    >
      <IonText class="fw-semibold">Total Cost</IonText>
      <section class="d-flex ion-align-items-center">
        <IonText class="fw-semibold ion-margin-end">{{
          Filters.currency(totalWithDelivery as number, "GHS")
        }}</IonText>
      </section>
    </section>
  </IonCard>
  <DeliveryAddressSheet
    :isOpen="showFilterSheet"
    @didDismiss="showFilterSheet = false"
  ></DeliveryAddressSheet>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IonText, IonCard, IonIcon } from "@ionic/vue";
import { useCartStore } from "@/stores/CartStore";
import { locationOutline, timeOutline } from "ionicons/icons";
import { useRoute } from "vue-router";
import DeliveryAddressSheet from "@/components/modules/carts/DeliveryAddressSheet.vue";
import Filters from "@/utilities/Filters";

const route = useRoute();
const showFilterSheet = ref(false);
const toggleFilterSheet = () => {
  showFilterSheet.value = !showFilterSheet.value;
};

const cartStore = useCartStore();

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const business = computed(() => {
  const business = cartOrders.value.find(
    (business: any) => business?.businesses_id == route.params.id
  );
  return business;
});

const totalCost = computed(() => {
  const business = cartOrders.value.find(
    (business: any) => business?.businesses_id == route.params.id
  );

  let total = 0;

  if (business) {
    total = business.order_items?.reduce(
      (total, item) => total + (item.total_price || 0),
      0
    );
  }

  return total;
});


const deliveryFee = ref(0);

const totalWithDelivery = computed(() => {
  return totalCost.value + deliveryFee.value;
});
</script>

<style scoped lang="scss">
.date-color {
  color: #666eed;
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
