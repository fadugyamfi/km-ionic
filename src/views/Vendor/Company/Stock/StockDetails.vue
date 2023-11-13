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
            <IonButton>
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
              <!-- <Image src="/images/vendor/share"></Image> -->
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true" class="ion-padding">
      <section
        v-if="loading"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <section v-if="!loading">
        <Image :src="product?.image"></Image>
        <StockInfo :product="product" />
        <section class="ion-padding-vertical">
          {{ product?.image }}
          <KolaYellowButton @click="showFilterSheet = true">
            {{ "Update Stock" }}
          </KolaYellowButton>
        </section>
      </section>
      <StockUpdateSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onFilterUpdate($event)"
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
import { useOrderStore } from "@/stores/OrderStore";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline } from "ionicons/icons";
import OrderImages from "@/components/modules/order/OrderImages.vue";
// import OrderDetailItems from "@/components/modules/order/OrderDetailItems.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import Image from "@/components/Image.vue";
import StockUpdateSheet from "@/components/modules/stock/StockUpdateSheets.vue";
import StockInfo from "@/components/modules/stock/StockInfo.vue";
import { useStockStore } from "@/stores/StockStore";
import Stock from "@/models/Stock";

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
      loading: false,
      chatbubbleOutline,
      order: null as Order | null,
      showFilterSheet: false,
      fetching: false,
      product: null as Stock | null,
    };
  },

  mounted() {
    this.getProduct();
  },

  computed: {
    ...mapStores(useOrderStore),
  },

  methods: {
    onFilterUpdate(present) {},
    async getProduct() {
      const stockStore = useStockStore();
      const route = this.$route.params.id;
      this.fetching = true;
      this.product = await stockStore.fetchProduct(Number(route));
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
