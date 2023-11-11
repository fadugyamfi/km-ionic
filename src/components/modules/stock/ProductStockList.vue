<template>
  <section class="product-category-list d-flex">
    <section
      v-if="leftColumnItems.length > 0"
      class="d-flex flex-column ion-align-items-stretch"
    >
      <ProductStockCard
        v-for="(stock, index) in leftColumnItems"
        :key="stock.id"
        :stock="stock"
        :tall="index % 2 == 0"
        @click="onCategorySelected(stock)"
        :data-index="index"
      ></ProductStockCard>
    </section>

    <section
      v-if="rightColumnItems.length > 0"
      class="d-flex flex-column ion-align-items-stretch"
    >
      <ProductStockCard
        v-for="(stock, index) in rightColumnItems"
        :key="stock.id"
        :stock="stock"
        :tall="index % 2 != 0"
        @click="onCategorySelected(stock)"
        :data-index="index"
      ></ProductStockCard>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCategory from "@/models/ProductCategory";
import ProductStockCard from "../stock/ProductStockCard.vue";
import Stock from "@/models/Stock";
import { logIn } from "ionicons/icons";

export default defineComponent({
  props: {
    stocks: {
      default: () => [],
      type: Array as PropType<Stock[]>,
    },
  },

  data() {
    return {
      leftColumnItems: [] as Array<Stock>,
      rightColumnItems: [] as Array<Stock>,
    };
  },

  components: { ProductStockCard },

  methods: {
    fillColumns() {
      this.leftColumnItems = this.stocks.filter((category, index) => {
        return index % 2 == 0;
      });

      this.rightColumnItems = this.stocks.filter((category, index) => {
        return index % 2 != 0;
      });
    },

    onCategorySelected(category: ProductCategory) {
        console.log('helolo')
      this.$router.push(`/shopper/home/categories/${category.id}`);
    },
  },

  mounted() {
    console.log(this.stocks);
    setTimeout(() => {
      this.fillColumns();
    }, 200);
  },
});
</script>

<style lang="scss" scoped>
.product-category-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 0px;
  padding-right: 0px;

  .flex-column {
    width: 48%;
  }
}
</style>
