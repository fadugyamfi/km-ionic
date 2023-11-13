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
            Product Details
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

    <Image src="/images/vendor/product-image"></Image>
    <ion-content :fullscreen="true" class="ion-padding">
      <p class="stock-availabilty">Product is currently out of stock</p>
      <section
        class="ion-padding-horizontal d-flex ion-align-items-start ion-justify-content-between"
      >
        <div>
          <h6>Frytol oil - GHS <span> 300.00</span></h6>
          <p>25kg/24pcs</p>
          <div>
            <!-- <Image src="/images/vendor/"></Image> -->
            <p>GHS 3000.00 minimum</p>
          </div>
        </div>
        <div>
          <IonButton
            fill="clear"
            color="dark"
            class="ion-no-margin ion-no-padding ion-align-self-start"
          >
            <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
          </IonButton>
        </div>
      </section>
      <!-- <section class="ion-padding categories">
        <IonChip class="chip">
          <IonLabel class="label"> All </IonLabel>
        </IonChip>
        <IonChip class="chip">
          <IonLabel class="label"> Dental </IonLabel>
        </IonChip>
        <IonChip class="chip">
          <IonLabel class="label"> Food </IonLabel>
        </IonChip>
        <IonChip class="chip">
          <IonLabel class="label"> Fashion </IonLabel>
        </IonChip>
        <IonChip class="chip">
          <IonLabel class="label"> Household </IonLabel>
        </IonChip>
      </section> -->

      <StockDetailChips />

      <section
        v-if="loading"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <section v-else>
        <!-- <OrderImages :order="(order as Order)" />
          <OrderDetailItems :order="(order as Order)" /> -->

        <section class="ion-padding-horizontal update-button-section">
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
} from "@ionic/vue";

import { defineComponent } from "vue";
// import OrdersCard from "@/components/modules/order/OrdersCard.vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";
import { closeCircleOutline } from "ionicons/icons";

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
import StockDetailChips from "@/components/modules/stock/StockDetailChips.vue";


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
    // OrdersCard,
    UpdateButon,
    IonButton,
    OrderImages,
    IonSpinner,
    // OrderDetailItems,
    KolaYellowButton,
    OrderStatusHistoryView,
    Image,
    StockUpdateSheet,StockDetailChips
  },

  name: "OrderDetails",

  data() {
    return {
      loading: false,
      chatbubbleOutline,
      closeCircleOutline,
      order: null as Order | null,
      showFilterSheet: false,
      fetching: false,
    };
  },

  async mounted() {
  },

  computed: {
    ...mapStores(useOrderStore),
  },

  methods: {
    onFilterUpdate(present){

    }
  },
});
</script>

<style scoped>
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

.update-button-section {
  margin-top: 2em;
  margin-bottom: 3em;
}

h6 {
  color: #000;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
}

.stock-availabilty {
  text-align: center;
  border-radius: 8px;
  border: 0.5px solid rgba(239, 62, 50, 0.2);
  background: #fdf0ed;
  box-shadow: 0px 2px 16px 0px rgba(101, 93, 93, 0.1);
  padding: 8px;
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
</style>
