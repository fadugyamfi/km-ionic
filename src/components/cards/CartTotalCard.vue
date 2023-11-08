<template>
  <ion-card class="custom-card">
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">Item total</ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="item-price">{{ 'GHS ' + (totalCost || 0) }}
        </ion-text>
      </ion-col>
    </ion-row>
    <ion-row class="divider-row">
      <ion-col class="divider-col"></ion-col>
    </ion-row>
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">Delivery</ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="item-price">TBD</ion-text>
      </ion-col>
    </ion-row>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonCol, IonText, IonRow, IonCard } from "@ionic/vue";
import { useCartStore } from "@/stores/CartStore";
import { useRoute } from "vue-router";

const route = useRoute();

const cartStore = useCartStore();

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const totalCost = computed(() => {
  const business = cartOrders.value.find(
    (business: any) => business?.businesses_id == route.params.id
  );
  if (business) {
    const total = business.order_items.reduce(
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
.custom-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
  margin-left: 0px;
  margin-right: 0px;
}

.row {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

ion-col.ion-text-end {
  justify-content: flex-end;
}

.item-text,
.item-price {
  color: #000;
  font-size: 14px;
  font-family: "Poppins";
  font-weight: 400;
  text-transform: capitalize;
  line-height: 22px;
  word-wrap: break-word;
}

.item-price {
  line-height: 18px;
  row-gap: 49px;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
