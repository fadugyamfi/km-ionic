<template>
  <IonPage>
    <IonHeader class="ion-padding ion-no-border">
      <IonHeader class="inner-header ion-margin-bottom">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/vendor/sales"
              :icon="arrowBack"
              mode="md"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small"
            ><b>{{ $t("vendor.sales.recordRepayment") }}</b></IonTitle
          >
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </IonHeader>

    <IonContent class="ion-padding-horizontal">
      <form @submit.prevent="addPayment()">
        <p class="fw-semibold" style="margin-bottom: 0.25em">
          {{ $t("vendor.sales.amountPaid") }}
        </p>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.amount,
          }"
          :label="$t('vendor.sales.enterAmountPaid')"
          labelPlacement="stacked"
          fill="solid"
          type="number"
          v-model="form.fields.amount"
          name="amount"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <p class="fw-semibold" style="margin-bottom: 0.25em">
          {{ $t("vendor.sales.addDate") }}
        </p>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.payment_date,
          }"
          :label="'DD/MM/YYYY'"
          labelPlacement="stacked"
          fill="solid"
          type="date"
          v-model="form.fields.payment_date"
          name="payment_date"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <IonList lines="none" class="sales-select-list">
          <IonListHeader
            class="d-flex flex-column ion-align-items-start ion-margin-bottom"
          >
            <IonLabel class="fw-bold">{{
              $t("vendor.sales.selectPaymentMethod")
            }}</IonLabel>
            <p class="font-medium ion-no-margin">
              <IonText color="medium">
                {{ $t("vendor.sales.selectPaymentMethodForCreditSale") }}
              </IonText>
            </p>
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
              :checked="form.fields.payment_modes_id == paymentMode.id"
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
      </form>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton :disabled="!formValid()" @click="addPayment()">
        <span v-if="processing">
          <IonSpinner name="crescent"></IonSpinner>
        </span>
        <span v-else>{{ $t("vendor.sales.addPayment") }}</span>
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
import KolaYellowButton from "../../../components/KolaYellowButton.vue";
import { useForm } from "../../../composables/form";
import { PaymentMode } from "../../../models/PaymentMode";
import { useSaleStore } from "../../../stores/SaleStore";
import { mapStores } from "pinia";
import { SalePayment } from "../../../models/SalePayment";
import { useUserStore } from "../../../stores/UserStore";
import { handleAxiosRequestError } from "../../../utilities";
import { useToastStore } from "../../../stores/ToastStore";

export default defineComponent({
  data() {
    return {
      arrowBack,
      optionsOutline,
      processing: false,
      paymentModes: [
        new PaymentMode({ id: 1, name: this.$t("vendor.sales.cash") }),
        new PaymentMode({ id: 2, name: this.$t("vendor.sales.mobileMoney") }),
        new PaymentMode({ id: 3, name: this.$t("vendor.sales.bankTransfer") }),
      ],
      form: useForm({
        amount: "",
        payment_date: "",
        payment_modes_id: 1,
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
  },

  computed: {
    ...mapStores(useSaleStore),
  },

  methods: {
    selectPaymentMethod(paymentMode: PaymentMode) {
      this.form.fields.payment_modes_id = paymentMode.id as number;
    },

    formValid() {
      return (
        this.form.fields.amount > 0 &&
        this.form.fields.payment_date != null &&
        this.form.fields.payment_date.length > 0 &&
        this.form.fields.payment_modes_id != null
      );
    },

    async addPayment() {
      const toastStore = useToastStore();
      this.processing = true;

      try {
        const userStore = useUserStore();

        const payment = new SalePayment({
          sales_id: +this.$route.params.id,
          cms_users_id: userStore.user?.id,
          businesses_id: userStore.activeBusiness?.id,
          ...this.form.fields,
        });

        const response = await this.saleStore.recordRepayment(payment);

        if (response) {
          toastStore.showSuccess(
            this.$t("vendor.sales.paymentRecordedSuccessfully")
          );
          this.$router.push(`/vendor/sales/${this.$route.params.id}`);
        }
      } catch (error) {
        toastStore.showError(this.$t("vendor.sales.paymentRecordingFailed"));
        handleAxiosRequestError(error);
        console.log(error);
      } finally {
        this.processing = false;
      }
    },
  },
});
</script>
