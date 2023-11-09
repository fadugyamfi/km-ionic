<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>Available Stock</h6>

      <IonText color="primary" router-link="/profile/company">
        View all
      </IonText>
    </header>

    <ProductStockList
      v-if="categories.length > 0"
      :categories="categories"
    ></ProductStockList>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductStockList from "@/components/modules/stock/ProductStockList.vue";
import ProductCategory from "@/models/ProductCategory";
import axios from "axios";
import { IonText } from "@ionic/vue";
import { mapStores } from "pinia";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";

export default defineComponent({
  data() {
    return {
      categories: [] as Array<ProductCategory>,
    };
  },

  computed: {
    ...mapStores(useProductCategoryStore),
  },

  components: { ProductStockList, IonText },

  methods: {
    async fetchTopCategories() {
      const categories = await this.productCategoryStore.getCategories();
      this.categories = categories.slice(0, 4);
    },
  },

  mounted() {
    this.fetchTopCategories();
  },
});
</script>
