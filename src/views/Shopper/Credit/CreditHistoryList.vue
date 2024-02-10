<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/shopper/home"></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">Credit History</IonTitle>
          <ion-buttons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
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

    <ion-content>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <PlacedCreditSummary></PlacedCreditSummary>
        <EmptyCredit v-if="credits?.length == 0"></EmptyCredit>
        <section class="ion-margin-top">
          <PlacedCreditHistoryItem
            @click="viewDetails(credit)"
            v-for="credit in credits"
            :key="credit?.id"
            :credit="credit"
          >
          </PlacedCreditHistoryItem>
        </section>
        <FilterCreditSheet
          :isOpen="showFilterSheet"
          @didDismiss="showFilterSheet = false"
          @update="onFilterUpdate($event)"
        >
        </FilterCreditSheet>
      </section>
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
  IonList,
  IonItem,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useCreditStore } from "@/stores/CreditStore";
import { arrowBack, optionsOutline } from "ionicons/icons";
import { mapStores } from "pinia";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import filters from "@/utilities/Filters";
import FilterCreditSheet from "@/components/modules/credit/FilterCreditSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import PlacedCreditHistoryItem from "@/components/modules/credit/PlacedCreditHistoryItem.vue";
import PlacedCreditSummary from "@/components/modules/credit/PlacedCreditSummary.vue";
import EmptyCredit from "@/components/modules/credit/EmptyCredit.vue";
import Credit from "@/models/Credit";

export default defineComponent({
  data() {
    return {
      arrowBack,
      optionsOutline,
      fetching: false,
      filters,
      showFilterSheet: false,
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
      event: null as any,
      selectedCredit: {} as any | null,
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
    IonButton,
    IonIcon,
    FilterCreditSheet,
    NoResults,
    IonSpinner,
    PlacedCreditHistoryItem,
    IonList,
    IonItem,
    EmptyCredit,
    PlacedCreditSummary,
  },

  computed: {
    ...mapStores(useCreditStore),
    credits() {
      return this.creditStore.credits;
    },
  },

  methods: {
    async fetchCredits() {
      try {
        this.fetching = true;
        await this.creditStore.getCredits(this.searchFilters);
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },
    viewDetails(credit: Credit) {
      this.$router.push(`/shopper/credits/${credit.id}/credit-details`);
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

      this.fetchCredits();
    },

    onFilterUpdate(event: { start_dt: string; end_dt: string }) {
      this.searchFilters.start_dt = event.start_dt;
      this.searchFilters.end_dt =
        event.end_dt || formatMySQLDateTime(new Date().toISOString());
      this.fetchCredits();
    },
  },

  mounted() {
    this.onSegmentChanged(
      new CustomEvent("load", { detail: { value: "thisweek" } })
    );
  },
});
</script>

<style lang="scss" scoped>
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>
