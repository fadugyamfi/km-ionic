<template>
  <ion-page>

    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true">
      <SearchBar></SearchBar>

      <SuppliersNearYou></SuppliersNearYou>

      <ModeToggleCard></ModeToggleCard>

      <TopCategories></TopCategories>

      <TopBrands></TopBrands>

      <RecentlyViewedProducts></RecentlyViewedProducts>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import SearchBar from "@/views/Shopper/Home/SearchBar.vue";
import SuppliersNearYou from '@/views/Shopper/Home/SuppliersNearYou.vue';
import ModeToggleCard from '@/components/cards/ModeToggleCard.vue';
import TopCategories from './TopCategories.vue';
import TopBrands from './TopBrands.vue';
import RecentlyViewedProducts from './RecentlyViewedProducts.vue';
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
