<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="ion-no-border">
        <IonHeader class="inner-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/vendor/sales/add-sale/select-products"
                :icon="arrowBack"
                mode="md"
              >
              </IonBackButton>
            </IonButtons>
            <IonTitle size="small"
              ><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle
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
      <section class=" ion-padding-horizontal">

        <h6 style="margin-top: 0px">Sale Date</h6>
        <IonInput
          type="datetime-local"
          class="kola-input delivery-details-input"
          label="Sale Date & Time"
          labelPlacement="stacked"
          fill="solid"
          v-model="saleStore.newSale.sale_started_at"
          name="sale_started_at"
          required
        ></IonInput>
      </section>
      <IonCard>
        <IonCardContent>
          <IonList lines="full">
            <SaleItemView
              v-for="item in saleStore.newSale.sale_items"
              :key="item.products_id"
              :saleItem="item"
              :max="item?.product?.quantity"
              :group-quantity="item?.product?.group_quantity"
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
        {{ $t("vendor.sales.recordSale") }}
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
import { arrowBack, closeCircleOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
import SaleItemView from "@/components/modules/sales/SaleItemView.vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { SaleItem } from "@/models/SaleItem";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "../../../../utilities";
import { useUserStore } from "../../../../stores/UserStore";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      closeCircleOutline,
    };
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
    IonInput,
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore),

    cartTotalCost() {
      return this.saleStore.newSale.sale_items?.reduce(
        (acc, saleItem: SaleItem) => acc + (saleItem.total_price || 0),
        0
      );
    },

    cartCurrency() {
      const firstItem: SaleItem | undefined =
        this.saleStore.newSale.sale_items?.at(0);
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

      const toastStore = useToastStore();
      toastStore.blockUI();

      try {
        const sale = await this.saleStore.recordSale();

        if (!sale) {
          toastStore.unblockUI();
          toastStore.showError(
            "Failed to record sale",
            "Error",
            "bottom",
            "configure-continue"
          );
          return;
        }

        if (this.userStore.activeRole?.isSalesAssociate()) {
          this.$router.push("/agent/sales/add-sale/sale-confirmation");
        } else {
          this.$router.push("/vendor/sales/add-sale/sale-confirmation");
        }
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        toastStore.unblockUI();
      }
    },
  },
});
</script>
<style scoped lang="scss">
.delivery-details-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}
h6 {
  font-size: 14px;
  margin-top: 24px;
}
</style>
