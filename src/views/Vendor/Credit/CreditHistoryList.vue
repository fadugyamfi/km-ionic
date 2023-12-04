<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/vendor/credits"></ion-back-button>
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
      <EmptyCredit v-if="credits?.length == 0"></EmptyCredit>

      <CreditHistoryItem
        @openMenu="openMenu($event, index)"
        v-for="(credit, index) in credits"
        :key="credit?.id"
        :credit="credit"
        popover
      >
        <template v-slot:popover>
          <IonPopover
            :event="event"
            :isOpen="openPopover == index"
            @didDismiss="openPopover = -1"
          >
            <IonContent class="ion-no-padding">
              <IonList lines="full" class="ion-no-padding">
                <ion-item :button="true" lines="full">
                  <ion-icon slot="start" :icon="createOutline"></ion-icon>
                  {{ $t("vendor.sales.recordRepayment") }}
                </ion-item>
                <ion-item
                  :button="true"
                  lines="full"
                  @click="deleteCredit(credit)"
                >
                  <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                  {{ $t("general.delete") }}
                </ion-item>
              </IonList>
            </IonContent>
          </IonPopover>
        </template>
      </CreditHistoryItem>

      <FilterOrdersSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onFilterUpdate($event)"
      >
      </FilterOrdersSheet>
      <DeleteModal
        :title="$t('vendor.credit.deleteCreditFromList')"
        :description="$t('vendor.orders.youCantUndoThisAction')"
        :isOpen="showConfirmDeleteModal"
        @dismiss="showConfirmDeleteModal = false"
        @confirm="onConfirmDelete()"
      ></DeleteModal>
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
import ReceivedOrderList from "@/components/modules/order/ReceivedOrderList.vue";
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
import FilterOrdersSheet from "@/components/modules/order/FilterOrdersSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import CreditHistoryItem from "@/components/modules/vendorCredit/CreditHistoryItem.vue";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import router from "@/router";
import EmptyCredit from "@/components/modules/vendorCredit/EmptyCredit.vue";

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
      router: router,
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
    ReceivedOrderList,
    IonButton,
    IonIcon,
    FilterOrdersSheet,
    NoResults,
    IonSpinner,
    CreditHistoryItem,
    IonList,
    IonPopover,
    IonItem,
    DeleteModal,
    EmptyCredit,
  },

  computed: {
    ...mapStores(useCreditStore),
    credits(): any[] {
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
