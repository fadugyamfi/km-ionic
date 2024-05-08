<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              :defaultHref="`/profile/company/customers/${$route.params.id}/profile`"
            ></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">Credit Payments</IonTitle>
          <ion-buttons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>

            <NotificationButton />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <IonToolbar>
        <IonSegment
          value="thisweek"
          mode="ios"
          @ionChange="onSegmentChanged($event)"
        >
          <IonSegmentButton value="today">
            <IonLabel>
              {{ $t("general.today") }}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="thisweek">
            <IonLabel>{{ $t("general.thisWeek") }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pastmonth">
            <IonLabel>{{ $t("general.pastMonth") }}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>

    <ion-content class="ion-padding-horizontal">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-show="!fetching">
        <NoResults v-if="customerStore.creditPayments?.length == 0"></NoResults>

        <CreditPaymentList
          :creditPayments="customerStore.creditPayments"
        ></CreditPaymentList>
      </section>

      <FilterCreditSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onFilterUpdate($event)"
      >
      </FilterCreditSheet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonBadge,
  IonTitle,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { defineComponent, ref } from "vue";
import { useOrderStore } from "@/stores/OrderStore";
import CreditPaymentList from "@/components/modules/customers/credit/CreditPaymentList.vue";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  filter,
  optionsOutline,
  add,
} from "ionicons/icons";
import { mapStores } from "pinia";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import filters from "@/utilities/Filters";
import FilterCreditSheet from "@/components/modules/customers/credit/FilterCreditSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import { useCustomerStore } from "@/stores/CustomerStore";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      filter,
      optionsOutline,
      add,
      fetching: false,
      filters,
      showFilterSheet: false,
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
    };
  },

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonBadge,
    IonTitle,
    CreditPaymentList,
    NotificationButton,
    IonButton,
    IonIcon,
    FilterCreditSheet,
    NoResults,
    IonSpinner,
  },

  computed: {
    ...mapStores(useCustomerStore),
  },

  methods: {
    async fetchCreditPayments() {
      try {
        this.fetching = true;
        await this.customerStore.fetchCustomerCredits(
          this.$route.params.id,
          this.searchFilters
        );
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    onSegmentChanged(event: CustomEvent) {
      let start_dt = new Date();
      let end_dt = new Date();
      const option = event.detail.value;

      switch (option) {
        case "pastmonth":
          start_dt.setMonth(start_dt.getMonth() - 1);
          break;

        case "today":
          start_dt.setDate(start_dt.getDate() - 1);
          break;

        case "thisweek":
          start_dt.setDate(start_dt.getDate() - 7);
          break;
      }

      this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
      this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

      this.fetchCreditPayments();
    },

    onFilterUpdate(event: { start_dt: string; end_dt: string }) {
      this.searchFilters.start_dt = event.start_dt;
      this.searchFilters.end_dt =
        event.end_dt || formatMySQLDateTime(new Date().toISOString());
      this.fetchCreditPayments();
    },
  },

  mounted() {
    this.onSegmentChanged(
      new CustomEvent("load", { detail: { value: "thisweek" } })
    );
  },
});
</script>

<style scoped>
.ion-content {
  --align-items: center;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
  --text-align: justify;
  --white-space: normal;
  --border-radius: 10px;
}

.ion-segment-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
}

/* ion-segment-button ion-label {
      font-size: 16px;
      --align-items: center;
      text-align: center;
      overflow: inherit;
      text-overflow: inherit;
    } */
</style>
