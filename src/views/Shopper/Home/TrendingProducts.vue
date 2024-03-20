<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>{{ $t('shopper.home.trending') }}</h6>

      <IonButton fill="clear" color="primary" @click="refreshProducts()">
        {{ $t('general.refresh') }}
      </IonButton>
    </header>

    <section v-if="fetching">
        <ProductsLoadingSkeletons></ProductsLoadingSkeletons>
    </section>

    <ProductGridList v-else :products="products"></ProductGridList>

    <!-- <IonGrid v-else>
        <IonRow>
            <IonCol size="6" v-for="product in products" :key="product?.id">
                <ProductCard :product="product" :showDescription="false"></ProductCard>
            </IonCol>
        </IonRow>
    </IonGrid> -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCategoryList from "@/components/lists/ProductCategoryList.vue";
import { IonButton, IonCol, IonGrid, IonRow, IonSkeletonText, IonText } from "@ionic/vue";
import { mapStores } from "pinia";
import ProductCard from "../../../components/cards/ProductCard.vue";
import Product from "../../../models/Product";
import { useProductStore } from "../../../stores/ProductStore";
import AppStorage from "../../../stores/AppStorage";
import ProductsLoadingSkeletons from "../../../components/layout/ProductsLoadingSkeletons.vue";
import ProductGridList from "../../../components/modules/products/ProductGridList.vue";

const storage = new AppStorage();
const KOLA_TRENDING = "kola.trending";

export default defineComponent({
  data() {
    return {
      products: [] as Array<Product>,
      fetching: false
    };
  },

  computed: {
    ...mapStores(useProductStore ),
  },

  components: { ProductCategoryList, IonText, IonGrid, IonRow, IonCol, ProductCard, IonSkeletonText, IonButton, ProductsLoadingSkeletons, ProductGridList },

  methods: {
    async fetchTrendingProducts() {
      this.fetching = true;

      const trendingProducts = await storage.get(KOLA_TRENDING);

      if (trendingProducts) {
        this.products = trendingProducts.map((el: object) => new Product(el));
      } else {
        this.products = await this.productStore.fetchApprovedVendorProducts({ sort: 'top_selling', limit: 100 });
        await storage.set(KOLA_TRENDING, this.products, 3, 'days')
      }

      this.fetching = false;
    },

    async refreshProducts() {
      this.fetching = true;

      const storage = new AppStorage();
      this.products = await this.productStore.fetchApprovedVendorProducts({ sort: 'top_selling', limit: 100 });
      await storage.set(KOLA_TRENDING, this.products, 3, 'days')

      this.fetching = false;
    }
  },

  mounted() {
    this.fetchTrendingProducts();
  },
});
</script>

<style scoped>
ion-button {
  margin: 0px;
  text-transform: none;
}
</style>
