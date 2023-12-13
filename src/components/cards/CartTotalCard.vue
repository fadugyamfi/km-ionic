<template>
  <ion-card class="custom-card">
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">
          Item total
        </ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="item-price">
          {{ Filters.currency((totalCost || 0)) }}
        </ion-text>
      </ion-col>
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
import Filters from '@/utilities/Filters';
import { Order } from "../../models/Order";

const route = useRoute();

const cartStore = useCartStore();

const deliveryDate = (method: string) => {
 

  // Define the number of days to add based on the method
  let daysToAdd = method === "standard" ? 3 : method === "express" ? 2 : 0;

  if (daysToAdd > 0) {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    // Format the date as DD/MM/YY
    const dd = deliveryDate.getDate().toString().padStart(2, "0");
    const mm = (deliveryDate.getMonth() + 1).toString().padStart(2, "0");
    const yy = deliveryDate.getFullYear().toString().slice(-2);

    form.fields.delivery_date = `${dd}/${mm}/${yy}`;
  }
};

const totalCost = computed(() => {
  let total = 0;

  const order = cartStore.orders.find((o: Order) => o?.businesses_id == +route.params.id);

  if (order) {
    total = order.order_items?.reduce(
      (acc, item) => acc + (item.total_price || 0),
      0
    );
  }

  return total;
});
</script>

<style scoped lang="scss">
.custom-card {
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
