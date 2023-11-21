<template>
  <ion-page>
    <section class="ion-padding">
      <OrderCloseHeader />
    </section>
    <ion-content class="background-image ion-padding-horizontal" no-scroll padding>
      <section>
        <img src="/img/orderConfirmation.jpeg" />
        <p class="order-title">
          Expect your item to be delivered between 24-72 hours. Our agent will
          call to confirm
        </p>
      </section>

      <KolaYellowButton @click="toggleFilterSheet">
        Track Order
      </KolaYellowButton>
      <OrderConfirmSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        :order="order"

      ></OrderConfirmSheet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderCloseHeader from "@/components/header/OrderCloseHeader.vue";
import OrderConfirmSheet from "@/components/modules/carts/OrderConfirmSheet.vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Order } from "../../../models/Order";
import BusinessMinimumOrderReached from "../../../components/modules/business/BusinessMinimumOrderReached.vue";

const showFilterSheet = ref(false);

const toggleFilterSheet = () => {
  showFilterSheet.value = !showFilterSheet.value;
};

const route = useRoute();

const router = useRouter();

const orderBusiness = ref<any>(null);
const orders = computed(() => cartStore.orders);
const order = computed<Order>(() => {
  return cartStore.orders.find(
    (order: Order) => order?.businesses_id == +route.params.id
  ) as Order;
});

const minOrderAmountReached = computed(() => {
  return (
    order.value?.business?.min_order_amount == null ||
    (order.value?.business?.min_order_amount as number) <= totalCost.value
  );
});

const updateQuantity = (item: CartItem, newQuantity: number) => {
  item.quantity = newQuantity;
  item.total_price = item.quantity * item.product_price;
};

const removeFromCart = (index: number) => {
  cartStore.removeAtItemIndex(orderBusiness.value, index);
};

const getOrderBusiness = () => {
  console.log("jello");
  const business = orders.value.find(
    (order: any) => order?.businesses_id == route.params.id
  );
  console.log("Found business:", business); // Add this line for debugging
  orderBusiness.value = business;
};

const cartStore = useCartStore(orderBusiness.value);

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const totalCost = computed(() => {
  const total = order.value?.order_items?.reduce(
    (total: any, item: any) => total + (item.total_price || 0),
    0
  );

  return total;
});
</script>

<style scoped lang="scss">
.order-title {
  color: var(--text-secondary, #74787c) !important;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}
</style>
