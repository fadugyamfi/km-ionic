<template>
  <section class="shopper-home-section ion-padding-top">
    <header class="ion-padding-bottom">
      <h6 class="ion-padding-start">{{ promotion.name }}</h6>

      <IonButton fill="clear" color="primary" :router-link="`/shopper/home/promotions/${promotion.id}`">
        {{ $t("shopper.home.viewAll") }}
      </IonButton>
    </header>

    <Swiper :slides-per-view="2">
      <template v-for="promotionItem in promotion.promotion_items" :key="promotionItem.id">
        <SwiperSlide v-if="promotionItem.product">
          <ProductCard :product="promotionItem?.product" :show-description="false"></ProductCard>
        </SwiperSlide>
      </template>

    </Swiper>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Promotion from "@/models/Promotion";
import Product from "@/models/Product";
import { mapStores } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { IonText, IonButton } from "@ionic/vue";
import ProductCard from "@/components/cards/ProductCard.vue";

export default defineComponent({
  props: {
    promotion: {
      type: Object,
      default: true,
    },
  },
  components: { Swiper, SwiperSlide, IonText, ProductCard, IonButton },
});
</script>

<style scoped lang="css">
ion-button {
  margin: 0px;
  text-transform: none;
}
</style>
