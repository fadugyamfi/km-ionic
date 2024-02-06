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
          <div class="d-flex ion-justify-content-between ion-align-items-center ion-padding-horizontal ion-margin-top">
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
          <v-chart ref="chart" class="chart" :option="barOption" autoresize />
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
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";

import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import VChart, { THEME_KEY } from "vue-echarts";
import { getDateDifference } from "@/utilities";

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
provide(THEME_KEY, "light");

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

const barOption = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "5%",
    right: "5%",
    top: "15%",
    bottom: "0%",
    containLabel: true,
  },
  xAxis: {
    data: [] as any[],
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#74787c",
      fontSize: 11,
      formatter: function (value: string) {
        return value.includes("Week")
          ? value
          : value.match("^[0-9].*")
          ? value
          : value[0];
      },
    },
    axisLine: {
      show: false,
    },
  },

  yAxis: {
    type: "value",
    formatter: "{a|Y-Axis Name}",
    axisLabel: {
      color: "#000",
      fontSize: 11,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#E7EAEC",
      },
    },
  },

  series: [
    {
      name: "Sales",
      type: "bar",
      barWidth: "10",
      data: [] as any[],
      itemStyle: {
        borderRadius: [2, 2, 2, 2],
        opacity: 0.4,
        color: "#036",
      },
    },
  ],
});

const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
  searchFilters.value.period = "custom";
  fetchAgentSalesSummary();
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
  fetchAgentSalesSummary();
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
  fetchAgentSalesSummary();
  fetchAgent();
};
const getTotalYearSales = (summary: any[]) => {
  let totalSales = [] as any[];

  for (const sale of summary) {
    if (totalSales.some((item: any) => item.year === sale.year)) {
      totalSales.find((item: any) => item.year === sale.year).total =
        Number(totalSales.find((item: any) => item.year === sale.year).total) +
        Number(sale.total);
    } else {
      totalSales.push(sale);
    }
  }
  const totalSalesValues = totalSales.map((sale) => sale.total);
  return totalSalesValues;
};

const removeDuplicates = (duplicates: any[]) => {
  return duplicates.filter((item, index) => duplicates.indexOf(item) === index);
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
const fetchAgentSalesSummary = async () => {
  try {
    const agentsStore = useAgentsStore();
    fetching.value = true;
    const summary = await agentsStore.fetchAgentSalesSummary({
      ...searchFilters.value,
    });
    if (summary) {
      const days = summary.map((s: any) => s.dayname);
      const weeks = summary.map((s: any) => `Week ${s.week_of_month}`);
      const months = summary.map((s: any) => s.monthname);
      const years = summary.map((s: any) => s.year);
      const totalSales = summary.map((s: any) => s.total);

      const difference = getDateDifference(
        searchFilters.value.start_dt,
        searchFilters.value.end_dt
      );

      switch (searchFilters.value.period) {
        case "thisweek":
        case "lastweek":
          barOption.value.xAxis.data = days;
          barOption.value.series[0].data = totalSales;
          break;
        case "thismonth":
        case "lastmonth":
          barOption.value.xAxis.data = weeks;
          barOption.value.series[0].data = totalSales;
          break;
        case "thisyear":
        case "lastyear":
          barOption.value.xAxis.data = months;
          barOption.value.series[0].data = totalSales;
          break;
        case "custom":
          switch (true) {
            case difference <= 14:
              barOption.value.xAxis.data = days;
              barOption.value.series[0].data = totalSales;
              break;
            case difference > 14 && difference < 32:
              barOption.value.xAxis.data = weeks;
              barOption.value.series[0].data = totalSales;
              break;
            case difference > 31 && difference <= 365:
              barOption.value.xAxis.data = months;
              barOption.value.series[0].data = totalSales;
              break;
            case difference > 365:
              barOption.value.xAxis.data = removeDuplicates(years);
              barOption.value.series[0].data = getTotalYearSales(summary);
              break;
          }
      }
    }
  } catch (error) {
  } finally {
    fetching.value = false;
  }
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
