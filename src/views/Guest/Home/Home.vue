<template>
  <ion-page>
    <GuestHeader :show-search="true"></GuestHeader>

    <ion-content :fullscreen="true">
      <CategoryPills></CategoryPills>

      <PromoSpace></PromoSpace>

      <Promotions></Promotions>

      <!-- <TopCategories></TopCategories> -->

      <!-- <TopBrands></TopBrands> -->

      <!-- <RecentlyViewedProducts></RecentlyViewedProducts> -->

      <!-- <SuppliersNearYou></SuppliersNearYou> -->

      <TrendingProducts v-if="showTrending"></TrendingProducts>

      <!-- <section class="shopper-home-section">
        <ModeToggleCard></ModeToggleCard>
      </section> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import { onMounted, ref } from "vue";
import GuestHeader from "@/components/layout/GuestHeader.vue";
import SuppliersNearYou from "@/views/Guest/Home/SuppliersNearYou.vue";
import ModeToggleCard from "@/components/cards/ModeToggleCard.vue";
import Promotions from "./Promotions.vue";
import TopCategories from "./TopCategories.vue";
import TopBrands from "./TopBrands.vue";
import RecentlyViewedProducts from "./RecentlyViewedProducts.vue";
import CategoryPills from "./CategoryPills.vue";
import PromoSpace from "./PromoSpace.vue";
import TrendingProducts from "@/views/Guest/Home/TrendingProducts.vue";

const viewLoaded = ref(false);
const showTrending = ref(false);

onMounted(() => {
  setTimeout(() => showTrending.value = true, 2000);
})

onIonViewDidEnter(() => {
  viewLoaded.value = true;
});

onIonViewDidLeave(() => viewLoaded.value = false)
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
