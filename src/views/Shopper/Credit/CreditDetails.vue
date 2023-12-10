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
            <IonButton>
              <IonIcon :icon="shareOutline"></IonIcon>
            </IonButton>
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
        <ion-card class="ion-padding">
          <ionText color="dark" class="fw-bold"> Credit details</ionText>
          <section
            class="d-flex ion-justify-content-between ion-align-items-baseline"
          >
            <IonText slot="start"  class="font-medium" >
              Order date:
              {{
                filters.date(credit?.order?.due_date as string, "short") ||
                "N/A"
              }}
            </IonText>

            <IonChip
              v-if="credit?.order?.days_overdue"
              color="danger"
              class="font-medium fw-bold"
              slot="end"
            >
              {{ credit?.order?.days_overdue }} days overdue
            </IonChip>
          </section>
           <IonLabel :button="true" lines="none" class="d-flex ion-justify-content-between flex-column ion-align-items-baseline">

          
            <p>
              <IonChip color="danger"  class="font-medium" > 12 days overdue </IonChip>
            </p>
            <p>
              <IonText  class="font-medium" >Achimota Golf club, 180a </IonText>
            </p>
            <p>
              <IonText  class="font-medium" >Order delivered on - 2.08.2023</IonText>
            </p>
          </IonLabel>
        </ion-card>
        <section>
          <ReceivedCreditItems :credit="credit"></ReceivedCreditItems>
        </section>
        <section class="ion-padding-horizontal update-button-section">
          <KolaYellowButton @click="recordRepayment">
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
          :credit="credit"
        ></ReceivedRepayment>
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
import ReceivedCreditItems from "@/components/modules/credit/ReceivedCreditItems.vue";
import ReceivedRepayment from "@/components/modules/credit/ReceivedRepayment.vue";
import PlacedCreditHistoryItem from "@/components/modules/credit/PlacedCreditHistoryItem.vue";

import ReceivedCreditStatistics from "@/components/modules/credit/ReceivedCreditStatistics.vue";
import Credit from "@/models/Credit";
import { useCreditStore } from "@/stores/CreditStore";
import filters from "@/utilities/Filters";
import { SalePayment } from "@/models/SalePayment";

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
    ReceivedCreditItems,
    ReceivedRepayment,
    ReceivedCreditStatistics,
    PlacedCreditHistoryItem,
    IonChip,
    IonText,
    IonLabel,
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
    recordRepayment() {
      this.$router.push(`/vendor/credits/${this.credit?.id}/record-repayment`);
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
