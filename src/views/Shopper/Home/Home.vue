<template>
  <ion-page>

    <ShopperHeader :show-search="true"></ShopperHeader>

    <ion-content :fullscreen="true">
      <CategoryPills></CategoryPills>

      <PromoSpace></PromoSpace>

      <TopCategories></TopCategories>

      <TopBrands></TopBrands>

      <RecentlyViewedProducts></RecentlyViewedProducts>

      <SuppliersNearYou></SuppliersNearYou>

      <section class="shopper-home-section">
        <ModeToggleCard></ModeToggleCard>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import SuppliersNearYou from '@/views/Shopper/Home/SuppliersNearYou.vue';
import ModeToggleCard from '@/components/cards/ModeToggleCard.vue';
import TopCategories from './TopCategories.vue';
import TopBrands from './TopBrands.vue';
import RecentlyViewedProducts from './RecentlyViewedProducts.vue';
import CategoryPills from './CategoryPills.vue';
import PromoSpace from './PromoSpace.vue';
</script>

<style lang="scss">

.shopper-home-section {
    margin-bottom: 10px;
    margin-top: 10px;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-bottom: 10px;

        h6 {
            font-weight: bold;
            font-size: 1em;
            margin: 0px;
        }

        a {
            padding: 3px 10px;
        }
    }
}</style>
