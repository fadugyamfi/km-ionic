<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/guest/home"
            :icon="close"
          ></IonBackButton>
        </IonButtons>

        <IonTitle size="small">Search Results</IonTitle>
      </IonToolbar>

      <IonToolbar>
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          v-model="productStore.searchTerm"
          @keyup.enter="onSearch($event)"
          @ion-change="onSearch($event)"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <section v-if="fetching">
        <IonSkeletonText :animated="true"></IonSkeletonText>
        <IonSkeletonText :animated="true"></IonSkeletonText>
      </section>

      <NoResults
        v-if="products?.length == 0 && !fetching"
        :title="$t('shopper.businesses.noResultsAvailable')"
        :description="$t('shopper.businesses.pleaseTryYourSearchAgain')"
      ></NoResults>

      <IonGrid>
        <IonRow>
          <IonCol size="6" v-for="product in products" :key="product.id">
            <GuestProductCard
              :product="product"
              :show-description="false"
            ></GuestProductCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
} from "ionicons/icons";
import Product from "@/models/Product";
import { mapStores } from "pinia";
import { useProductStore } from "@/stores/ProductStore";
import NoResults from "@/components/layout/NoResults.vue";
import { handleAxiosRequestError } from "@/utilities";
import GuestProductCard from "@/components/cards/GuestProductCard.vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonFooter,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSkeletonText,
    IonGrid,
    IonRow,
    IonCol,
    NoResults,
    GuestProductCard,
  },

  data() {
    return {
      close,
      heartOutline,
      cartOutline,
      shareOutline,
      cart,
      heart,
      fetching: false,
      products: null as Product[] | null,
      defaultBanner: "/images/vendor/banner.png",
    };
  },

  computed: {
    ...mapStores(useProductStore),
  },

  methods: {
    async fetchSearchedProducts() {
      this.fetching = true;
      try {
        this.products = await this.productStore.fetchSearchedProducts();
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },
    async ionInfinite(ev: InfiniteScrollCustomEvent) {
      await this.fetchSearchedProducts();
      ev.target.complete();
    },

    onSearch(event: any) {
      if (!event.target.value) return;
      this.productStore.searchTerm = event.target?.value;
      this.productStore.products = [];
      this.products = [];
      this.fetchSearchedProducts();
    },

    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },

    viewProduct(product: Product) {
      this.$router.push(`/shopper/products/${product.id}`);
    },
  },

  mounted() {
    this.fetchSearchedProducts();
  },
});
</script>

<style scoped lang="scss">
main {
  border-radius: 10px;
  background-color: white;
  margin-top: 15px;
  border: solid #f9f9f9 1px;
  padding: 10px;

  .title-section {
    font-size: 0.8em;
    font-weight: 500;

    .price {
      text-align: right;
      min-width: 80px;
    }
  }
}

ion-grid {
  --ion-grid-padding: 2px;

  ion-col {
    padding-left: 1px;
    padding-right: 1px;
  }
}
</style>
