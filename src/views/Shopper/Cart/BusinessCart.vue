<template>
  <ion-page>
    <section class="ion-padding">
      <CartHeader>
        <template v-slot:toolbars>
          <section style="padding-top: 10px;">
            <IonSegment value="personal" mode="ios" v-model="viewing" class="segment-margin">
              <IonSegmentButton value="cart">
                <div class="segment-button">
                  <IonLabel :class="{ 'yellow-circle': segmentValue === 'cart' }">Cart</IonLabel>
                  <IonBadge>{{ orderBusiness?.order_items?.length }}</IonBadge>
                </div>
              </IonSegmentButton>
              <IonSegmentButton value="saved">
                <ion-label>Saved</ion-label>
              </IonSegmentButton>
            </IonSegment>
          </section>
        </template>
      </CartHeader>
    </section>

    <ion-content class="ion-padding-horizontal">

      <section class="ion-margin-top">
        <BusinessMinimumOrderReached :business="order?.business" :totalCost="totalCost"></BusinessMinimumOrderReached>
      </section>
      <EmptyCart v-if="orderBusiness?.order_items?.length < 1"></EmptyCart>

      <section v-else>
        <IonList>
          <IonItem v-for="(item, index) in orderBusiness?.order_items" :key="item.product?.id">
            <ion-thumbnail slot="start" class="custom-thumbnail">
              <Image :src="item.product_image"></Image>
            </ion-thumbnail>

            <ion-row class="item-row">
              <ion-col size="10">
                <p class="text-product ion-margin-top">
                  {{ item.product_name }}
                </p>
                <p class="">
                  {{ $t("general.quantity") }}: {{ item.quantity }}
                </p>
                <p class="price">
                  {{
                    Filters.currency(
                      item.quantity * (item.product_price || 0),
                      item.currency_symbol
                    )
                  }}
                </p>
              </ion-col>
              <ion-col size="2" class="d-flex ion-align-items-start">
                <ion-button fill="clear" color="" @click.prevent.stop="removeFromCart(index)">
                  <ion-icon class="remove-icon" :icon="closeCircleOutline"></ion-icon>
                </ion-button>
              </ion-col>
              <ProductQuantitySelector :initial-quantity="item.quantity" @change="updateQuantity(item, $event)">
              </ProductQuantitySelector>
            </ion-row>
          </IonItem>
        </IonList>

        <CartTotalCard />
      </section>
    </ion-content>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton v-if="orderBusiness?.order_items?.length > 0" @click="viewDeliveryDetails()"
                        :disabled="!minOrderAmountReached">
        {{ $t("shopper.cart.proceedToCheckout") }}
      </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  IonSegmentButton,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonBadge,
  IonItem,
  IonList,
  IonSegment,
  IonCol,
  IonPage,
  IonContent,
  IonRow,
  IonButton,
  IonIcon,
  IonFooter,
  onIonViewDidEnter,
} from "@ionic/vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import OrderItemView from "@/components/modules/carts/OrderItemView.vue";
import { closeCircleOutline } from "ionicons/icons";
import CartHeader from "@/components/header/CartHeader.vue";
import EmptyCart from "@/components/cards/EmptyCart.vue";
import CartTotalCard from "@/components/cards/CartTotalCard.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import BusinessMinimumOrderReached from "../../../components/modules/business/BusinessMinimumOrderReached.vue";
import { formatAmountWithCommas } from "@/utilities";
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Order } from "@/models/Order";

const router = useRouter();
const route = useRoute();

const cartStore = useCartStore();

const orderBusiness = computed((): Order | any => {
  return cartStore.orders.find(
    (order: any) => order?.businesses_id == route.params.id
  );
});
const orders = computed(() => cartStore.orders);

const viewing = ref("cart");

const segmentValue = ref("cart");
const updateQuantity = (item: CartItem, newQuantity: number) => {
  item.quantity = newQuantity;
  item.total_price = item.quantity * item.product_price;
};

const removeFromCart = (index: number) => {
  console.log(index, orderBusiness.value);
  cartStore.removeAtItemIndex(orderBusiness.value, index);
};

const totalCost = computed(() => {
  let total = 0;

  const order = cartStore.orders.find(
    (o: Order) => o?.businesses_id == +route.params.id
  );

  if (order) {
    total = order.order_items?.reduce(
      (acc, item) => acc + (item.total_price || 0),
      0
    );
  }

  return total;
});
const order = computed<Order>(() => {
  return cartStore.orders.find(
    (order: Order) => order?.businesses_id == +route.params.id
  ) as Order;
});

const defaultMinOrderAmount = 2000; // Set your default value here

const minOrderAmountReached = computed(() => {
  const minOrderAmount =
    Number(order.value?.business?.min_order_amount) || defaultMinOrderAmount;
  return !isNaN(minOrderAmount) && minOrderAmount <= totalCost.value;
});

const viewDeliveryDetails = () => {
  router.push(`/shopper/cart/business/${route.params.id}/delivery-details`);
};

const viewPaymentMethod = () => {
  router.push(`/shopper/cart/business/${route.params.id}/payment-method`);
};

onIonViewDidEnter(async () => {
  if (cartStore.orders.length == 0) {
    await cartStore.loadFromStorage();
  }
});
</script>

<style scoped lang="scss">
ion-item {
  --padding-start: 0px;
  --inner-padding-end: 0px;
}

ion-footer {
  background-color: #fefefe;
}

.remove-button {
  text-align: end;
}

.item-row {
  align-items: start;

  ion-col {
    margin: 0;
    padding: 0;
  }

  .text-product {
    color: #111;
    margin-top: 1em;
  }

  p {
    margin: 0px;
    color: #667085;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
}

.custom-thumbnail {
  align-self: flex-start;
  margin-right: 16px;
  width: 94px;
  height: 120px;
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

ion-icon.remove-icon {
  color: #000;
  vertical-align: text-top;
}

.remove-button {
  text-align: end;
}

.text-product {
  color: black;
}

.text-product {
  color: black;
}
</style>
