<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="ion-no-border">
        <IonHeader class="inner-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/agent/orders/place-order/select-products"
                :icon="arrowBack"
                mode="md"
              >
              </IonBackButton>
            </IonButtons>
            <IonTitle v-if="$route.fullPath.includes('record')" size="small"
              ><b>Record New Order</b></IonTitle
            >
            <IonTitle v-else size="small"
              ><b>{{ $t("shopper.cart.placeNewOrder") }}</b></IonTitle
            >
            <IonButtons slot="end">
              <IonButton color="dark" style="opacity: 0">
                <IonIcon :icon="search" color="dark"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonCard class="ion-no-margin ion-margin-top">
          <IonCardContent>
            <section class="d-flex ion-justify-content-between fw-bold">
              <IonText>{{ $t("general.totalCost") }}</IonText>
              <IonText>
                {{
                  cartTotalCost?.toLocaleString("en-GB", {
                    style: "currency",
                    currency: cartCurrency || "GHS",
                  })
                }}
              </IonText>
            </section>
          </IonCardContent>
        </IonCard>
      </IonHeader>
    </section>
    <IonContent>
      <IonCard>
        <IonCardContent>
          <IonList lines="full">
            <SaleItemView
              v-for="item in orderStore.newOrder.order_items"
              :key="item.products_id"
              :saleItem="item"
            >
            </SaleItemView>
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="configure-continue"
        :disabled="!cartTotalCost"
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
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { arrowBack, closeCircleOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
import SaleItemView from "@/components/modules/sales/SaleItemView.vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { SaleItem } from "@/models/SaleItem";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useOrderStore } from "@/stores/OrderStore";
import { OrderItem } from "@/models/OrderItem";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      closeCircleOutline,
    };
  },

  // async ionViewDidEnter() {
  //   await this.orderStore.loadFromStorage();
  // },

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
    IonCard,
    IonCardContent,
    IonText,
    IonList,
    IonItem,
    IonThumbnail,
    Image,
    IonLabel,
    SaleItemView,
    IonFooter,
    KolaYellowButton,
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore, useOrderStore),

    cartTotalCost() {
      return this.orderStore.newOrder.order_items?.reduce(
        (acc, orderItem: OrderItem) => acc + (orderItem.total_price || 0),
        0
      );
    },

    cartCurrency() {
      const firstItem: OrderItem | undefined =
        this.orderStore.newOrder.order_items?.at(0);
      return firstItem?.product?.currency?.symbol as string;
    },
  },

  methods: {
    async onContinue() {
      if (!this.cartTotalCost) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.cannotProceedWithTotalCostOfZero"),
          "",
          "bottom",
          "configure-continue"
        );
        return;
      }
      Object.assign(this.orderStore.newOrder, {
        total_order_amount: this.cartTotalCost,
        total_items: this.orderStore.newOrder?.order_items?.length,
      });
      
      this.orderStore.persist();

      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push("/agent/orders/place-order/delivery-details");
      } else {
        this.$router.push("/vendor/orders/record-order/delivery-details");
      }
    },
  },
});
</script>
