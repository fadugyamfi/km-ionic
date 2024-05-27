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
        @click="onStockSelected(stock)"
        :data-index="index"
        :showDeleteButton="showDeleteButton"
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
        @click="onStockSelected(stock)"
        :data-index="index"
        :showDeleteButton="showDeleteButton"
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
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {};
  },

  components: { ProductStockCard },

  methods: {
    onStockSelected(stock: Stock) {
      if (!this.clickable) return;
      this.$router.push(`/profile/company/stocks/${stock.id}/stock-details`);
    },
  },
  computed: {
    leftColumnItems() {
      return this.stocks.filter((category, index) => {
        return index % 2 == 0;
      });
    },
    rightColumnItems() {
      return this.stocks.filter((category, index) => {
        return index % 2 != 0;
      });
    },
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
