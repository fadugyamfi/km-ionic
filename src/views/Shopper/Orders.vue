<template>
  <ion-page>
    <ShopperHeader></ShopperHeader>
    <section class="ion-padding">
      <ion-header class="inner-header">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/shopper/home"></ion-back-button>
          </ion-buttons>
          <ion-title size="small" class="fw-bold">Order History</ion-title>
          <ion-buttons slot="end">
            <NotificationButton></NotificationButton>
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
            <ion-badge color="warning">{{ orderStore.items.length }}</ion-badge>
          </div>
        </ion-segment-button>
        <ion-segment-button value="thisweek">
          <ion-label>This Week</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pastmonth">
          <ion-label>Past Month</ion-label>
        </ion-segment-button>
      </ion-segment>
      <OrderList :orders="orderStore.items"></OrderList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonSegment, IonLabel } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import OrderList from '@/components/modules/order/OrderList.vue';
import NotificationButton from '@/components/modules/notification/NotificationButton.vue';
import { ref } from 'vue';
import { useOrderStore } from '@/stores/OrderStore';


const orderStore = useOrderStore();
const viewing = ref('today');
const segmentValue = ref('today');
</script>
