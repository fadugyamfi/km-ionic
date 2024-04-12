<template>
  <ion-page>
    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true">
      <VendorHeader></VendorHeader>

      <OrderListNotification
        :orders="orderStore?.orders"
      ></OrderListNotification>

      <!-- <OrderStatistics
        :orderSummary="businessStore?.businessSummary?.orders"
        :no-of-new-orders="orderStore?.orders?.length"
      ></OrderStatistics> -->

      <!-- <SalesStatistics
        :total-sales="businessStore?.businessSummary?.total_sales_value"
        :avg-sales="businessStore?.businessSummary?.average_sales_value"
        :total-order-value="businessStore?.businessSummary?.orders?.total_value"
        showTotalOrderValue
      ></SalesStatistics> -->

      <GrowYourStoreInfo></GrowYourStoreInfo>

      <!-- <ModeToggleCard></ModeToggleCard> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import ShopperHeader from "@/components/layout/ShopperHeader.vue";
import ModeToggleCard from "@/components/cards/ModeToggleCard.vue";
import VendorHeader from "./VendorHeader.vue";
import OrderListNotification from "./OrderListNotification.vue";
import GrowYourStoreInfo from "./GrowYourStoreInfo.vue";
import OrderStatistics from "./OrderStatistics.vue";
import SalesStatistics from "@/components/modules/SalesStatistics.vue";
import { onMounted, ref } from "vue";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import { useOrderStore } from "@/stores/OrderStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import { useUserStore } from "@/stores/UserStore";
import { Order } from "@/models/Order";

const orderStore = useOrderStore();
const userStore = useUserStore();
const businessStore = useBusinessStore();

const fetching = ref(false);

const fetchOrders = async () => {
  try {
    fetching.value = true;
    let start_dt = new Date();
    let end_dt = formatMySQLDateTime(new Date().toISOString());

    start_dt.setDate(start_dt.getDate() - 7);

    await orderStore.fetchReceivedOrders({
      start_dt: formatMySQLDateTime(start_dt.toISOString()),
      end_dt,
    });
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};
const fetchBusinessSummary = async () => {
  fetching.value = true;
  await businessStore.getBusinessSummary(userStore.activeBusiness as Business);
  fetching.value = false;
};

onMounted(() => {
  fetchOrders();
  fetchBusinessSummary();
});
</script>

<style lang="scss">
.shopper-home-section {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;

    h6 {
      font-weight: 500;
      font-size: 0.9em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
}
</style>
