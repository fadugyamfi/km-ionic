<template>
    <ion-content class="ion-padding" :fullscreen="true">
      <ion-header class="inner-header ion-margin-bottom">
        <ion-toolbar>
          <IonButtons slot="start">
            <IonButton @click="goBack">
              <IonIcon :icon="close"></IonIcon>
            </IonButton>
          </IonButtons>
          <ion-title>Order History</ion-title>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon :icon="settings"></IonIcon>
            </IonButton>
          </IonButtons>
        </ion-toolbar>
      </ion-header>
  
      <IonSegment value="today" mode="ios" v-model="viewing">
        <IonSegmentButton value="today">
          <IonLabel>Today</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="thisweek">
          <IonLabel>This Week</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="pastmonth">
          <IonLabel>Past Month</IonLabel>
        </IonSegmentButton>
      </IonSegment>
  
      <div v-if="viewing === 'today'">
        <OrderList :orders="ordersToday" />
      </div>
      <div v-else-if="viewing === 'thisweek'">
        <OrderList :orders="ordersThisWeek" />
      </div>
      <div v-else-if="viewing === 'pastmonth'">
        <OrderList :orders="ordersPastMonth" />
      </div>
    </ion-content>
  </template>
  
  <script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
  import { close, settings } from 'ionicons/icons';
  import OrderList from '@/components/modules/order/OrderList.vue';
  import { ref, computed, watch } from 'vue';
  
  const viewing = ref('today');
  const ordersToday = ref([]); 
  const ordersThisWeek = ref([]); 
  const ordersPastMonth = ref([]);
  
  const goBack = () => {
  };
  watch(viewing, (newViewing) => {
    if (newViewing === 'today') {
      fetchOrdersToday();
    } else if (newViewing === 'thisweek') {
      fetchOrdersThisWeek();
    } else if (newViewing === 'pastmonth') {
      fetchOrdersPastMonth();
    }
  });
  
  
  const fetchOrdersToday = () => {
  };
  
  const fetchOrdersThisWeek = () => {
     };
  
  const fetchOrdersPastMonth = () => {
   };
  </script>
  
  <style scoped lang="scss">
  ion-segment {
    ion-segment-button {
      padding-top: 0.4em;
      padding-bottom: 0.4em;
    }
  }
  </style>
  