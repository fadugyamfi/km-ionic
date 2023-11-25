<template>
  <section class="shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal ion-padding-bottom">
      <h6>{{ promotion.name }}</h6>

      <!-- <IonText color="primary" router-link="/shopper/home/christmas-exclusives">
        View all
      </IonText> -->
    </header>

    <Swiper :slides-per-view="2">
      <SwiperSlide
        v-for="product in promotion.promotion_items"
        :key="product.promotion_id"
      >
        <ProductCard
          :product="product?.product"
          :show-description="false"
        ></ProductCard>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Promotion from "@/models/Promotion";
import Product from "@/models/Product";
import { mapStores } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { IonText } from "@ionic/vue";
import ProductCard from "@/components/cards/ProductCard.vue";

export default defineComponent({
  props: {
    promotion: {
      type: Object,
      default: true,
    },
  },
  components: { Swiper, SwiperSlide, IonText, ProductCard },

  methods: {
    viewProduct(product: Product) {
      this.$router.push(`/shopper/home/products/${product.id}`);
    },
  },
});
</script>
