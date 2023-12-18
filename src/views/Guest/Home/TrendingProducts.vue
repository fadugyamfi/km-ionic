<template>
  <section class="top-categories shopper-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>{{ $t("shopper.home.trending") }}</h6>

      <!-- <IonText color="primary" router-link="/shopper/home/categories">
        View all
      </IonText> -->
    </header>

    <IonGrid v-if="!fetching">
      <IonRow>
        <IonCol size="6" v-for="product in products" :key="product?.id">
          <GuestProductCard
            :product="product"
            :showDescription="false"
          ></GuestProductCard>
        </IonCol>
      </IonRow>
    </IonGrid>
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

const KOLA_TRENDING = "kola.guest-trending";

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

  components: {IonText, IonGrid, IonRow, IonCol, GuestProductCard },

  methods: {
    async fetchTrendingProducts() {
      this.fetching = true;
      const storage = new AppStorage();

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
