<template>
  <ion-page>
    <section class="ion-padding">
      <OrderCloseHeader />
    </section>
    <ion-content class="background-image" no-scroll padding>

<section>
  <img  src="/img/orderConfirmation.jpeg" />
  <p class="orderTitle">Expect your item to be delivered between 24-72 hours. Our agent will call to confirm</p>
</section>
 
      <KolaYellowButton @click="toggleFilterSheet"> Track Order </KolaYellowButton>
      <OrderConfirmSheet   :isOpen="showFilterSheet" @didDismiss="showFilterSheet = false"></OrderConfirmSheet>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonContent,
} from "@ionic/vue";

import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderCloseHeader from "@/components/header/OrderCloseHeader.vue";
import OrderConfirmSheet from "@/components/modules/carts/OrderConfirmSheet.vue";

const showFilterSheet = ref(false);

const toggleFilterSheet = () => {
  showFilterSheet.value = !showFilterSheet.value;
};
</script>

<style scoped lang="scss">

.orderTitles {
  color: var(--text-secondary, #74787C);
text-align: center;
font-family: Poppins;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; 
}
</style>
