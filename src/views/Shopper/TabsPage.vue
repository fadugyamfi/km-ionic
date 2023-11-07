<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/shopper/home">
          <img src="/images/navigation/home.svg" />
          <img class="active" src="/images/navigation/home_active.svg" />
          <ion-label>{{ $t('general.home') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/shopper/orders">
          <img src="/images/navigation/orders.svg" />
          <img class="active" src="/images/navigation/orders_active.svg" />
          <ion-label>{{ $t('general.orders') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/shopper/cart/business">
          <img src="/images/navigation/cart.svg" />
          <img class="active" src="/images/navigation/cart_active.svg" />
          <ion-label>{{ $t('general.cart') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/shopper/credits">
          <img src="/images/navigation/credit.svg" />
          <img src="/images/navigation/credit_active.svg" class="active" />
          <ion-label>{{ $t('general.credit') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/shopper/profile">
          <img src="/images/navigation/profile.svg" />
          <img src="/images/navigation/profile_active.svg" class="active" />
          <ion-label>{{ $t('general.profile') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>
