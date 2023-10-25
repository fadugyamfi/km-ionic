<template>
  <ion-page>
    <!-- <ShopperHeader></ShopperHeader> -->
    <section class="ion-padding">
      <ion-header class="inner-header">
        <ion-toolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <ion-title size="small" class="fw-bold">Order History</ion-title>
          <ion-buttons slot="end">
            <IonButton fill="clear">
              <IonIcon :icon="optionsOutline" slot="icon-only"></IonIcon>
            </IonButton>
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
            <IonBadge color="warning">{{ orderStore.orders.length }}</IonBadge>
          </div>
        </ion-segment-button>
        <ion-segment-button value="thisweek">
          <ion-label>This Week</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pastmonth">
          <ion-label>Past Month</ion-label>
        </ion-segment-button>
      </ion-segment>
      <OrderList :orders="orderStore.orders"></OrderList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonSegment, IonLabel, IonButtons, IonBackButton, IonBadge, IonButton, IonIcon } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import OrderList from '@/components/modules/order/OrderList.vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import { ref } from 'vue';
import { useOrderStore } from '@/stores/OrderStore';
import { optionsOutline } from 'ionicons/icons';


const orderStore = useOrderStore();
const viewing = ref('today');
const segmentValue = ref('today');
</script>
