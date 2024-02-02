<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/orders"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            Edit Order - #{{ order?.id }}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <section class="ion-padding">
          <IonText class="fw-semibold">
            {{ order?._business?.name || "No Business" }}
          </IonText>
          <BusinessMinimumOrderReached :business="order?.business" :totalCost="totalCost"></BusinessMinimumOrderReached>
        </section>
        <IonList lines="none">
          <IonItem v-for="(item, index) in order?._order_items" :key="item.products_id">
            <ion-thumbnail slot="start" class="custom-thumbnail">
              <Image :src="item.product_image" w="100"></Image>
            </ion-thumbnail>

            <ion-row class="item-row">
              <ion-col size="10 ">
                <h6 class="text-product">{{ item.product?.product_name }}</h6>
                <p class="price">
                  {{
                    Filters.currency(
                      (item.quantity || 0) *
                      (item.unit_price || 0),
                      item.currency_symbol
                    )
                  }}
                </p>
                <p>{{ $t("general.quantity") }}: {{ item.quantity }}</p>
              </ion-col>
              <ion-col size="1" class="remove-button">
                <ion-button fill="clear" @click.prevent.stop="removeFromCart(item, index)">
                  <ion-icon class="remove-icon" color="medium" :icon="closeCircleOutline"></ion-icon>
                </ion-button>
              </ion-col>
              <ProductQuantitySelector :initialQuantity="item?.quantity" @change="updateQuantity(item, $event)">
              </ProductQuantitySelector>
            </ion-row>
          </IonItem>
          <IonButton fill="clear" size="small" style="text-transform: none" class="ion-text-start add-new-item"
                     @click="addNewItem">
            <IonIcon :icon="addCircleOutline" style="margin-right: 5px"></IonIcon>
            Add new item
          </IonButton>
        </IonList>
        <EditOrderSummaryCard :order="(order as Order)" />
      </section>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="updateOrder"> Update Order </KolaYellowButton>
      <KolaWhiteButton @click="cancel"> Cancel </KolaWhiteButton>
    </IonFooter>
  </ion-page>
</template>
<script lang="ts" setup>
import {
  IonIcon,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonSpinner,
  IonThumbnail,
  IonItem,
  IonList,
  IonCol,
  IonRow,
  IonFooter,
  IonText,
  onIonViewWillEnter,
} from "@ionic/vue";
import {
  alertCircleOutline,
  closeCircleOutline,
  warningOutline,
  chatbubbleOutline,
  addCircleOutline,
} from "ionicons/icons";

import { onMounted, ref, computed } from "vue";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import Image from "@/components/Image.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Order } from "@/models/Order";
import { CartItem } from "@/stores/CartStore";
import Filters from "@/utilities/Filters";
import { useOrderStore } from "@/stores/OrderStore";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import { OrderItem } from "@/models/OrderItem";
import EditOrderSummaryCard from "@/components/modules/order/EditOrderSummaryCard.vue";
import BusinessMinimumOrderReached from "@/components/modules/business/BusinessMinimumOrderReached.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import router from "@/router";

const route = useRoute();
const orderStore = useOrderStore();

const fetching = ref(false);

const order = computed(() => orderStore.editedOrder);

const getOrder = async () => {
  console.log("getOrder");
  fetching.value = true;
  const order_id = +route.params.id;
  // order.value = orderStore.orders.find((o) => o.id == order_id) as Order;
  try {
    const response = await orderStore.fetchOrder(order_id, true);
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};

const totalCost = computed(() =>
  order.value?._order_items?.reduce(
    (total, item) => total + (item.total_price || 0),
    0
  )
);

const removeFromCart = async (item: OrderItem, index: number) => {
  const toastStore = useToastStore();
  try {
    const response = await orderStore.removeItem(item);
    order.value?._order_items.splice(index, 1);
    toastStore.showSuccess("Removed item from order");
    orderStore.persist();
  } catch (error) {
    toastStore.showError("Failed to remove item from order.");
  }
};

const updateQuantity = (item: OrderItem, newQuantity: number) => {
  item.quantity = newQuantity;
  item.total_price = item.quantity * (item._product?._product_price || 0);
};

const addNewItem = () => {
  orderStore.editing = true;
  router.push(
    `/shopper/home/businesses/${order.value?.businesses_id}/products`
  );
};

const updateOrder = async () => {
  const toastStore = useToastStore();
  toastStore.blockUI("Hold On As We Update Your Order");
  const updatedOrder = {
    businesses_id: order.value?.businesses_id,
    cms_users_id: order.value?.cms_users_id,
    customer_id: order.value?.customer_id,
    delivery_location: order.value?.delivery_location,
    product_units_id: order.value?.product_units_id,
    payment_modes_id: order.value?.payment_modes_id,
    payment_option_id: order.value?.payment_option_id,
    total_items: order.value?._order_items.length,
    total_order_amount: totalCost.value,
    order_items: order.value?._order_items.map((item) => {
      return {
        products_id: item.products_id,
        quantity: item.quantity,
        total_price: item.total_price,
        unit_price: item.unit_price,
        product_units_id: item.product_units_id,
        cms_users_id: item.cms_users_id,
        businesses_id: item.businesses_id,
        currencies_id: item.currencies_id,
      };
    }),
  };
  const response = await orderStore.updateOrder(+route.params.id, updatedOrder);
  if (response) {
    router.replace("/shopper/orders/history");
    orderStore.editedOrder = {} as Order;
    orderStore.persist();
  }
  toastStore.unblockUI();
};

const cancel = () => {
  orderStore.editing = false;
  orderStore.editedOrder = {} as Order;
  orderStore.persist();
  router.replace("/shopper/orders/history");
};

onIonViewWillEnter(() => {
  orderStore.editedOrder = orderStore.selectedOrder as Order;

  if (!orderStore.editedOrder) {
    getOrder();
  }
});
</script>

<style lang="scss" scoped>
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
  align-items: start;
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
  margin: 4px 0 0 0;
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

.item-row[data-v-c11d03b0] {
  align-items: baseline;
}

ion-icon.remove-icon {
  color: #000;
  vertical-align: text-top;
}

.text-product {
  color: black;
  font-size: 14px;
}

.price {
  color: #000;
}

.add-new-item {
  --color: #666eed;
}
</style>
