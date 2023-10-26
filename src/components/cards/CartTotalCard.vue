<template>
  <ion-card class="custom-card">
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">Item total</ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="item-price">{{ totalCost }}</ion-text>
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
import { computed } from 'vue';
import { IonCol, IonText, IonRow, IonCard } from '@ionic/vue';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
cartStore.loadFromStorage();

const totalCost = computed(() => {
  return `GHS ${cartStore.items.reduce((total, item) => total + (item.product.product_price || 0), 0).toFixed(2)}`;
});
</script>

<style scoped lang="scss">
.custom-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

.row {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

ion-col.ion-text-end {
  justify-content: flex-end;
}

.item-text, .item-price {
  color: var(--text-color);
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

/* Rest of your CSS styles... */
</style>
