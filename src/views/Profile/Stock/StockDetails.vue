<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/profile/company/stocks"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("profile.stock.productDetail") }}
          </IonTitle>
          <IonButtons slot="end">
            <ShareButton :title="product?.product_name || ''"></ShareButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true" class="ion-padding">
      <section
        v-if="fetching"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <section v-else>
        <ProductImages :product="product" />
        <StockInfo :product="product" />
        <section class="ion-padding-vertical">
          <KolaYellowButton @click="showFilterSheet = true">
            {{ $t("profile.stock.updateStock") }}
          </KolaYellowButton>
        </section>
      </section>
      <StockUpdateSheet
        :product="product"
        :productVariations="productVariations"
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onSaveUpdate($event)"
      >
      </StockUpdateSheet>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonSpinner,
} from "@ionic/vue";

import { defineComponent } from "vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import Image from "@/components/Image.vue";
import StockUpdateSheet from "@/components/modules/stock/StockUpdateSheets.vue";
import StockInfo from "@/components/modules/stock/StockInfo.vue";
import { useStockStore } from "@/stores/StockStore";
import Stock from "@/models/Stock";
import { useToastStore } from "@/stores/ToastStore";
import ShareButton from "@/components/buttons/ShareButton.vue";
import ProductImages from "@/components/modules/products/ProductImages.vue"

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonPage,
    IonContent,
    UpdateButon,
    IonSpinner,
    KolaYellowButton,
    Image,
    StockUpdateSheet,
    StockInfo,
    ShareButton,
    ProductImages
  },

  name: "OrderDetails",

  data() {
    return {
      showFilterSheet: false,
      fetching: false,
      product: null as Stock | null,
      productVariations: [] as any,
    };
  },

  async mounted() {
    await this.getProduct();
    this.fetchProductVariations();
  },

  computed: {
    ...mapStores(useUserStore, useToastStore),
  },

  methods: {
    onSaveUpdate(form: Object) {
      this.updateStock(form);
    },
    async getProduct() {
      this.fetching = true;
      const stockStore = useStockStore();
      const product_id = this.$route.params.id;
      this.product = await stockStore.fetchProduct(Number(product_id));
      this.fetching = false;
    },
    async fetchProductVariations() {
      const stockStore = useStockStore();
      this.fetching = true;
      this.productVariations = await stockStore.fetchProductVariations();
      this.fetching = false;
    },
    async updateStock(form: any) {
      try {
        this.toastStore.blockUI("Hold On As We Restock Your Product");
        const stockStore = useStockStore();
        const product_id = this.$route.params.id;
        const newForm = {
          product_categories_id: this.product?.product_categories_id,
          product_name: this.product?.product_name,
          product_groups_id: this.product?.product_groups_id,
          product_price: form.product_price || this.product?.product_price,
          product_units_id: this.product?.product_units_id,
          brands_id: this.product?.brands_id,
          product_sku: this.product?.product_sku,
          currencies_id: 1,
          businesses_id: this.userStore.activeBusiness?.id,
          group_quantity: this.product?.group_quantity,
          stock_quantity: form.stock_quantity || this.product?.stock_quantity,
          product_variation: form.product_variation,
          product_color: form.product_color,
        };
        this.fetching = true;
        const product = await stockStore.updateStock(
          Number(product_id),
          newForm
        );
        if (product) {
          this.toastStore.unblockUI();
          await this.toastStore.showSuccess("Product has been restocked");
          this.product?.update(product);
        } else {
          this.toastStore.unblockUI();
          this.toastStore.showError(
            "Failed to restock Product. Please try again",
            "",
            "bottom",
            "footer"
          );
        }
        this.fetching = false;
      } catch (error) {
      } finally {
        this.toastStore.unblockUI();
      }
    },
  },
});
</script>
