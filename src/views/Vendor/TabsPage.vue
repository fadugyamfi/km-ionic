<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/vendor/home">
          <img src="/images/navigation/home.svg" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/vendor/orders">
          <img src="/images/navigation/orders.svg" />
          <ion-label>Orders</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/vendor/sales">
          <img src="/images/navigation/cart.svg" />
          <ion-label>Sales</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/vendor/credits">
          <img src="/images/navigation/credit.svg" />
          <ion-label>Credit</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/vendor/profile">
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

<style scoped>
ion-label {
  font-weight: bold;
}

img {
  height: 24px;
}
</style>
