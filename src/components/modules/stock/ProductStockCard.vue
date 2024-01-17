<template>
  <section>
    <section class="product-category-card" :class="{ tall: tall === true }">
      <ion-card>
        <Image :alt="stock.product_name" :src="stock.image" />
        <IonCardHeader>
          <section
            class="d-flex ion-align-items-center ion-justify-content-between"
          >
            <p class="product-title fw-semibold line-clamp">
              {{ stock.product_name }}
            </p>

            <IonButton
              fill="clear"
              color="medium"
              @click.prevent.stop="removeFromStock(stock)"
              class="ion-no-padding ion-no-margin"
            >
              <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
            </IonButton>
          </section>
          <section
            class="pricing d-flex ion-align-items-center ion-justify-content-between"
          >
            <span> {{ stock.currency?.symbol }} {{ stock.product_price }}</span>
            <span class="weight ion-text-end">
              {{ stock.weight_value }}kg
            </span>
          </section>

          <section v-if="stock.stock_quantity == 0">
            <IonText class="d-flex ion-align-items-center">
              <IonIcon class="warning" :icon="alertCircleOutline"></IonIcon>
              out of stock
              </IonText>
          </section>
          <section v-else>
            <IonText class="d-flex ion-align-items-center">
              {{ Filters.number(stock.stock_quantity as number, 0) }} in stock
            </IonText>
          </section>
        </IonCardHeader>
      </ion-card>
    </section>
    <DeleteStockModal
      :isOpen="showConfirmDeleteModal"
      :stock="selectedStock"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    />
  </section>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  locationOutline,
  closeCircleOutline,
  alertCircleOutline,
} from "ionicons/icons";
import Image from "@/components/Image.vue";
import Stock from "@/models/Stock";
import { mapStores } from "pinia";
import { useStockStore } from "@/stores/StockStore";
import { useToastStore } from "@/stores/ToastStore";
import DeleteStockModal from "./DeleteStockModal.vue";
import Filters from "../../../utilities/Filters";

export default defineComponent({
  props: {
    stock: {
      required: true,
      type: Stock,
    },

    tall: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      locationOutline,
      closeCircleOutline,
      alertCircleOutline,
      selectedStock: null as Stock | null,
      showConfirmDeleteModal: false,
      Filters,
    };
  },

  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    Image,
    IonList,
    IonButton,
    IonLabel,
    IonText,
    DeleteStockModal,
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
        this.toastStore.showSuccess(
          "Stock has been removed successfully",
          "",
          "bottom"
        );
      } catch (error) {
        this.toastStore.showError(
          "Failed to remove Stock. Please try again",
          "",
          "bottom",
          "footer"
        );
      }
    },
  }
});
</script>

<style scoped lang="scss">
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-category-card {
  ion-card {
    width: 100%;
    margin: 5px auto;
    position: relative;
    // border: solid 1px #f4f4f4;
    // border-radius: 8px;
    // box-shadow: 1px 2px 9px #f9f9f9;

    ion-img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }

    ion-card-header {
      text-align: left;
      padding: 0px 5px 5px 5px;
      .product-title {
        font-size: 0.95em;
        font-weight: 500;
        margin-top: 0px;
        margin-bottom: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #111;
      }

      .pricing {
        font-size: 0.93em;
        font-weight: normal;
        color: #212121;
        margin-bottom: 5px;
        span {
          font-size: 11px;
          &.weight {
            color: #787486;
            font-size: 9px;
          }
        }
      }
    }
  }

  &.tall {
    ion-img {
      height: 180px;
      object-fit: cover;
    }
  }
}
ion-button {
  font-size: 0px;
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
    margin-right: 5px;
  }
}
ion-text {
  font-size: 12px;
  font-weight: normal;
  color: #212121;
}
</style>
