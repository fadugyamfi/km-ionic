<template>
  <ion-page>
    <section class="ion-padding">
      <OrderSummaryHeader />
    </section>
    <ion-content>
      <section class="ion-padding">
        <IonText> {{ order?.business?.name || "Kola Market" }} </IonText>
        <!-- <BusinessMinimumOrderReached
          :business="order?.business"
          :totalCost="totalCost"
        ></BusinessMinimumOrderReached> -->
      </section>
      <IonList lines="none">
        <IonItem
          v-for="(item, index) in orderBusiness?._order_items"
          :key="item.products_id"
        >
          <ion-thumbnail slot="start" class="custom-thumbnail">
            <Image :src="item.product_image" w="150"></Image>
          </ion-thumbnail>

          <ion-row class="item-row">
            <ion-col size="10 ">
              <p class="text-product">{{ item.product_name }}</p>
              <p>{{ $t("general.quantity") }}: {{ item.quantity }}</p>
              <p class="price">
                {{
                  Filters.currency(
                    item.quantity * (item.product_price || 0),
                    item.currency_symbol
                  )
                }}
              </p>
            </ion-col>
            <ion-col size="1" class="remove-button">
              <ion-button
                fill="clear"
                color=""
                @click.prevent.stop="removeFromCart(index)"
              >
                <ion-icon
                  class="remove-icon"
                  :icon="closeCircleOutline"
                ></ion-icon>
              </ion-button>
            </ion-col>
            <ProductQuantitySelector
              :initialQuantity="item.quantity"
              @change="updateQuantity(item, $event)"
            >
            </ProductQuantitySelector>
          </ion-row>
        </IonItem>
      </IonList>

      <IonCard>
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold">Items total</IonText>
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold ion-margin-end">{{
              Filters.currency(totalCost as number, "GHS")
            }}</IonText>
          </section>
        </section>
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold">Delivery Fee</IonText>
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold ion-margin-end">
              {{ Filters.currency(deliveryFee, "GHS") }}
            </IonText>
          </section>
        </section>
        <section class="d-flex flex-column">
          <IonText
            color="medium"
            class="font-medium"
            style="margin-bottom: 8px"
          >
            <IonIcon
              :icon="locationOutline"
              style="margin-right: 3px; vertical-align: middle"
            ></IonIcon>
            <span style="padding-top: 94px; vertical-align: middle">{{
              orderBusiness?.delivery_location
            }}</span>
          </IonText>
          <!-- <section class="d-flex ion-align-items-center">
      <IonText class="ion-margin-end date-color" @click="toggleFilterSheet">
        Change address
      </IonText>
    </section> -->
        </section>
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold">Total Cost</IonText>
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold ion-margin-end">{{
              Filters.currency(totalWithDelivery as number, "GHS")
            }}</IonText>
          </section>
        </section>
      </IonCard>

      <!-- <ItemReview :order="order" :orderBusiness="orderBusiness" /> -->
    </ion-content>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="createOrder">
        Place Order
      </KolaYellowButton>
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
  IonCard,
  onIonViewDidEnter,
} from "@ionic/vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import {
  alertCircleOutline,
  closeCircleOutline,
  warningOutline,
  timeOutline,
  locationOutline,
} from "ionicons/icons";
import ItemReview from "@/components/cards/ItemReview.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderSummaryHeader from "@/components/header/OrderSummaryHeader.vue";
import Image from "@/components/Image.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Order } from "../../../models/Order";
import BusinessMinimumOrderReached from "../../../components/modules/business/BusinessMinimumOrderReached.vue";
import Filters from "@/utilities/Filters";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";

const route = useRoute();

const router = useRouter();
const toastStore = useToastStore();
const cartStore = useCartStore();

const orderBusiness = computed((): Order | any => {
  return cartStore.orders.find(
    (order: Order) => order?.businesses_id == +route.params.id
  ) as Order;
});
const orders = computed(() => cartStore.orders);
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

const updateQuantity = (item: CartItem, newQuantity: number) => {
  item.quantity = newQuantity;
  item.total_price = item.quantity * item.product_price;

  console.log("updated", item.total_price);
};

const removeFromCart = (index: number) => {
  cartStore.removeAtItemIndex(orderBusiness.value, index);
};

// const getOrderBusiness = () => {
//   console.log("jello");
//   const business = orders.value.find(
//     (order: any) => order?.businesses_id == route.params.id
//   );
//   console.log("Found business:", business); // Add this line for debugging
//   orderBusiness.value = business;
// };

// const cartStore = useCartStore(orderBusiness.value);

const createOrder = async () => {
  try {
    toastStore.blockUI("Hold On As We Place Your Order");
    const placedOrder = await cartStore.createOrder({
      ...orderBusiness.value,
      total_order_amount: totalCost.value,
      product_units_id: 1,
      payment_modes_id: orderBusiness.value.payment_option_id,
      total_items: orderBusiness.value._order_items.length,
      order_items: orderBusiness.value._order_items,
    });
    if (placedOrder) {
      router.replace(
        `/shopper/cart/business/${placedOrder.id}/order-confirmation`
      );
      toastStore.unblockUI();
      await toastStore.showSuccess(
        "Order has been placed successfully",
        "",
        "bottom"
      );
      cartStore.clearCart();
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to place order. Please try again",
        "",
        "bottom",
        "footer"
      );
    }
  } catch (error) {
    handleAxiosRequestError(error);
  }
};

cartStore.loadFromStorage();
const cartOrders = computed(() => cartStore.orders);

const totalCost = computed(() => {
  const total = orderBusiness.value?.order_items?.reduce(
    (total: any, item: any) => total + (item.total_price || 0),
    0
  );

  return total;
});

const deliveryFee = ref(0);

const totalWithDelivery = computed(() => {
  return totalCost.value + deliveryFee.value;
});

onIonViewDidEnter(async () => {
  if (cartStore.orders.length == 0) {
    await cartStore.loadFromStorage();
  }
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

  font-size: 20px !important;
  /* Increase the icon size */
  padding: 3px;
  border-radius: 50%;
  margin-right: 10px;
  /* Increase the spacing between icon and text */
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

.date-color {
  color: #666eed;
}

ion-card {
  padding: 9px;
}

.fw-semibold {
  flex: 1 0 0;
  color: var(--text-primary, #000);
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
}
</style>
