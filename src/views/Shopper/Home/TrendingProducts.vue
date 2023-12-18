<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>{{ $t('shopper.home.trending') }}</h6>

      <IonButton fill="clear" color="primary" @click="refreshProducts()">
        {{ $t('general.refresh') }}
      </IonButton>
    </header>

    <section v-if="fetching">
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonSkeletonText class="skeleton-card" :animated="true"></IonSkeletonText>
                </IonCol>
                <IonCol>
                    <IonSkeletonText class="skeleton-card" :animated="true"></IonSkeletonText>
                </IonCol>
            </IonRow>
        </IonGrid>
    </section>

    <IonGrid v-if="!fetching">
        <IonRow>
            <IonCol size="6" v-for="product in products" :key="product?.id">
                <ProductCard :product="product" :showDescription="false"></ProductCard>
            </IonCol>
        </IonRow>
    </IonGrid>
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

  components: { ProductCategoryList, IonText, IonGrid, IonRow, IonCol, ProductCard, IonSkeletonText, IonButton },

  methods: {
    async fetchTrendingProducts() {
      this.fetching = true;
      const storage = new AppStorage();

      const trendingProducts = await storage.get(KOLA_TRENDING);

      if (trendingProducts) {
        this.products = trendingProducts.map((el: object) => new Product(el));
      } else {
        this.products = await this.productStore.fetchProducts({ sort: 'top_selling', limit: 100 });
        await storage.set(KOLA_TRENDING, this.products, 3, 'days')
      }

      this.fetching = false;
    },

    async refreshProducts() {
      this.fetching = true;

      const storage = new AppStorage();
      this.products = await this.productStore.fetchProducts({ sort: 'top_selling', limit: 100 });
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
