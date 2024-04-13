<template>
  <IonPage>
    <IonHeader class="ion-padding ion-no-border">
      <IonHeader class="inner-header ion-margin-bottom">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              :defaultHref="`/shopper/credits/${$route.params.id}/credit-details`"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small"><b>Payment Method</b></IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonHeader>

    <IonContent class="ion-padding-horizontal">
      <form @submit.prevent="addPayment()">
        <IonList lines="none" class="sales-select-list">
          <IonListHeader
            class="d-flex flex-column ion-align-items-start ion-margin-bottom"
          >
            <IonLabel class="fw-semibold" style="font-size: 14px"
              >Payment Method</IonLabel
            >
            <p class="font-medium ion-no-margin">
              <IonText color="medium"> Select a payment method </IonText>
            </p>
          </IonListHeader>

          <IonItem
            v-for="paymentMode in paymentModes"
            :key="paymentMode.id"
            @click="selectPaymentMethod(paymentMode)"
          >
            <IonLabel style="display: flex; align-items: center">
              <Image class="mode-icon" :src="paymentMode?.icon"></Image>
              <div>
                <p class="ion-no-margin">{{ paymentMode.name }}</p>
                <p class="description">
                  {{ paymentMode.description }}
                </p>
              </div>
            </IonLabel>
            <IonCheckbox
              :aria-label="paymentMode.name"
              slot="end"
              mode="ios"
              :value="paymentMode.id"
              :checked="form.fields.payment_modes_id == paymentMode.id"
            ></IonCheckbox>
          </IonItem>
        </IonList>
      </form>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton :disabled="!formValid()" @click="addPayment()">
        <span v-if="processing">
          <IonSpinner name="crescent"></IonSpinner>
        </span>
        <span v-else>Make Payment</span>
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { arrowBack, optionsOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useForm } from "@/composables/form";
import { PaymentMode } from "@/models/PaymentMode";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import { SalePayment } from "@/models/SalePayment";
import { useUserStore } from "@/stores/UserStore";
import { handleAxiosRequestError } from "@/utilities";
import { useToastStore } from "@/stores/ToastStore";
import { useCartStore } from "@/stores/CartStore";
import { useCreditStore } from "@/stores/CreditStore";
import Image from "@/components/Image.vue";

export default defineComponent({
  data() {
    return {
      arrowBack,
      optionsOutline,
      processing: false,
      paymentModes: [
        // new PaymentMode({
        //   id: 1,
        //   name: this.$t("vendor.sales.cash"),
        //   description: "Pay credit with cash",
        //   icon: "/images/cash.svg",
        // }),
        new PaymentMode({
          id: 2,
          name: this.$t("vendor.sales.mobileMoney"),
          description: "Pay With Mobile Money",
          icon: "/images/momo.svg",
        }),
        // new PaymentMode({
        //   id: 3,
        //   name: this.$t("vendor.sales.bankTransfer"),
        //   description: "***********2343",
        //   icon: "/images/bank_transfer.svg",
        // }),
      ],
      form: useForm({
        payment_modes_id: 2,
        currencies_id: 1,
      }),
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
    IonFooter,
    KolaYellowButton,
    IonInput,
    IonText,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonCheckbox,
    IonSpinner,
    Image,
  },

  computed: {
    ...mapStores(useSaleStore, useCartStore, useCreditStore),
  },

  methods: {
    selectPaymentMethod(paymentMode: PaymentMode) {
      this.form.fields.payment_modes_id = paymentMode.id as number;
    },

    formValid() {
      return this.form.fields.payment_modes_id != null;
    },

    async addPayment() {
      const toastStore = useToastStore();
      this.processing = true;

      try {
        toastStore.blockUI("Hold On As We Make Your Payment ");
        const userStore = useUserStore();

        const payment = new SalePayment({
          cms_users_id: userStore.user?.id,
          sales_id: +this.$route.params.id,
          businesses_id: userStore.activeBusiness?.id,
          total_sales_price: this.creditStore.credit?.total_sales_price,
          ...this.form.fields,
        });

        const response = await this.saleStore.recordRepayment(payment);

        if (response) {
          await this.cartStore.checkout({
            ...response,
            sale: { id: response.sales_id },
            total_order_amount: response.total_sales_price,
          });
          if (userStore?.isInShoppingMode()) {
            this.$router.push(
              `/shopper/credits/${this.$route.params.id}/credit-details`
            );
          } else {
            this.$router.push(
              `/vendor/credits/${this.$route.params.id}/credit-details`
            );
          }
          toastStore.showSuccess(
            this.$t("vendor.sales.paymentRecordedSuccessfully")
          );
        }
      } catch (error) {
        toastStore.showError(this.$t("vendor.sales.paymentRecordingFailed"));
        handleAxiosRequestError(error);
        console.log(error);
      } finally {
        toastStore.unblockUI();
        this.processing = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.label {
  font-size: 14px;
  color: #000;
  font-weight: 500;
  margin: 0 0 8px 0;
}
.mode-icon {
  width: 32px;
  margin-right: 8px;
}

.description {
  font-size: 0.85em !important;
  color: #92949c;
}
</style>
