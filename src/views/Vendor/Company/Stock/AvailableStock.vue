<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="">
      <h6 class="fw-bold">{{ $t("profile.stock.availableStock") }}</h6>

      <IonText color="primary" router-link="/profile/company/stocks/add-stock">
        {{ $t("profile.stock.addNewStock") }}
      </IonText>
    </header>

    <ProductStockList
      v-if="stocks.length > 0"
      :stocks="stocks"
    ></ProductStockList>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductStockList from "@/components/modules/stock/ProductStockList.vue";
import ProductCategory from "@/models/ProductCategory";
import axios from "axios";
import { IonText } from "@ionic/vue";
import { mapStores } from "pinia";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";
import Stock from "@/models/Stock";

export default defineComponent({
  props: {
    stocks: {
      type: Array as PropType<Stock[]>,
      default: () => [],
    },
  },
  components: {
    ProductStockList,
    IonText,
  },
});
</script>
<style lang="scss" scoped>
.shopper-home-section {
  margin-bottom: 10px;
  margin-top: 10px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;

    h6 {
      font-weight: 500;
      font-size: 1em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
}
</style>
