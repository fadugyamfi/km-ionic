<template>
  <section class="shopper-home-section ion-padding-top">
    <header
      class="d-flex ion-justify-content-between ion-align-items-center ion-padding-bottom"
    >
      <h6>Products</h6>

      <IonText
        color="primary"
        :router-link="`/${mode}/home/businesses/${$route.params.id}/products`"
      >
        {{ $t("shopper.home.showAll") }}
      </IonText>
    </header>

    <p v-if="fetching" class="ion-text-center">
      <IonSpinner name="crescent"></IonSpinner>
    </p>

    <IonGrid v-if="!fetching">
      <IonRow>
        <IonCol size="6" v-for="product in products" :key="product.id">
          <ProductCard
            :product="product"
            :show-description="false"
            :show-add-to-cart="mode == 'shopper'"
            :show-add-to-favorites="mode == 'shopper'"
          ></ProductCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Product from "@/models/Product";
import { useProductStore } from "@/stores/ProductStore";
import { mapStores } from "pinia";
import { IonSpinner, IonText, IonGrid, IonCol, IonRow } from "@ionic/vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import Business from "@/models/Business";

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
    },
    mode: {
      type: String,
      default: "shopper",
    },
  },

  data() {
    return {
      fetching: false,
      products: [] as Product[],
    };
  },

  components: {
    IonText,
    ProductCard,
    IonSpinner,
    IonGrid,
    IonCol,
    IonRow,
  },

  computed: {
    ...mapStores(useProductStore),
  },

  methods: {
    viewProduct(product: Product) {
      this.$router.push(`/shopper/home/products/${product.id}`);
    },

    async fetchNewProducts() {
      this.fetching = true;
      this.products = await this.productStore.fetchProducts({
        businesses_id: this.business?.id,
        limit: 10,
      });
      this.fetching = false;
    },
  },

  mounted(){
    this.fetchNewProducts();
  }
});
</script>
