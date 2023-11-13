<template>
  <section class="">
    <Swiper :slides-per-view="3">
      <SwiperSlide
        class="swiper-slide-chip"
        v-for="category in categories"
        :key="category.id"
      >
        <StockChip
          :category="category"
          :selectedCategory="selectedCategory"
          @click="filterCategory(category)"
        ></StockChip>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IonChip, IonLabel } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";
import StockChip from "./StockChip.vue";
import ProductCategory from "@/models/ProductCategory";

const emit = defineEmits(["filter"]);

const categories = ref<ProductCategory[]>();
const selectedCategory = ref<any>();

const fetchCategories = async () => {
  const productCategoryStore = useProductCategoryStore();
  const response = await productCategoryStore.getCategories();
  response.unshift({ name: "All" });
  categories.value = response.map((cat) => {
    return {
      ...cat,
      name: cat.name?.split(" ")[0],
    };
  });
};
const filterCategory = (category: any) => {
  selectedCategory.value = category;
  emit("filter", category.id);
};

onMounted(() => {
  fetchCategories();
});
</script>
<style lang="scss" scoped>
.swiper-slide-chip {
  &:nth-child(1) {
    width: 50px !important;
  }
  &:last-child {
    width: 50px !important;
  }

}
</style>
