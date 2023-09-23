<template>
  <ion-page>

    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true">
      <SearchBar></SearchBar>

      <SuppliersNearYou></SuppliersNearYou>

      <ModeToggleCard></ModeToggleCard>

      <section class="ion-padding">
        top categories
      </section>

      <section class="ion-padding">
        top brands
      </section>

      <section class="ion-padding">
        recently viewed
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import SearchBar from "@/views/Shopper/Home/SearchBar.vue";
import SuppliersNearYou from '@/views/Shopper/Home/SuppliersNearYou.vue';
import ModeToggleCard from '../../components/cards/ModeToggleCard.vue';
</script>
