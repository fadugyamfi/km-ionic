<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/credits"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("vendor.credit.creditOrder") }} - #{{ credit?.id }}
          </IonTitle>
          <IonButtons slot="end">
            <ShareButton :title="`Credit Order - #${credit?.id}`"></ShareButton>
            <IonButton>
              <IonIcon :icon="chatbubbleOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true">
      <section
        v-if="loading"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <section v-else>
        <CreditImages :sale-items="credit?.sale_items" />
        <section>
          <PlacedCreditItems :credit="credit"></PlacedCreditItems>
        </section>
        <section>
          <PlacedCreditDetails :credit="credit"></PlacedCreditDetails>
          <section class="ion-padding-horizontal update-button-section">
            <KolaYellowButton v-if="hasPaid" @click="makePayment">
              {{ "Pay credit due" }}
            </KolaYellowButton>
            <p class="font-medium d-flex flex-column">
              <IonText color="dark" class="fw-bold">Payment History</IonText>
              <IonText color="medium"
                >An overview of how much repayment you have made so far</IonText
              >
            </p>
          </section>
          <ReceivedRepayment
            v-for="receivedRepayment in receivedRepayments"
            :key="receivedRepayment.id"
            :receivedRepayment="receivedRepayment"
            :credit="(credit as Credit)"
          ></ReceivedRepayment>
        </section>
      </section>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
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
  IonChip,
  IonText,
  IonLabel,
} from "@ionic/vue";
import { defineComponent } from "vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";
import { mapStores } from "pinia";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline, shareOutline } from "ionicons/icons";
import CreditImages from "@/components/modules/credit/CreditImages.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import PlacedCreditItems from "@/components/modules/credit/PlacedCreditItems.vue";
import ReceivedRepayment from "@/components/modules/credit/ReceivedRepayment.vue";
import PlacedCreditHistoryItem from "@/components/modules/credit/PlacedCreditHistoryItem.vue";
import ReceivedCreditStatistics from "@/components/modules/credit/ReceivedCreditStatistics.vue";
import Credit from "@/models/Credit";
import { useCreditStore } from "@/stores/CreditStore";
import filters from "@/utilities/Filters";
import { SalePayment } from "@/models/SalePayment";
import PlacedCreditDetails from "@/components/modules/credit/PlacedCreditDetails.vue";

import ShareButton from "@/components/buttons/ShareButton.vue";

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
    UpdateButon,
    IonButton,
    CreditImages,
    IonSpinner,
    KolaYellowButton,
    OrderStatusHistoryView,
    PlacedCreditItems,
    ReceivedRepayment,
    ReceivedCreditStatistics,
    PlacedCreditHistoryItem,
    PlacedCreditDetails,
    IonChip,
    IonText,
    IonLabel,
    ShareButton,
  },

  name: "CreditDetails",

  data() {
    return {
      loading: false,
      chatbubbleOutline,
      shareOutline,
      credit: null as Credit | null,
      receivedRepayments: [] as SalePayment[] | null,
      filters,
      handleAxiosRequestError,
    };
  },

  async mounted() {
    await this.getCredit();
    this.getRecordedRepayments();
  },

  computed: {
    ...mapStores(useCreditStore),
    hasPaid() {
      return (
        this.credit?.sale_payments_sum_amount >= this.credit?.total_sales_price
      );
    },
  },

  methods: {
    async getCredit() {
      try {
        this.loading = true;
        const credit_id = +this.$route.params.id;
        this.credit = await this.creditStore.getCredit(credit_id);
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async getRecordedRepayments() {
      try {
        this.loading = true;
        this.receivedRepayments = await this.creditStore.getRecordedRepayments(
          this.credit?.customer?.id as string | number,
          +this.$route.params.id
        );
      } catch (error) {
        handleAxiosRequestError(error);
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    makePayment() {
      this.creditStore.credit = this.credit;
      this.$router.push(`/shopper/credits/${this.credit?.id}/payment`);
    },
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
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
