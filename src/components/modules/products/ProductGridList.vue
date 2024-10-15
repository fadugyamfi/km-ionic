<template>
  <!-- <Swiper
    :slides-per-view="2"
    v-for="(group, index) in groupedArray"
    :key="index"
    style="margin-bottom: 16px"
  >
    <template v-for="item in group" :key="item?.id">
      <SwiperSlide>
        <GuestProductCard
          v-if="userStore.isInGuestMode()"
          :product="item"
          :showDescription="false"
          :show-retail-price="showRetailPrices"
        >
        </GuestProductCard>
        <ProductCard
          v-else
          :product="item"
          :showDescription="false"
          :show-retail-price="showRetailPrices"
        ></ProductCard>
      </SwiperSlide>
    </template>
  </Swiper> -->
  <RecycleScroller
    class="scroller"
    :items="products"
    :grid-items="2"
    :item-size="410"
    :item-secondary-size="cardWidth"
    :item-class="'product-card-item'"
    key-field="id"
    v-slot="{ item }"
  >
    <GuestProductCard
      v-if="userStore.isInGuestMode()"
      :product="item"
      :showDescription="false"
      :show-retail-price="showRetailPrices"
    >
    </GuestProductCard>

    <ProductCard
      v-else
      :product="item"
      :showDescription="false"
      :show-retail-price="showRetailPrices"
    ></ProductCard>
  </RecycleScroller>
</template>

<style scoped>
.product-card-item {
  margin-bottom: 10px;
  padding-bottom: 15px;
}

.scroller {
  height: 100%;
}
</style>

<script setup lang="ts">
import { PropType } from "vue";
import Product from "@/models/Product";
import { useUserStore } from "@/stores/UserStore";
import GuestProductCard from "@/components/cards/GuestProductCard.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed } from "vue";

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: [],
  },

  showRetailPrices: {
    type: Boolean,
    default: false,
  },
});

const userStore = useUserStore();

const cardWidth = computed(() => {
  return window.document.documentElement.clientWidth / 2;
});

const groupedArray = computed(() =>
  props.products.reduce((result: any, value, index) => {
    if (index % 10 === 0) {
      result.push([value]);
    } else {
      result[result.length - 1].push(value);
    }
    return result;
  }, [])
);
</script>
