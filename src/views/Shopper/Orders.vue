<template>
  <ion-page>
    <section class="ion-padding">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/shopper/home"></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">Order History</IonTitle>
          <ion-buttons slot="end">
            <NotificationButton />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </section>

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <ion-segment value="today" mode="ios" v-model="viewing">
        <ion-segment-button value="today">
          <div style="display: flex; align-items: center;">
            <ion-label :class="{'yellow-circle': segmentValue === 'today'}">
              Today
            </ion-label>
            <ion-badge color="warning">{{ orderStore.orders.length }}</ion-badge>
          </div>
        </ion-segment-button>
        <ion-segment-button value="thisweek">
          <ion-label>This Week</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pastmonth">
          <ion-label>Past Month</ion-label>
        </ion-segment-button>
      </ion-segment>
      <OrderList :orders="orderStore.orders" :selectedSegment="viewing" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonBadge,
  IonTitle
} from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import { ref } from 'vue';
import { useOrderStore } from '@/stores/OrderStore';
import OrderList from '@/components/modules/order/OrderList.vue';

const orderStore = useOrderStore();
const viewing = ref('today');
const segmentValue = ref('today');
</script>

<style scoped>
  ion-content {
    --align-items: center;
  }

  ion-segment {
    --padding-top: 10px;
    --padding-bottom: 10px;
    --padding-left: 10px;
    --padding-right: 10px;
  }

  ion-segment-button {
    --padding-top: 10px;
    --padding-bottom: 10px;
    --padding-left: 10px;
    --padding-right: 10px;
  }

  /* ion-segment-button ion-label {
    font-size: 16px;
    --align-items: center;
    text-align: center;
    overflow: inherit;
    text-overflow: inherit;
  } */
</style>
