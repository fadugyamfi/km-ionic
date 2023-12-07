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
      <PlacedCreditSummary
        :placedCreditSummary="placedCreditSummary"
      ></PlacedCreditSummary>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <EmptyCredit v-if="credits?.length == 0"></EmptyCredit>

        <PlacedCreditHistoryItem
          @click="viewDetails(credit)"
          @openMenu="openMenu($event, index)"
          v-for="(credit, index) in credits"
          :key="credit?.id"
          :credit="credit"
        >
        </PlacedCreditHistoryItem>

        <FilterCreditSheet
          :isOpen="showFilterSheet"
          @didDismiss="showFilterSheet = false"
          @update="onFilterUpdate($event)"
        >
        </FilterCreditSheet>
        <DeleteModal
          :title="$t('vendor.credit.deleteCreditFromList')"
          :description="$t('vendor.orders.youCantUndoThisAction')"
          :isOpen="showConfirmDeleteModal"
          @dismiss="showConfirmDeleteModal = false"
          @confirm="onConfirmDelete()"
        ></DeleteModal>
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
  IonPopover,
  IonList,
  IonItem,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useCreditStore } from "@/stores/CreditStore";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  chatbubbleOutline,
  createOutline,
  trashOutline,
  filter,
  optionsOutline,
  add,
} from "ionicons/icons";
import { mapStores } from "pinia";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import filters from "@/utilities/Filters";
import FilterCreditSheet from "@/components/modules/credit/FilterCreditSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import PlacedCreditHistoryItem from "@/components/modules/credit/PlacedCreditHistoryItem.vue";
import PlacedCreditSummary from "@/components/modules/credit/PlacedCreditSummary.vue";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import router from "@/router";
import EmptyCredit from "@/components/modules/credit/EmptyCredit.vue";
import Credit from "@/models/Credit";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      trashOutline,
      filter,
      optionsOutline,
      chatbubbleOutline,
      createOutline,
      add,
      router,
      fetching: false,
      filters,
      showFilterSheet: false,
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
      event: null as any,
      openPopover: -1,
      showConfirmDeleteModal: false,
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
    IonPopover,
    IonItem,
    DeleteModal,
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
    recordRepayment(credit: Credit) {
      this.$router.push(`/shopper/credits/${credit.id}/record-repayment`);
      this.closeMenu();
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
    openMenu(event: any, index: number) {
      this.event = event;
      this.openPopover = index;
    },

    closeMenu() {
      this.openPopover = -1;
      this.event = null;
    },
    deleteCredit(credit: any) {
      this.selectedCredit = credit;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      await this.creditStore.deleteCredit(this.selectedCredit?.id as number);
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
