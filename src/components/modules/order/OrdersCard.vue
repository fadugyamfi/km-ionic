<template>
  <ion-card class="order-card">
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">Order Total</ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="order-price">{{ orderCost }}</ion-text>
      </ion-col>
    </ion-row>
    <ion-row class="divider-row">
      <ion-col class="divider-col"></ion-col>
    </ion-row>
    <ion-row class="row">
      <ion-col size="auto">
        <ion-text class="item-text">Estimated Delivery</ion-text>
      </ion-col>
      <ion-col class="ion-text-end">
        <ion-text class="item-price">TBD</ion-text>
      </ion-col>
    </ion-row>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const orderCost = ref(0);
</script>

<style scoped lang="scss">
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}


</style>
