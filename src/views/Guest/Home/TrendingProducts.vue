<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>{{ $t("shopper.home.trending") }}</h6>

      <!-- <IonText color="primary" router-link="/shopper/home/categories">
        View all
      </IonText> -->
    </header>

    <section v-if="fetching">
      <ProductsLoadingSkeletons></ProductsLoadingSkeletons>
    </section>

    <ProductGridList v-else :products="products"></ProductGridList>

  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/vue";
import { mapStores } from "pinia";
import GuestProductCard from "../../../components/cards/GuestProductCard.vue";
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
    ...mapStores(useProductStore),
  },

  components: { IonText, IonGrid, IonRow, IonCol, GuestProductCard, ProductsLoadingSkeletons, ProductGridList },

  methods: {
    async fetchTrendingProducts() {
      this.fetching = true;

      const trendingProducts = await storage.get(KOLA_TRENDING);

      if (trendingProducts) {
        this.products = trendingProducts.map((el: object) => new Product(el));
      } else {
        this.products = await this.productStore.fetchGuestProducts({ sort: 'top_selling', limit: 100 });
        await storage.set(KOLA_TRENDING, this.products, 1, 'days')
      }

      this.fetching = false;
    },
  },

  mounted() {
    this.fetchTrendingProducts();
  },
});
</script>


<style scoped>
.skeleton-card {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}

ion-button {
  margin: 0px;
  text-transform: none;
}
</style>
