<template>
    <ion-page>

      <ShopperHeader></ShopperHeader>

      <ion-content :fullscreen="true">
        <VendorHeader></VendorHeader>

        <OrderListNotification></OrderListNotification>

        <ModeToggleCard></ModeToggleCard>
      </ion-content>
    </ion-page>
  </template>

  <script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import ShopperHeader from '@/components/layout/ShopperHeader.vue';
  import ModeToggleCard from '@/components/cards/ModeToggleCard.vue';
  import VendorHeader from './VendorHeader.vue';
  import OrderListNotification from './OrderListNotification.vue';
  </script>

  <style lang="scss">

  .shopper-home-section {
      header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9em;

          h6 {
              font-weight: bold;
              font-size: 0.9em;
              margin: 0px;
          }

          a {
              padding: 3px 10px;
          }
      }
  }</style>
