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
            <ion-badge class="badge" color="warning">{{ cartStore.items.length }}</ion-badge>
          </div>
        </IonSegmentButton>
        <IonSegmentButton value="saved">
          <ion-label>Saved</ion-label>
        </IonSegmentButton>
      </IonSegment>

      <EmptyCart v-if="cartStore.items.length === 0"></EmptyCart>

      <IonList v-else>
        <IonItem v-for="(item, index) in cartStore.items" :key="item.product?.id">
          <ion-thumbnail slot="start" class="custom-thumbnail">
            <IonImg :src="item.product?.image"></IonImg>
          </ion-thumbnail>

          <ion-row class="item-row">
            <ion-col size="10 ">
              <p class="text-product">{{ item.product.product_name }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <p class="price">{{ item.product.currency?.symbol || 'GHS' }} {{ item.quantity * (item.product.product_price
                || 0) }}</p>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import {
  IonSegmentButton, IonLabel, IonThumbnail, IonImg, IonBadge, IonItem,
  IonList, IonSegment, IonCol, IonToolbar, IonPage, IonText,
  IonContent, IonRow, IonButton, IonIcon, IonGrid
} from '@ionic/vue';
import { CartItem, useCartStore } from '@/stores/CartStore';

import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import ProductQuantitySelector from '@/components/modules/products/ProductQuantitySelector.vue';
import { closeCircleOutline } from 'ionicons/icons';
import CartHeader from '@/components/header/CartHeader.vue';
import EmptyCart from '@/components/cards/EmptyCart.vue';
import CartTotalCard from '@/components/cards/CartTotalCard.vue';

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
.item-row {
  align-items: center;
}

.remove-button {
  text-align: end;
}

.item-row ion-col {
  margin: 0;
  padding: 0;
}

.text-product,
p {
  margin: 0;
  padding: 0;
  color: #667085
}


.custom-thumbnail {
  align-self: flex-start;
  margin-right: 16px;
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

.custom-thumbnail {
  width: 94px;
  height: 120px;
}

.custom-label {
  color: black;

  p {
    font-size: 14px;
    font-family: "Poppins";
    font-weight: 400;
    text-transform: capitalize;
    line-height: 22px;
    word-wrap: break-word;
  }

  .price {
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 18px;
    word-wrap: break-word;
  }
}

.item-row[data-v-c11d03b0] {
  align-items: baseline;
}

ion-icon.remove-icon {
  color: #000;
  vertical-align: text-top;
}

.text-product {
  color: black;
}</style>