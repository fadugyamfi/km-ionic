<template>
    <section class="ion-no-border">
      <Swiper :slides-per-view="3.5">
        <SwiperSlide v-for="category in categories" :key="category.id">
          <StockChip
            :category="category"
            @click="viewCategory(category)"
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
  
  const categories = ref<ProductCategory[]>();
  
  const fetchCategories = async () => {
    const productCategoryStore = useProductCategoryStore();
    const response = await productCategoryStore.getCategories();
    categories.value = response.map((cat) => {
      return {
        ...cat,
        name: cat.name?.split(" ")[0],
      };
    });
  };
  const viewCategory = (category: any) => {};
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  