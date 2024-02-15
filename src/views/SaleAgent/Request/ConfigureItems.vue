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
            <IonTitle size="small"><b>Agent request</b></IonTitle>
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
              v-for="item in requestStore.newRequest.items"
              :key="item.products_id"
              :saleItem="item"
            >
            </SaleItemView>
          </IonList>
        </IonCardContent>
      </IonCard>
      <section class="ion-margin-top ion-padding">
        <IonInput
          class="kola-input delivery-details-input"
          :class="{ 'ion-invalid ion-touched': form.errors.gps_location }"
          label="Delivery Location"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.gps_location"
          name="location"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonButton
          fill="clear"
          size="small"
          style="text-transform: none"
          class="ion-margin-bottom use-location ion-text-start"
          @click="getLocation()"
        >
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
        </IonButton>
      </section>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="configure-continue"
        :disabled="!cartTotalCost"
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
} from "@ionic/vue";
import {
  arrowBack,
  closeCircleOutline,
  search,
  navigateOutline,
} from "ionicons/icons";
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
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
import { useGeolocation } from "@/composables/useGeolocation";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      closeCircleOutline,
      navigateOutline,
      form: useForm({
        gps_location: "",
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
        total_sales_price: this.cartTotalCost,
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
        // if (userStore.user?.isSalesAssociate()) {
        //   this.$router.push("/agent/orders/place-order/order-confirmation");
        // } else {
        //   this.$router.push("/vendor/orders/record-order/order-confirmation");
        // }
      } catch (error) {
        console.log(error);
        handleAxiosRequestError(error);
      } finally {
        this.toastStore.unblockUI();
      }
    },
    async getLocation() {
      const { getCurrentLocation } = useGeolocation();

      try {
        const coordinates = await getCurrentLocation();
        console.log(coordinates);

        if (coordinates) {
          this.form.fields.gps_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
        }
      } catch (error) {
        this.toastStore.showError("Cannot retrieve location info");
      }
    },
  },
});
</script>
