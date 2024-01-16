<template>
  <section class="ion-margin-top">
    <IonText class="d-flex ion-align-items-center stock-availabilty">
      <IonIcon class="warning" :icon="alertCircleOutline"></IonIcon
      >{{ $t("profile.stock.productOutOfStock") }}</IonText
    >
    <IonCard>
      <IonCardContent>
        <section
          class="details ion-margin-vertical d-flex ion-align-items-start ion-justify-content-between"
        >
          <section class="product-info ion-margin-end">
            <h6 class="d-flex ion-justify-content-between">
              <span>{{ product?.product_name }}</span>
              <span>{{
                Filters.currency(
                  product?.product_price || 0,
                  product?.currency?.symbol as string
                )
              }}</span>
            </h6>
            <IonText style="color: #787486">
              <span v-if="product?.weight_value"
                >{{ product?.weight_value }}kg</span
              >
              <span v-if="product?.weight_value && product?.group_quantity"
                >/</span
              >
              <span v-if="product?.group_quantity"
                >{{ product?.group_quantity }}pcs</span
              >
            </IonText>
            <p>
              <IonText> {{ product?.stock_quantity }} in stock </IonText>
            </p>
            <IonText
              v-if="product?.min_order_amount"
              color="medium"
              class="d-flex ion-align-items-center"
            >
              <IonIcon class="warning" :icon="alertCircleOutline"></IonIcon>GHS
              {{ product?.min_order_amount }} minimum</IonText
            >
          </section>
          <IonButton
            fill="clear"
            @click="removeFromStock(product as Stock)"
            color="medium"
            class="ion-no-margin ion-no-padding ion-align-self-start"
          >
            <IonIcon
              slot="icon-only"
              color="danger"
              :icon="trashOutline"
            ></IonIcon>
          </IonButton>
        </section>
        <StockTags :tags="product?.tags" />
      </IonCardContent>
    </IonCard>
    <DeleteStockModal
      :isOpen="showConfirmDeleteModal"
      :stock="selectedStock"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    />
  </section>
</template>

<script lang="ts">
import Stock from "@/models/Stock";
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonText,
  IonButton,
} from "@ionic/vue";
import { mapStores } from "pinia";
import { PropType, defineComponent } from "vue";
import {
  closeCircleOutline,
  alertCircleOutline,
  trashOutline,
} from "ionicons/icons";
import StockTags from "./StockDetailTags.vue";
import DeleteStockModal from "./DeleteStockModal.vue";
import { useStockStore } from "@/stores/StockStore";
import { useToastStore } from "@/stores/ToastStore";
import Filters from "../../../utilities/Filters";

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    Image,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonText,
    IonButton,
    StockTags,
    DeleteStockModal,
  },

  props: {
    product: {
      type: Object as PropType<Stock | null>,
    },
  },

  data() {
    return {
      alertCircleOutline,
      closeCircleOutline,
      trashOutline,
      selectedStock: null as Stock | null,
      showConfirmDeleteModal: false,
      Filters,
    };
  },
  computed: {
    ...mapStores(useStockStore, useToastStore),
  },
  methods: {
    removeFromStock(stock: Stock) {
      this.selectedStock = stock;
      this.showConfirmDeleteModal = true;
    },
    async onConfirmDelete() {
      try {
        this.showConfirmDeleteModal = false;
        await this.stockStore.deleteStock(this.selectedStock as Stock);
        await this.toastStore.showSuccess(
          "Stock has been removed successfully",
          "",
          "bottom"
        );
        this.$router.push("/profile/company/stocks/");
      } catch (error) {
        this.toastStore.showError(
          "Failed to remove Stock. Please try again",
          "",
          "bottom",
          "footer"
        );
      }
    },
  },
});
</script>

<style scoped lang="scss">
ion-card {
  // padding: 24px 12px;
  margin: 0px;
}
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

h6 {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.stock-availabilty {
  text-align: center;
  border-radius: 8px;
  border: 0.5px solid rgba(239, 62, 50, 0.2);
  background: #fdf0ed;
  box-shadow: 0px 2px 16px 0px rgba(101, 93, 93, 0.1);
  padding: 8px 40px;
  margin-bottom: 10px;
  font-size: 12px;
}
.details ion-text {
  font-size: 12px;
  margin-top: 10px;
}
.product-info {
  width: 300px;
}
</style>
