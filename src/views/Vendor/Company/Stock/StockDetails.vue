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
            <!-- {{ $t("shopper.orders.orderDetails") }} - #{{ order?.id }} -->
            Product Detail
          </IonTitle>
          <IonButtons slot="end">
            <IonButton slot="icon-only">
              <IonIcon :icon="shareOutline"></IonIcon>
            </IonButton>
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
      <section v-if="!fetching">
        <Image :src="product?.image"></Image>
        <StockInfo :product="product" />
        <section class="ion-padding-vertical">
          <KolaYellowButton @click="showFilterSheet = true">
            {{ "Update Stock" }}
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
import { Order } from "@/models/Order";
import {
  IonIcon,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/vue";

import { defineComponent } from "vue";
// import OrdersCard from "@/components/modules/order/OrdersCard.vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";

import { mapStores } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline, shareOutline } from "ionicons/icons";
import OrderImages from "@/components/modules/order/OrderImages.vue";
// import OrderDetailItems from "@/components/modules/order/OrderDetailItems.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import Image from "@/components/Image.vue";
import StockUpdateSheet from "@/components/modules/stock/StockUpdateSheets.vue";
import StockInfo from "@/components/modules/stock/StockInfo.vue";
import { useStockStore } from "@/stores/StockStore";
import Stock from "@/models/Stock";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonContent,
    IonText,
    UpdateButon,
    IonButton,
    OrderImages,
    IonSpinner,
    KolaYellowButton,
    OrderStatusHistoryView,
    Image,
    StockUpdateSheet,
    StockInfo,
  },

  name: "OrderDetails",

  data() {
    return {
      chatbubbleOutline,
      shareOutline,
      order: null as Order | null,
      showFilterSheet: false,
      fetching: false,
      product: null as Stock | null,
      productVariations: [] as any,
    };
  },

  mounted() {
    this.getProduct();
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
      const stockStore = useStockStore();
      const product_id = this.$route.params.id;
      this.fetching = true;
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
          product_price: this.product?.product_price,
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

<style lang="scss" scoped>
ion-icon {
  font-size: 20px;
  &.warning {
    --background: #fdf0ed;
    --border-color: #ef3e3233;
    padding: 2px;
    border-radius: 50%;
    background-color: #fa2b3928;
    color: #d92d20;
    margin-right: 10px;
  }
}
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

h6 {
  font-size: 16px;
}

.stock-availabilty {
  text-align: center;
  border-radius: 8px;
  border: 0.5px solid rgba(239, 62, 50, 0.2);
  background: #fdf0ed;
  box-shadow: 0px 2px 16px 0px rgba(101, 93, 93, 0.1);
  padding: 8px 40px;
  color: var(--text-primary, #000);
  font-size: 12px;
}
.categories {
  gap: 22px;
  display: flex;
  align-items: center;
}
.chip {
  border-radius: 16px;
  background: var(--gray-100, #f2f4f7);
  color: #003366;
}
ion-text {
  font-size: 12px;
}
</style>
