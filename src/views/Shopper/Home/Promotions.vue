<template>
  <section>
    <section v-if="fetching">
      <ProductsLoadingSkeletons></ProductsLoadingSkeletons>
    </section>

    <section v-else>
      <section
        class="shopper-home-section ion-padding-top"
        v-for="promotion in promotions"
        :key="promotion.id"
        :promotion="promotion"
      >
        <header class="ion-padding-bottom">
          <h6 class="ion-padding-start">{{ promotion.name }}</h6>

          <IonButton
            fill="clear"
            color="primary"
            :router-link="`/shopper/home/promotions/s/${promotion.slug}`"
          >
            {{ $t("shopper.home.viewAll") }}
          </IonButton>
        </header>

        <Swiper :slides-per-view="2">
          <template
            v-for="promotionItem in promotion.promotion_items"
            :key="promotionItem?.id"
          >
            <SwiperSlide v-if="promotionItem?.product">
              <ProductCard
                :product="promotionItem?.product"
                :show-description="false"
              ></ProductCard>
            </SwiperSlide>
          </template>
        </Swiper>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Promotion from "@/models/Promotion";
import { Swiper, SwiperSlide } from "swiper/vue";
import { IonText, IonButton, IonSpinner, IonSkeletonText } from "@ionic/vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import { usePromotionStore } from "@/stores/PromotionStore";
import ProductsLoadingSkeletons from "@/components/layout/ProductsLoadingSkeletons.vue";

export default defineComponent({
  data() {
    return {
      fetching: false,
      promotions: [] as Promotion[],
    };
  },

  components: {
    Swiper,
    SwiperSlide,
    IonText,
    ProductCard,
    IonButton,
    IonSpinner,
    IonSkeletonText,
    ProductsLoadingSkeletons,
  },

  methods: {
    async fetchPromotions() {
      const promotionStore = usePromotionStore();

      try {
        this.fetching = true;
        this.promotions = await promotionStore.getPromotions();
      } catch (error) {
        console.log(error);
      } finally {
        this.fetching = false;
      }
    },
  },

  mounted() {
    this.fetchPromotions();
  },
});
</script>

<style scoped lang="css">
ion-button {
  margin: 0px;
  text-transform: none;
}

.product-skeleton {
  width: 48%;
  height: 175px;
  border-radius: 5px;
}
</style>
