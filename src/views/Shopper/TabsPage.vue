<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/shopper/home">
          <img src="/images/navigation/home.svg" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/shopper/orders">
          <img src="/images/navigation/orders.svg" />
          <ion-label>Orders</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/shopper/cart">
          <img src="/images/navigation/cart.svg" />
          <ion-label>Cart</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/shopper/credits">
          <img src="/images/navigation/credit.svg" />
          <ion-label>Credit</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/shopper/profile">
          <img src="/images/navigation/profile.svg" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
</script>

<style scoped lang="scss">
img {
  height: 24px;
}

ion-tabs {
  ion-tab-bar {
    background-color: #ffffff;
    border: none;
    box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.12);

    ion-tab-button {
      ion-label {
        font-weight: bold;
        color: #003366;
      }
    }
  }
}
</style>
