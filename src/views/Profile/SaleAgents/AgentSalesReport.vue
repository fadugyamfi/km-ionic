<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/profile/company/sale-agents"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel>{{ $t("profile.agent.agentSaleReport") }}</IonLabel>
            </section></IonTitle
          >
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
        <SalesStatistics
          :total-sales="agent?.total_sales"
          :avg-sales="agent?.avg_sales"
        ></SalesStatistics>
        <Performance :agent="agent"></Performance>
        <BestSellingItems
          :top-selling-product="agent?.top_selling_product"
          :total-customers="agent?.total_customers"
        ></BestSellingItems>
        <section>
          <div
            class="d-flex ion-justify-content-between ion-align-items-center ion-padding-horizontal ion-margin-top"
          >
            <IonText color="dark" class="fw-semibold"> Sales </IonText>
            <IonSelect
              class="sale-filter"
              labelPlacement="stacked"
              fill="outline"
              required
              v-model="searchFilters.period"
              name="category"
              :toggle-icon="chevronDownOutline"
              @ion-change="handleSalesSummaryFilter($event.detail.value)"
            >
              <ion-select-option
                v-for="(period, index) in periods"
                :key="index"
                :value="period.value"
                >{{ period.label }}</ion-select-option
              >
            </IonSelect>
          </div>
          <BarChart :query-filters="searchFilters" sales-type="agent" />
        </section>
      </section>
    </ion-content>
    <FilterAgentSaleReportSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
      @update="onFilterUpdate($event)"
    ></FilterAgentSaleReportSheet>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonSpinner,
  IonTitle,
  RefresherCustomEvent,
  IonRefresherContent,
  IonRefresher,
  IonLabel,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonList,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonText,
  IonSegment,
} from "@ionic/vue";
import { computed, onBeforeUnmount, onMounted, ref, provide } from "vue";
import {
  arrowBackOutline,
  personAddOutline,
  search,
  optionsOutline,
  chevronDownOutline,
} from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { formatMySQLDateTime } from "@/utilities";
import Business from "@/models/Business";
import Agent from "@/models/Agent";
import { useRoute } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";
import SalesStatistics from "../../../components/modules/SalesStatistics.vue";
import Performance from "../../../components/modules/Performance.vue";
import BestSellingItems from "../../../components/modules/BestSellingItems.vue";
import FilterAgentSaleReportSheet from "../../../components/modules/agents/FilterAgentSaleReportSheet.vue";
import BarChart from "@/components/charts/BarChart.vue";

const fetching = ref(false);
const route = useRoute();

const showFilterSheet = ref(false);
const agent = ref<Agent | null>();
const searchFilters = ref({
  start_dt: "",
  end_dt: "",
  period: "thisweek",
});

const periods = ref([
  { label: "This Week", value: "thisweek" },
  { label: "Last Week", value: "lastweek" },
  { label: "This Month", value: "thismonth" },
  { label: "Last Month", value: "lastmonth" },
  { label: "This Year", value: "thisyear" },
  { label: "Last Year", value: "lastyear" },
  { label: "Custom", value: "custom" },
]);

const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
  searchFilters.value.period = "custom";
  fetchAgent();
};

const handleSalesSummaryFilter = (period: string) => {
  showFilterSheet.value = false;
  if (period == "custom") {
    showFilterSheet.value = true;
    searchFilters.value.period = period;
    return;
  }
  Object.assign(searchFilters.value, {
    start_dt: "",
    end_dt: "",
    period: searchFilters.value.period,
  });
  fetchAgent();
};

const onSegmentChanged = (event: CustomEvent) => {
  let start_dt = new Date();
  let end_dt = new Date();
  const option = event.detail.value;

  switch (option) {
    case "pastmonth":
      start_dt.setMonth(start_dt.getMonth() - 1);
      searchFilters.value.period = "lastmonth";
      break;

    case "today":
      start_dt.setDate(start_dt.getDate() - 1);
      searchFilters.value.period = "custom";
      break;

    case "thisweek":
      start_dt.setDate(start_dt.getDate() - 7);
      searchFilters.value.period = "thisweek";
      break;
  }

  searchFilters.value.start_dt = formatMySQLDateTime(start_dt.toISOString());
  searchFilters.value.end_dt = formatMySQLDateTime(end_dt.toISOString());
  fetchAgent();
};
const fetchAgent = async (options = {}) => {
  fetching.value = true;
  const userStore = useUserStore();
  const agentsStore = useAgentsStore();
  const agentId = route.params.id;

  agent.value = await agentsStore.getAgent(
    userStore.activeBusiness as Business,
    agentId,
    searchFilters.value
  );
  fetching.value = false;
};
onMounted(() => {
  onSegmentChanged(new CustomEvent("load", { detail: { value: "thisweek" } }));
});
</script>

<style lang="scss" scoped>
.chart {
  height: 165px;
  margin-bottom: 10px;
}
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}

.sale-filter {
  --background: #fff;
  --border-width: 1px;
  --border-style: solid;
  --border-radius: 10px;
  --border-color: #e8e8e8;
  --highlight-color-focused: none !important;
  --ripple-color: none !important;
  --padding-start: 13px;
  --padding-end: 10px;
  min-height: 32px;
  font-size: 14px;
  max-width: 120px;
  margin-left: 10px;
}
</style>
