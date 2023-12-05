<template>
  <ion-page class="">
    <IonHeader class="ion-no-border ion-padding">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/vendor/home"></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">Credit Report</IonTitle>
          <ion-buttons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>

    <ion-content>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <CreditSummary
          :creditSummary="creditSummary.credit_sales"
        ></CreditSummary>
        <div class="d-flex ion-align-items-center credit-history ion-padding">
          <h6 slot="start" class="fw-bold">
            {{ $t("vendor.credit.creditHistory") }}
          </h6>

          <IonText
            slot="end"
            color="primary"
            router-link="/vendor/credits/history"
          >
            {{ $t("vendor.credit.viewAll") }}
          </IonText>
        </div>

        <CreditHistoryItem
          @click="viewDetails(credit)"
          @openMenu="openMenu($event, index)"
          v-for="(credit, index) in credits"
          :key="credit.id"
          :credit="credit"
        >
        </CreditHistoryItem>

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
  IonText,
  IonPopover,
} from "@ionic/vue";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  filter,
  optionsOutline,
  createOutline,
  trashOutline,
  add,
} from "ionicons/icons";
import { defineComponent, ref } from "vue";
import { useOrderStore } from "@/stores/OrderStore";
import ReceivedOrderList from "@/components/modules/order/ReceivedOrderList.vue";
import { mapStores } from "pinia";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import filters from "@/utilities/Filters";
import FilterCreditSheet from "@/components/modules/credit/FilterCreditSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import CreditSummary from "@/components/modules/credit/CreditSummary.vue";
import CreditHistoryItem from "@/components/modules/credit/CreditHistoryItem.vue";
import { useCreditStore } from "@/stores/CreditStore";
import Credit from "@/models/Credit";

const date = new Date();

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      filter,
      optionsOutline,
      trashOutline,
      createOutline,
      add,
      fetching: false,
      filters,
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
      credits: [] as Credit[] | null,
      creditSummary: {} as any,
      showFilterSheet: false,
      event: null as any,
      openPopover: -1,
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
    FilterCreditSheet,
    NoResults,
    IonSpinner,
    CreditSummary,
    CreditHistoryItem,
    IonText,
    IonPopover,
  },

  computed: {
    ...mapStores(useCreditStore),
  },

  methods: {
    async fetchCredits() {
      try {
        this.fetching = true;
        this.credits = await this.creditStore.getCredits(this.searchFilters);
        this.credits = this.credits?.splice(0, 4) as Credit[];
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
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

    async getCreditSummary() {
      try {
        this.fetching = true;
        this.creditSummary = await this.creditStore.getCreditSummary(
          this.searchFilters
        );
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },
    viewDetails(credit: Credit) {
      this.$router.push(`/vendor/credits/${credit.id}/credit-details`);
    },
  },

  mounted() {
    let start_dt = new Date();
    let end_dt = new Date();
    start_dt.setFullYear(2022, 0, 1);
    this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
    this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());
    this.fetchCredits();
    this.getCreditSummary();
  },
});
</script>

<style lang="scss" scoped>
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
.credit-history {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-bottom: 10px;
  margin-top: 20px;

  h6 {
    font-weight: bold;
    font-size: 1em;
    margin: 0px;
  }

  a {
    padding: 3px 10px;
    color: #666eed;
  }
}
</style>
