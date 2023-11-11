<template>
  <ion-page>
    <section class="ion-padding">
      <CartBusinessHeader />
    </section>

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <IonSegment value="personal" mode="ios" v-model="viewing">
        <IonSegmentButton value="cart">
          <div class="segment-button">
            <IonLabel :class="{ 'yellow-circle': segmentValue === 'cart' }"
              >Cart</IonLabel
            >
            <IonBadge>{{ cartStore.orders.length }}</IonBadge>
          </div>
        </IonSegmentButton>
        <IonSegmentButton value="saved">
          <ion-label>Saved</ion-label>
        </IonSegmentButton>
      </IonSegment>

      <EmptyCart v-if="cartStore.orders.length === 0"></EmptyCart>
      <IonList v-else>
        <OrderView
          v-for="order in cartStore.orders"
          :order="order"
          :key="order.businesses_id"
        ></OrderView>
      </IonList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  IonSegmentButton,
  IonLabel,
  IonBadge,
  IonList,
  IonSegment,
  IonPage,
  IonContent,
} from "@ionic/vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import CartBusinessHeader from "@/components/header/CartBusinessHeader.vue";
import EmptyCart from "@/components/cards/EmptyCart.vue";
import OrderView from "@/components/modules/carts/OrderView.vue";

const cartStore = useCartStore();
const viewing = ref("cart");

const segmentValue = ref("cart");
const updateQuantity = (item: CartItem, newQuantity: number) => {
  console.log("hello");
  item.quantity = newQuantity;
};

const removeFromCart = (item: CartItem, index: number) => {
  cartStore.removeAtIndex(index);
};

onMounted(() => {
  if ((cartStore.orders.length == 0)) {
    cartStore.loadFromStorage();
  }
});
</script>

<style scoped lang="scss">
ion-text.space {
  margin-bottom: 550px;
}

ion-segment {
  margin-bottom: 20px;
}
.item-row {
  align-items: center;
}

.order-view-wrapper {
  margin-top: 16px;
}

ion-item {
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --padding-start: 0px;
  margin-bottom: 10px;
}

ion-text {
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
  color: #667085;
}

.segment-button {
  display: flex;
  align-items: center;
}
ion-badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

.item-row[data-v-c11d03b0] {
  align-items: baseline;
}

element.style {
  margin-bottom: 20px;
}
</style>
