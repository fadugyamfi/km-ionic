<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/shopper/home"
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
            <ProductCard
              :product="product"
              :show-description="false"
            ></ProductCard>
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
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
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
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import NoResults from "../../components/layout/NoResults.vue";
import { handleAxiosRequestError } from "../../utilities";
import AppStorage from "../../stores/AppStorage";

const storage = new AppStorage();

const SEARCHED_PRODUCTS = "kola.searched-products";

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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    Image,
    Swiper,
    SwiperSlide,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSkeletonText,
    ProductCard,
    IonGrid,
    IonRow,
    IonCol,
    NoResults,
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
      refreshing: false,
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

        if (!this.products && (await storage.has(SEARCHED_PRODUCTS))) {
          this.products = await storage.get(SEARCHED_PRODUCTS);
          return;
        }

        storage.set(SEARCHED_PRODUCTS, this.products, 1, "day");
      }
    },
    async ionInfinite(ev: InfiniteScrollCustomEvent) {
      await this.fetchSearchedProducts();
      ev.target.complete();
    },

    onSearch(event: any) {
      if (!event.target.value) return;
      this.productStore.setSearchTerm(event.target.value);
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

  async mounted() {
    // this.refreshing = true;
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
