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
            <IonTitle size="small"><b>Request</b></IonTitle>
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
      <section class="ion-padding-horizontal">
        <LocationInput
          v-model="form.fields.delivery_location"
          label="Delivery Location"
        ></LocationInput>
      </section>
      <IonCard>
        <IonCardContent>
          <IonList lines="full">
            <SaleItemView
              v-for="item in requestStore.newRequest.items"
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
        :disabled="!cartTotalCost || !form.fields.delivery_location"
        @click="onContinue()"
      >
        Record request
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
  IonInput,
  IonSpinner,
} from "@ionic/vue";
import {
  arrowBack,
  closeCircleOutline,
  search,
  navigateOutline,
} from "ionicons/icons";
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
import LocationInput from "@/components/forms/LocationInput.vue";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import SaleItemView from "@/components/modules/sales/SaleItemView.vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { SaleItem } from "@/models/SaleItem";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useRequestStore } from "@/stores/RequestStore";
import { OrderItem } from "@/models/OrderItem";
import { useForm } from "@/composables/form";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      closeCircleOutline,
      navigateOutline,
      form: useForm({
        delivery_location: "",
      }),
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
    ProductQuantitySelector,
    SaleItemView,
    IonFooter,
    KolaYellowButton,
    IonInput,
    LocationInput,
    IonSpinner
  },

  computed: {
    ...mapStores(useToastStore, useUserStore, useRequestStore),

    cartTotalCost() {
      return this.requestStore.newRequest.items?.reduce(
        (acc, orderItem: OrderItem) => acc + (orderItem.total_price || 0),
        0
      );
    },

    cartCurrency() {
      const firstItem: OrderItem | undefined =
        this.requestStore.newRequest.items?.at(0);
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
      this.requestStore.persist();
      this.requestStore.newRequest = {
        ...this.requestStore.newRequest,
        ...this.form.fields,
        total_price: this.cartTotalCost,
        total_items: this.requestStore.newRequest?.items?.length,
      };
      this.recordRequest();
      //   this.$router.push("/vendor/orders/record-order/delivery-details");
    },
    async recordRequest() {
      this.toastStore.blockUI();
      try {
        const request = await this.requestStore.recordRequest();

        if (!request) {
          this.toastStore.unblockUI();
          this.toastStore.showError(
            "Failed to record request",
            "Error",
            "bottom",
            "configure-continue"
          );
          return;
        }
        this.$router.push("/agent/request/place-request/order-confirmation");
      } catch (error) {
        console.log(error);
        handleAxiosRequestError(error);
      } finally {
        this.toastStore.unblockUI();
      }
    },
  },
});
</script>
<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
