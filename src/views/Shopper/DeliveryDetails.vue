<template>
  <ion-page>

      <SaveForLaterHeader/>
    

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <SaveForLaterHeader/>
      <IonText>Add Delivery address</IonText>
     

    </ion-content>

    <IonFooter class="ion-padding ion-no-border" v-if="cartStore.items.length">
      <KolaYellowButton>
        Proceed to Checkout
      </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import {
  IonSegmentButton, IonLabel, IonThumbnail, IonImg,
  IonBadge, IonItem, IonList, IonSegment, IonCol, IonPage,
  IonContent, IonText, IonButton, IonIcon, IonFooter
} from '@ionic/vue';
import { CartItem, useCartStore } from '@/stores/CartStore';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import ProductQuantitySelector from '@/components/modules/products/ProductQuantitySelector.vue';
import { closeCircleOutline } from 'ionicons/icons';
import CartHeader from '@/components/header/CartHeader.vue';
import SaveForLaterHeader from '@/components/header/SaveForLaterHeader.vue';
import KolaInputField from '@/components/input/KolaInputField.v  header/SaveForLaterHeader.vue';
import EmptyCart from '@/components/cards/EmptyCart.vue';
import CartTotalCard from '@/components/cards/CartTotalCard.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';


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
}
</style>