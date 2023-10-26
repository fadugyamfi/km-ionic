<template>
  <IonList>
    <IonItem v-for="(item, index) in items" :key="item.product?.id">
      <ion-thumbnail slot="start" class="custom-thumbnail">
        <IonImg :src="item.product?.image"></IonImg>
      </ion-thumbnail>

      <ion-row class="item-row">
        <ion-col size="10">
          <p class="text-product">{{ item.product.product_name }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p class="price">
            {{ item.product.currency?.symbol || 'GHS' }} {{ item.quantity * (item.product.product_price || 0) }}
          </p>
          <ProductQuantitySelector @change="updateQuantity(item, $event)"></ProductQuantitySelector>
        </ion-col>
        <ion-col size="1" class="remove-button">
          <ion-button fill="clear" color="" @click.prevent.stop="removeFromCart(item, index)">
            <ion-icon class="remove-icon" :icon="closeCircleOutline"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </IonItem>
    <CartTotalCard />
  </IonList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonSegmentButton, IonLabel, IonThumbnail, IonImg, IonBadge, IonItem,
  IonList, IonSegment, IonCol, IonToolbar, IonPage, IonText,
  IonContent, IonRow, IonButton, IonIcon, IonGrid
} from '@ionic/vue';
import { CartItem, useCartStore } from '@/stores/CartStore';
import { closeCircleOutline } from 'ionicons/icons';

const items = ref([]);
const updateQuantity = (item, newQuantity) => {
  console.log('hello');
  item.quantity = newQuantity;
};
const removeFromCart = (item: CartItem, index: number) => {
  cartStore.removeAtIndex(index);
}
</script>

<style scoped lang="scss">
/* Your custom styles go here */
</style>
