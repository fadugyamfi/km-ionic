<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/vendor/sales/add-sale/select-sale-type"
              :icon="arrowBack"
              mode="md"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small"
            ><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle
          >
          <IonButtons slot="end">
            <ion-button color="dark" style="opacity: 0">
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent :fullscreen="true">
      <IonList lines="none" class="sales-select-list ion-padding-horizontal">
        <IonListHeader>
          <IonLabel class="fw-bold">{{
            $t("vendor.sales.selectPaymentMethod")
          }}</IonLabel>
        </IonListHeader>

        <IonItem
          v-for="paymentMode in paymentModes"
          :key="paymentMode.id"
          @click="selectPaymentMethod(paymentMode)"
        >
          <IonCheckbox
            :aria-label="paymentMode.name"
            justify="space-between"
            mode="ios"
            :value="paymentMode.id"
            :checked="saleStore.newSale.payment_modes_id == paymentMode.id"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ paymentMode.name }}</p>
              <IonText color="medium" class="font-medium">
                {{ paymentMode.description }}
              </IonText>
            </IonLabel>
          </IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="payment-mode-continue"
        :disabled="!saleStore.newSale.payment_modes_id"
        @click="onContinue()"
      >
        {{ $t("general.continue") }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButtons,
  IonHeader,
  IonBackButton,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonAvatar,
  IonCheckbox,
  IonText,
  IonFooter,
  IonSpinner,
} from "@ionic/vue";
import { arrowBack, close, refreshOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import { PaymentMode } from "@/models/PaymentMode";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "../../../../stores/UserStore";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonAvatar,
    IonCheckbox,
    IonText,
    IonFooter,
    KolaYellowButton,
    IonSpinner,
  },

  data() {
    return {
      search,
      close,
      arrowBack,
      paymentModes: [
        new PaymentMode({ id: 1, name: this.$t("vendor.sales.cash") }),
        new PaymentMode({ id: 2, name: this.$t("vendor.sales.mobileMoney") }),
        new PaymentMode({ id: 3, name: this.$t("vendor.sales.cheque") }),
      ],
    };
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore),
  },

  methods: {
    selectPaymentMethod(paymentMode: PaymentMode) {
      this.saleStore.newSale.payment_modes_id = paymentMode.id as number;
    },

    onContinue() {
      if (!this.saleStore.newSale.payment_modes_id) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectPaymentModeToContinue"),
          "",
          "bottom",
          "payment-mode-continue"
        );
        return;
      }

      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.push("/agent/sales/add-sale/select-inventory");
      } else {
        this.$router.push("/vendor/sales/add-sale/select-customer");
      }
    },

    refresh() {},
  },

  mounted() {},
});
</script>
