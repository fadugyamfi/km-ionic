<template>
  <IonPage>
    <section class="ion-padding" style="padding-bottom: 0.35em">
      <IonHeader classs="ion-no-border" style="box-shadow: none">
        <IonHeader class="inner-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/agent/sales/add-sale/select-payment-mode"
                :icon="arrowBack"
                mode="md"
              >
              </IonBackButton>
            </IonButtons>
            <IonTitle size="small"
              ><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle
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
              @ion-change="onSearch($event)"
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
                  total: saleStore.newSale.sale_items?.length,
                })
              }}
            </IonLabel>
          </IonListHeader>
        </IonList>
      </IonHeader>
    </section>

    <IonContent>
      <SelectedCustomer
        v-if="saleStore.selectedCustomer"
        :customer="saleStore.selectedCustomer"
      ></SelectedCustomer>

      <div class="ion-text-center" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-else>
        <NoResults
          v-if="products?.length == 0"
          title="No Products Available"
          description="Add new request to populate this list"
        ></NoResults>

        <RecycleScroller
          v-else
          class="scroller"
          :items="products"
          :grid-items="2"
          :item-size="305"
          :minItemSize="210"
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
            :showAddToSelected="item.quantity > 0"
            :action="'toggleSelect'"
            :initially-selected="isSelected(item)"
            :showStockStatus="true"
            @toggleSelect="selectProduct($event)"
          ></ProductCard>
        </RecycleScroller>
      </section>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="select-products-continue"
        :disabled="saleStore.newSale.sale_items?.length == 0"
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
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { arrowBack, search } from "ionicons/icons";
import { defineComponent } from "vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { useToastStore } from "@/stores/ToastStore";
import Product from "@/models/Product";
import { SaleItem } from "@/models/SaleItem";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import SelectedCustomer from "@/components/modules/sales/SelectedCustomer.vue";
import ProductCard, {
  ProductSelection,
} from "@/components/cards/ProductCard.vue";
import { handleAxiosRequestError } from "@/utilities";
import { useProductStore } from "@/stores/ProductStore";
import { useUserStore } from "@/stores/UserStore";
import NoResults from "@/components/layout/NoResults.vue";
import { RecycleScroller } from "vue-virtual-scroller";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      searchEnabled: false,
      fetching: false,
      products: [] as Product[],
    };
  },

  ionViewDidEnter() {
    this.fetchAgentProducts();
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
    SelectedCustomer,
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
  },

  computed: {
    ...mapStores(useSaleStore, useProductStore, useUserStore),

    cardWidth() {
      return window.document.documentElement.clientWidth / 2;
    },
  },

  methods: {
    async loadCachedInventory() {
      try {
        this.fetching = true;
        this.products = await this.saleStore.fetchAgentInventory();

        if (!this.products || this.products.length == 0) {
          this.fetchAgentProducts();
        }
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    async fetchAgentProducts(options = {}) {
      this.fetching = true;
      try {
        const params = {
          limit: 500,
          businesses_id: this.userStore.activeBusiness?.id,
          ...options,
        };

        this.products = await this.productStore.fetchAgentProducts(params);
        // this.saleStore.inventory = this.products;
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    isSelected(product: Product): boolean {
      return this.saleStore.isProductSelected(product);
    },

    selectProduct(selection: ProductSelection) {
      if (!selection.product.quantity) {
        return;
      }
      if (selection.selected) {
        this.saleStore.addProductToSale(selection.product);
      } else {
        this.saleStore.removeProductFromSale(selection.product);
      }
    },

    onContinue() {
      if (this.saleStore.newSale.sale_items?.length == 0) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectProductsToContinue"),
          "",
          "bottom",
          "select-products-continue"
        );
        return;
      }
      this.saleStore.persist();
      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push("/agent/sales/add-sale/configure-items");
      } else {
        this.$router.push("/vendor/sales/add-sale/configure-items");
      }
    },

    toggleSearchEnabled() {
      this.searchEnabled = !this.searchEnabled;
    },

    onSearch(event: Event) {
      this.fetchAgentProducts({
        product_name_has: (event.target as HTMLIonSearchbarElement).value,
      });
    },
  },
});
</script>
