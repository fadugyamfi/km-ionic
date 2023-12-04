<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/credits"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("vendor.credit.creditOrder") }} - #{{ credit?.id }}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
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
          <ionText>Payment due date</ionText>
          <section
            class="d-flex ion-justify-content-between ion-align-items-baseline"
          >
            <IonText color="medium" slot="start">{{
              filters.date(credit?.sale_ended_at as string, "short")
            }}</IonText>

            <IonChip color="danger" class="font-medium" slot="end">
              Due: 22/09/2023
            </IonChip>
          </section>
        </ion-card>

        <OutstandingCreditStatistics></OutstandingCreditStatistics>

        <PlacedCreditItems :credit="credit"></PlacedCreditItems>

        <section class="ion-padding-horizontal update-button-section">
          <KolaYellowButton>
            {{ "Record repayment" }}
          </KolaYellowButton>
          <p class="font-medium">
            <iontext color="medium"
              >An overview of how much repayment you have received from Racy
              Ventures</iontext
            >
          </p>
        </section>
        <RecordRepayment></RecordRepayment>
        <RecordRepayment></RecordRepayment>
        <RecordRepayment></RecordRepayment>
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
  IonCardContent,
  IonChip,
} from "@ionic/vue";
import { defineComponent } from "vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";
import { mapStores } from "pinia";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline } from "ionicons/icons";
import CreditImages from "@/components/modules/vendorCredit/CreditImages.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import PlacedCreditItems from "@/components/modules/vendorCredit/PlacedCreditItems.vue";
import RecordRepayment from "@/components/modules/vendorCredit/RecordRepayment.vue";
import OutstandingCreditStatistics from "@/components/modules/vendorCredit/OutstandingCreditStatistics.vue";
import Credit from "@/models/Credit";
import { useCreditStore } from "@/stores/CreditStore";
import filters from "@/utilities/Filters";

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
    RecordRepayment,
    OutstandingCreditStatistics,
    IonChip,
  },

  name: "CreditDetails",

  data() {
    return {
      loading: false,
      chatbubbleOutline,
      credit: null as Credit | null,
      filters,
    };
  },

  mounted() {
    this.getCredit();
  },

  computed: {
    ...mapStores(useCreditStore),
  },

  methods: {
    async getCredit() {
      const credit_id = +this.$route.params.id;
      this.credit = await this.creditStore.getCredit(credit_id);
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
  margin-top: 2em;
  margin-bottom: 3em;
}
</style>
