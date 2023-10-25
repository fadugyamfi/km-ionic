<template>
  <ion-page>
    <ShopperHeader />
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            Cart
          </IonTitle>
          <IonButtons slot="end">
            <NotificationButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">

      <IonSegment value="personal" mode="ios" v-model="viewing">
        <IonSegmentButton value="cart">
          <div style="display: flex; align-items: center;">
  <IonLabel :class="{ 'yellow-circle': segmentValue === 'cart' }">
    Cart
  </IonLabel>
  <ion-badge color="warning">{{ cartStore.items.length }}</ion-badge>
</div>
        </IonSegmentButton>
        <IonSegmentButton value="saved">
          <ion-label>Saved</ion-label>
        </IonSegmentButton>
      </IonSegment>

      <IonList>
        <IonItem v-for="(item, index) in cartStore.items" :key="item.product?.id">
          <IonAvatar slot="start" class="fullcover">
            <IonImg :src="item.product?.image"></IonImg>
          </IonAvatar>
          
          <IonLabel>
            <p class="text-product">{{ item.product.product_name }}</p>
            <p>Quantity: &nbsp;{{ item.quantity || 1 }}</p>
            <p>{{ item.product.currency?.symbol || 'GHS' }} {{ item.quantity || 1 * (item.product.product_price || 0) }}</p>
            <ProductQuantitySelector @change="updateQuantity(item, $event)"></ProductQuantitySelector>
          </IonLabel>

          <!-- <IonButton fill="clear" color="black" slot="end" @click.prevent.stop="removeFromCart(item, index)">
            <IonIcon :icon="closeCircleOutline"></IonIcon>
          </IonButton>  -->
        </IonItem>
        
      </IonList>
    

      <ion-card class="custom-card">
        <ion-row class="row">
          <ion-col class="col">
            <ion-row class="inner-row">
              <ion-col size="auto">
                <ion-text class="item-text">Item total</ion-text>
              </ion-col>
              <ion-col size="auto">
                <ion-text class="item-price">{{ calculateTotalCost }}</ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
        <ion-row class="divider-row">
          <ion-col class="divider-col"></ion-col>
        </ion-row>
        <ion-row class="row">
          <ion-col class="col">
            <ion-row class="inner-row">
              <ion-col size="auto">
                <ion-text class="item-text">Delivery</ion-text>
              </ion-col>
              <ion-col size="auto">
                <ion-text class="item-price">TBD</ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import {
  IonPage, IonContent, IonToolbar,
  IonButtons, IonBackButton, IonHeader,
  IonSegment, IonSegmentButton,
  IonTitle, IonList, IonItem, IonLabel,
  IonCard, IonRow, IonCol, IonText,
  IonAvatar, IonImg, IonButton, IonIcon, IonBadge
} from '@ionic/vue';
import { CartItem, useCartStore } from '@/stores/CartStore';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import ProductQuantitySelector from '@/components/modules/products/ProductQuantitySelector.vue';
import { closeCircleOutline } from 'ionicons/icons';
import { ref, computed } from 'vue';

const cartStore = useCartStore();
cartStore.loadFromStorage();
const viewing = ref('cart');


const segmentValue = ref('cart');
const updateQuantity = (item: CartItem, newQuantity: number) => {
  item.quantity = newQuantity;

}

const calculateTotalCost = computed(() => {
  let totalCost = 0;
  for (const item of cartStore.items) {
    totalCost += (item.product.product_price || 0);
  }
  return `GHS ${totalCost.toFixed(2)}`;
});
const removeFromCart = (item: CartItem, index: number) => {
  cartStore.removeAtIndex(index);
}
</script>


<style scoped lang="scss">
.fullcover {
  width: 94px;
  height: 120px;
  border-radius: 12px;
  background-size: cover;
  border: 2px solid rgb(243, 237, 237);
  border-radius: 10px;
  overflow: auto;
}
.ion-img {
  border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    width: 94px;
  height: 120px;
}
.custom-card {
  height: 85px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: white;
  box-shadow: 0px 4px 24px rgba(105, 111, 130, 0.10);
  border-radius: 8px;
}

.text-product {
  color: black;
}

.row {
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
}

.inner-row {
  width: 326.17px;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 88px;
  display: inline-flex;
}

.col {
  flex: 1 1 0;
  height: 22px;
  justify-content: flex-start;
  align-items: center;
  gap: 93px;
  display: flex;
}

.item-text {
  color: black;
  font-size: 14px;
  font-family: "Poppins";
  font-weight: 400;
  text-transform: capitalize;
  line-height: 22px;
  word-wrap: break-word;
}

.badge-text {
  background: yellow;
  border-radius: 50%;
  padding: 4px;
  display: inline-block;
  color: black;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 500;
  line-height: 20px;
  word-wrap: break-word;
}

.item-price {
  color: black;
  font-size: 14px;
  font-family: "Poppins";
  font-weight: 400;
  text-transform: capitalize;
  line-height: 18px;
  word-wrap: break-word;
  row-gap: 49px;
  justify-content: flex-end;
  align-items: flex-end;
}

.divider-row {
  width: 326px;
  height: 0px;
  border: 1px #F1F1F1 solid;
}

.divider-col {
  height: 100%;
}
</style>
