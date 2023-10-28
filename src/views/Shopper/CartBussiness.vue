<template>
  <ion-page>
    <ShopperHeader />
    <section class="ion-padding">
      <CartHeader />
    </section>

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <IonSegment value="personal" mode="ios" v-model="viewing">
        <IonSegmentButton value="cart">
          <div class="segment-button">
            <IonLabel :class="{ 'yellow-circle': segmentValue === 'cart' }">Cart</IonLabel>
            <ion-badge class="badge" color="warning">{{ cartStore.businesses.length }}</ion-badge>
          </div>
        </IonSegmentButton>
        <IonSegmentButton value="saved">
          <ion-label>Saved</ion-label>
        </IonSegmentButton>
      </IonSegment>

      <ion-text class="space">2 Items from 1 Brand are ready for checkout</ion-text>

       <EmptyCart v-if="cartStore.items.length === 0"></EmptyCart> 
       
<BusinessInCart></BusinessInCart>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import {
  IonSegmentButton, IonLabel, IonThumbnail, IonImg,
  IonBadge, IonItem, IonList, IonSegment, IonCol, IonPage,
  IonContent, IonRow, IonText, IonButton, IonIcon
} from '@ionic/vue';
import { CartItem, useCartStore } from '@/stores/CartStore';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import CartHeader from '@/components/header/CartHeader.vue';
import EmptyCart from '@/components/cards/EmptyCart.vue';
import BusinessInCart from '@/components/modules/sales/BusinessInCart.vue';


const cartStore = useCartStore();
cartStore.loadFromStorage();
const viewing = ref('cart');

const segmentValue = ref('cart');
const updateQuantity = (item: CartItem, newQuantity: number) => {
  console.log('hello');
  item.quantity = newQuantity;
}

const removeFromCart = (item: CartItem, index: number) => {
  cartStore.removeAtIndex(index);
}

</script>

<style scoped lang="scss">
ion-text.space {
  margin-bottom: 550px;
}

.item-row {
  align-items: center;
}

ion-item {
    --inner-padding-start: 0px;
    --inner-padding-end: 0px;
    --padding-start: 0px;
    margin-bottom: 10px;
}
ion-text{
  margin-bottom: 7px;
}

ion-thumbnail {
    min-width: 85px;
    height: 140px;
    margin-right: 10px;
    --border-radius: 8px;
}

.text-product,
p {
  margin: 0;
  padding: 0;
  color: #667085
}

.segment-button {
  display: flex;
  align-items: center;
}

.badge {
  background: yellow;
  border-radius: 50%;
  padding: 4px;
  color: black;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 500;
  line-height: 20px;
}

.item-row[data-v-c11d03b0] {
  align-items: baseline;
}

</style>