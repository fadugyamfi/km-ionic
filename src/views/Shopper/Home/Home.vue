<template>
  <ion-page>
    <ShopperHeader :show-search="true"></ShopperHeader>

    <ion-content>
      <CategoryPills></CategoryPills>

      <PromoSpace></PromoSpace>

      <Promotions></Promotions>

      <TopCategories></TopCategories>

      <!-- <TopBrands></TopBrands> -->

      <!-- <SuppliersNearYou></SuppliersNearYou> -->

      <RecentlyViewedProducts ></RecentlyViewedProducts>

      <TrendingProducts ></TrendingProducts>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import ShopperHeader from "@/components/layout/ShopperHeader.vue";
import TopCategories from "./TopCategories.vue";
import CategoryPills from "./CategoryPills.vue";
import PromoSpace from "./PromoSpace.vue";
import { defineAsyncComponent } from "vue";

// code split
// const SuppliersNearYou = defineAsyncComponent(() => import("@/views/Shopper/Home/SuppliersNearYou.vue"));
// const TopBrands = defineAsyncComponent(() => import("./TopBrands.vue"));
const RecentlyViewedProducts = defineAsyncComponent(() => import("./RecentlyViewedProducts.vue"));
const TrendingProducts = defineAsyncComponent(() => import("./TrendingProducts.vue"));
const Promotions = defineAsyncComponent(() => import("./Promotions.vue"))

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
      font-weight: 500;
      font-size: 1em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
}
</style>
