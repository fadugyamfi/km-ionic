<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="d-flex ion-justify-content-end">
      <IonText
        color="primary"
        @click="addNewRequest"
        router-link="/agent/request/place-request/select-products"
        class=""
      >
        {{ $t("profile.stock.addNewRequest") }}
      </IonText>
    </header>

    <ProductStockList
      :showDeleteButton="false"
      :clickable="false"
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
import { useRequestStore } from "@/stores/RequestStore";
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
  computed: {
    ...mapStores(useRequestStore),
  },
  methods: {
    addNewRequest() {
      this.requestStore.resetForNewRequest();
      this.$router.push("/agent/request/place-request/select-products");
    },
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
