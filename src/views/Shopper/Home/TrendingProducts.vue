<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>{{ $t('shopper.home.trending') }}</h6>

      <!-- <IonText color="primary" router-link="/shopper/home/categories">
        View all
      </IonText> -->
    </header>

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
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/vue";
import { mapStores } from "pinia";
import ProductCard from "../../../components/cards/ProductCard.vue";
import Product from "../../../models/Product";
import { useProductStore } from "../../../stores/ProductStore";

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

  components: { ProductCategoryList, IonText, IonGrid, IonRow, IonCol, ProductCard },

  methods: {
    async fetchTrendingProducts() {
      this.products = await this.productStore.fetchProducts({ sort: 'top_selling', limit: 100 });
    }
  },

  mounted() {
    this.fetchTrendingProducts();
  },
});
</script>
