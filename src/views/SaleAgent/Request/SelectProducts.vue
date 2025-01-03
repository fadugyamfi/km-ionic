<template>
  <IonPage>
    <section class="ion-padding" style="padding-bottom: 0.35em">
      <IonHeader classs="ion-no-border" style="box-shadow: none">
        <IonHeader class="inner-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/agent/request"
                :icon="arrowBack"
                mode="md"
              >
              </IonBackButton>
            </IonButtons>
            <IonTitle size="small"
              ><b> {{ $t("profile.agent.request") }} </b></IonTitle
            >
            <IonButtons slot="end">
              <IonButton color="dark" @click="toggleSearchEnabled()">
                <IonIcon :icon="search" color="dark"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar v-if="searchEnabled">
            <IonSearchbar
              :placeholder="$t('vendor.sales.searchProducts') + '...'"
              class="search-input"
              @keyup.enter="onSearch($event)"
              @ion-clear="onClear"
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonList
          lines="none"
          class="sales-select-list ion-padding-horizontal"
          style="margin-bottom: 0px"
        >
          <IonListHeader class="d-flex ion-justify-content-between">
            <IonLabel class="fw-bold">{{
              $t("vendor.sales.selectProducts")
            }}</IonLabel>
            <IonLabel class="fw-bold ion-text-end" color="medium">
              {{
                $t("vendor.sales.itemsSelected", {
                  total: requestStore.newRequest.items?.length,
                })
              }}
            </IonLabel>
          </IonListHeader>
        </IonList>
      </IonHeader>
    </section>

    <IonContent>
      <IonRefresher
        ref="refresher"
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent pullingIcon="crescent"></IonRefresherContent>
      </IonRefresher>
      <div class="ion-text-center" v-if="fetching && !refreshing">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-else>
        <NoResults
          v-if="products?.length == 0"
          title="No Products Available"
          description="Add products to your inventory to populate this list"
        ></NoResults>

        <RecycleScroller
          v-else
          class="scroller"
          :items="products"
          :grid-items="2"
          :item-size="280"
          :item-secondary-size="cardWidth"
          :item-class="'product-card-item'"
          key-field="id"
          v-slot="{ item }"
        >
          <ProductCard
            :product="item"
            :showDescription="false"
            :showAddToCart="false"
            :showAddToFavorites="false"
            :showAddToSelected="true"
            :action="'toggleSelect'"
            :initially-selected="isSelected(item)"
            @toggleSelect="selectProduct($event)"
          ></ProductCard>
        </RecycleScroller>
      </section>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="select-products-continue"
        :disabled="requestStore.newRequest.items?.length == 0"
        @click="onContinue()"
      >
        {{ $t("general.continue") }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
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
  IonListHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/vue";
import { arrowBack, refresh, search } from "ionicons/icons";
import { defineComponent } from "vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { useToastStore } from "@/stores/ToastStore";
import Product from "@/models/Product";
import { SaleItem } from "@/models/SaleItem";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import ProductCard, {
  ProductSelection,
} from "@/components/cards/ProductCard.vue";
import { handleAxiosRequestError } from "@/utilities";
import { useProductStore } from "@/stores/ProductStore";
import { useUserStore } from "@/stores/UserStore";
import NoResults from "@/components/layout/NoResults.vue";
import { RecycleScroller } from "vue-virtual-scroller";
import { useRequestStore } from "@/stores/RequestStore";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      searchEnabled: false,
      fetching: false,
      refreshing: false,
      products: [] as Product[],
    };
  },

  ionViewDidEnter() {
    this.loadCachedInventory();
    // this.requestStore.loadFromStorage();
  },

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonFooter,
    KolaYellowButton,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    ProductCard,
    IonSearchbar,
    IonSpinner,
    NoResults,
    RecycleScroller,
    IonRefresher,
    IonRefresherContent,
  },

  computed: {
    ...mapStores(useSaleStore, useProductStore, useUserStore, useRequestStore),

    cardWidth() {
      return window.document.documentElement.clientWidth / 2;
    },
  },

  methods: {
    async loadCachedInventory() {
      try {
        this.fetching = true;
        this.products = await this.saleStore.fetchInventory();
        if (!this.products || this.products.length == 0) {
          this.fetchProducts();
        }
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    async fetchProducts(options = {}) {
      this.fetching = true;
      try {
        const params = {
          businesses_id: this.userStore.activeBusiness?.id,
          limit: 500,
          ...options,
        };

        this.products = await this.productStore.fetchProducts(params);
        this.saleStore.inventory = this.products;
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    async handleRefresh(event: RefresherCustomEvent) {
      this.refreshing = true;
      await this.fetchProducts({ refresh: true });
      event.target.complete();
      this.refreshing = false;
    },

    isSelected(product: Product): boolean {
      return this.requestStore.isProductSelected(product);
    },

    selectProduct(selection: ProductSelection) {
      if (selection.selected) {
        this.requestStore.addProductToRequest(selection.product);
      } else {
        this.requestStore.removeProductFromRequest(selection.product);
      }
    },

    onContinue() {
      if (this.requestStore.newRequest.items?.length == 0) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectProductsToContinue"),
          "",
          "bottom",
          "select-products-continue"
        );
        return;
      }
      this.requestStore.persist();
      this.$router.push("/agent/request/place-request/configure-items");
    },

    toggleSearchEnabled() {
      this.searchEnabled = !this.searchEnabled;
    },

    onSearch(event: Event) {
      this.fetchProducts({
        product_name_has: (event.target as HTMLIonSearchbarElement).value,
        refresh: true,
      });
    },
    onClear() {
      this.fetchProducts({
        product_name_has: "",
        refresh: true,
      });
    },
  },
});
</script>
