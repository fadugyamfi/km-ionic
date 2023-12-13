<template>
  <section
    class="shopper-home-section ion-padding-top"
    v-for="promotion in promotions"
    :key="promotion.id"
  >
    <header class="ion-padding-horizontal ion-padding-bottom">
      <h6>{{ promotion.name }}</h6>

      <!-- <IonText color="primary" router-link="/shopper/home/christmas-exclusives">
        View all
      </IonText> -->
    </header>

    <Swiper :slides-per-view="2">
      <template
        v-for="promotionItem in promotion.promotion_items"
        :key="promotionItem.id"
      >
        <SwiperSlide v-if="promotionItem.product">
          <GuestProductCard
            :product="promotionItem?.product"
            :show-description="false"
          ></GuestProductCard>
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
import { IonText } from "@ionic/vue";
import GuestProductCard from "@/components/cards/GuestProductCard.vue";
import { usePromotionStore } from "@/stores/Promotion";

export default defineComponent({
  components: { Swiper, SwiperSlide, IonText, GuestProductCard },
  data() {
    return {
      promotions: [] as any[],
    };
  },
  computed: {
    ...mapStores(usePromotionStore),
  },

  methods: {
    viewProduct(product: Product) {
      this.$router.push(`/shopper/home/products/${product.id}`);
    },
    async fetchPromotions() {
      this.promotions = await this.promotionStore.getPromotions();
    },
  },

  mounted() {
    this.fetchPromotions();
  },
});
</script>
