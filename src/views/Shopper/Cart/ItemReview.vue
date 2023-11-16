<template>
  <ion-page>
    <section class="ion-padding">
      <OrderSummaryHeader />
    </section>
    <ion-content>
      <section class="ion-padding">
        <IonText> {{ order?.business?.name || 'No Business' }} </IonText>
        <BusinessMinimumOrderReached :business="order?.business" :totalCost="totalCost"></BusinessMinimumOrderReached>
        <!-- <p v-if="minOrderAmountReached">
          {{ Filters.currency(order?.business?.min_order_amount as number, order?.currency?.symbol as string) }} minimum reached
        </p>
        <p v-else="minOrderAmountReached">
          <IonIcon :icon="alertCircleOutline" color="danger"></IonIcon>
          {{ Filters.currency(order?.business?.min_order_amount as number, order?.currency?.symbol as string) }} minimum not reached
        </p> -->

      </section>
      <IonList lines="none">
        <IonItem v-for="(item, index) in orderBusiness?._order_items" :key="item.products_id">
          <ion-thumbnail slot="start" class="custom-thumbnail">
            <Image :src="item.product_image"></Image>
          </ion-thumbnail>

          <ion-row class="item-row">
            <ion-col size="10 ">
              <p class="text-product">{{ item.product_name }}</p>
              <p>{{ $t('general.quantity') }}: {{ item.quantity }}</p>
              <p class="price">
                {{ Filters.currency( item.quantity * (item.product_price || 0), item.currency_symbol ) }}
              </p>
            </ion-col>
            <ion-col size="1" class="remove-button">
              <ion-button fill="clear" color="" @click.prevent.stop="removeFromCart(index)">
                <ion-icon class="remove-icon" :icon="closeCircleOutline"></ion-icon>
              </ion-button>
            </ion-col>
            <ProductQuantitySelector :initialQuantity="item.quantity" @change="updateQuantity(item, $event)"></ProductQuantitySelector>
          </ion-row>
        </IonItem>
      </IonList>

      <ItemReview />
    </ion-content>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="createOrder" :disabled="!minOrderAmountReached"  > Continue </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  IonThumbnail,
  IonItem,
  IonList,
  IonCol,
  IonPage,
  IonContent,
  IonRow,
  IonButton,
  IonIcon,
  IonFooter,
  IonText,
} from "@ionic/vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import { alertCircleOutline, closeCircleOutline, warningOutline } from "ionicons/icons";
import ItemReview from "@/components/cards/ItemReview.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderSummaryHeader from "@/components/header/OrderSummaryHeader.vue";
import Image from "@/components/Image.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Order } from "../../../models/Order";
import BusinessMinimumOrderReached from "../../../components/modules/business/BusinessMinimumOrderReached.vue";


const route = useRoute();


const router = useRouter();

const orderBusiness = ref<any>(null);
const orders = computed(() => cartStore.orders);
const order = computed<Order>(() => {
  return cartStore.orders.find((order: Order) => order?.businesses_id == +route.params.id) as Order
})

const minOrderAmountReached = computed(() => {
  return order.value?.business?.min_order_amount == null || order.value?.business?.min_order_amount as number <= totalCost.value;
})

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

const createOrder = () => {
  const response = cartStore.createOrder({
    ...orderBusiness.value,
    total_order_amount: totalCost.value,
    product_units_id: 1,
    payment_modes_id: orderBusiness.value.payment_option_id,
    total_items: orderBusiness.value._order_items.length,
    order_items: orderBusiness.value._order_items,
 
  });

  router.push(`/shopper/cart/business/${route.params.id}/order-confirmation`);
}

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const totalCost = computed(() => {
  const total = order.value?.order_items?.reduce(
    (total: any, item: any) => total + (item.total_price || 0),
    0
  );

  return total;
});



onMounted(async () => {
  if (cartStore.orders.length == 0) {
    await cartStore.loadFromStorage();
  }
  getOrderBusiness();
});
</script>

<style scoped lang="scss">
ion-footer {
  background-color: #fefefe;
}

ion-icon {
  &.danger {
    background-color: rgba(255, 0, 0, 0.174);
  }

  &.success {
    background-color: rgba(0, 255, 85, 0.174);
  }

  font-size: 20px !important; /* Increase the icon size */
  padding: 3px;
  border-radius: 50%;
  margin-right: 10px; /* Increase the spacing between icon and text */
}

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

.item-row[data-v-f6937d18] {
  align-items: baseline;
}

p {
  color: #667085;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.text-product,
p {
  margin: 0;
  padding: 0;
  color: #667085;
}

.custom-thumbnail {
  align-self: flex-start;
  margin-right: 16px;
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
