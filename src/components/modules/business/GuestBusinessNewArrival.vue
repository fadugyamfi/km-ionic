<template>
  <section class="shopper-home-section ion-padding-top">
    <header
      class="d-flex ion-justify-content-between ion-align-items-center ion-padding"
    >
      <h6 class="ion-no-margin">{{ $t("shopper.home.newArrivals") }}</h6>

      <!-- <IonText color="primary" :router-link="`/guest/home/businesses/${$route.params.id}/products`">
                {{ $t("shopper.home.showAll") }}
            </IonText> -->
    </header>

    <p v-if="fetching" class="ion-text-center">
      <IonSpinner name="crescent"></IonSpinner>
    </p>

    <Swiper v-if="!fetching" :slides-per-view="2">
      <SwiperSlide v-for="product of products" :key="product.id">
        <GuestProductCard
          :product="product"
          :show-description="false"
        ></GuestProductCard>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Product from "@/models/Product";
import { useProductStore } from "@/stores/ProductStore";
import { mapStores } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { IonSpinner, IonText } from "@ionic/vue";
import GuestProductCard from "@/components/cards/GuestProductCard.vue";
import Business from "@/models/Business";

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
    },
  },

  data() {
    return {
      fetching: false,
      products: [] as Product[],
    };
  },

  components: { Swiper, SwiperSlide, IonText, GuestProductCard, IonSpinner },

  computed: {
    ...mapStores(useProductStore),
  },

  methods: {
    viewProduct(product: Product) {
      this.$router.push(`/shopper/home/products/${product.id}`);
    },

    async fetchNewArrivals() {
      this.fetching = true;
      this.products = await this.productStore.fetchGuestProducts({
        businesses_id: this.business?.id,
        limit: 6,
        sort: "latest",
      });
      this.fetching = false;
    },
  },

  watch: {
    business: function (newBusiness, oldBusiness) {
      if (newBusiness) {
        this.fetchNewArrivals();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
header {
  padding: 16px 16px 10px;
  h6 {
    font-weight: 500;
    font-size: 0.9em;
    margin: 0px;
  }
  ion-text {
    font-weight: 500;
    font-size: 0.9em;
    margin: 0px;
  }
}
</style>
