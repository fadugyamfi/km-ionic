<template>
  <section class="ion-padding-top">
    <header
      class="d-flex ion-justify-content-between ion-align-items-center ion-padding"
    >
      <h6 class="ion-no-margin">Products</h6>

      <IonText
        color="primary"
        :router-link="`/guest/home/businesses/${$route.params.id}/products`"
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
          <GuestProductCard
            :product="product"
            :show-description="false"
          ></GuestProductCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Product from "@/models/Product";
import { useProductStore } from "@/stores/ProductStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { mapStores } from "pinia";
import { IonSpinner, IonText, IonGrid, IonCol, IonRow } from "@ionic/vue";
import GuestProductCard from "@/components/cards/GuestProductCard.vue";
import Business from "@/models/Business";

export default defineComponent({
  data() {
    return {
      fetching: false,
      products: [] as Product[],
    };
  },

  components: {
    IonText,
    GuestProductCard,
    IonSpinner,
    IonGrid,
    IonCol,
    IonRow,
  },

  computed: {
    ...mapStores(useProductStore, useBusinessStore),
  },

  methods: {
    async fetchGuestBusinessProducts() {
      this.fetching = true;
      this.products = await this.businessStore.getBusinessProducts(
        { id: this.$route.params.id } as Business,
        500,
        "/v2/guest/products"
      );
      this.fetching = false;
    },
  },

  mounted() {
    this.fetchGuestBusinessProducts();
  },
});
</script>
<style lang="scss" scoped>
header {
  padding: 16px 16px 10px;
  h6 {
    font-weight: 500;
    font-size: 0.9em;
    margin: 0px;
  }
  ion-text {
    font-weight: 500;
    font-size: 0.9em;
    margin: 0px;
  }
}
ion-grid {
  padding: 0px;

  ion-col {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
