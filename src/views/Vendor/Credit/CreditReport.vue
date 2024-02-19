<template>
  <ion-page>
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
          :creditSummary="creditSummary?.credit_sales"
        ></CreditSummary>
        <section>
          <div
            class="d-flex ion-justify-content-between ion-align-items-center ion-padding-horizontal ion-margin-top"
          >
            <IonText color="dark" class="fw-semibold font-medium">
              Amount collected
            </IonText>
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
          <v-chart ref="chart" class="chart" :option="option" autoresize />
        </section>
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  filter,
  optionsOutline,
  createOutline,
  trashOutline,
  chevronDownOutline,
  add,
} from "ionicons/icons";
import { defineComponent, provide, ref } from "vue";
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
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";

import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import VChart, { THEME_KEY } from "vue-echarts";
import { getDateDifference } from "@/utilities";

use([
  PieChart,
  LegendComponent,
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

const date = new Date();

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      chevronDownOutline,
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
        period: "custom",
      },
      credits: [] as Credit[] | null,
      creditSummary: {} as any,
      showFilterSheet: false,
      event: null as any,
      openPopover: -1,
      option: {
        tooltip: {
          trigger: "item",
        },
        color: ["#4FE3A4", "#FEDA9A"],
        legend: {
          top: "center",
          left: "center",
          orient: "vertical",
          align: "left",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#000",
            fontFamily: 'Poppins',
            fontWeight: 400,
          },
        },
        series: [
          {
            name: "Credit Report",
            type: "pie",
            radius: ["50%", "75%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 100,
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              show: true,
              position: "center",
              formatter: function (dataSet: any) {
                if (dataSet.name == "Collected") {
                  return `{a| GHS ${dataSet.value}} \n {b| collected}`;
                }
                if (dataSet.name == "Pending") {
                  return `{a| GHS ${dataSet.value}} \n {b| owed you}`;
                }
              },
              rich: {
                a: {
                  color: "#000000",
                  lineHeight: 18,
                  align: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'Poppins'
                },
                b: {
                  color: "#6B7785",
                  lineHeight: 18,
                  align: "center",
                  fontSize: 10,
                  fontWeight: 400,
                  fontFamily: 'Poppins'
                },
              },
            },
            top: 0,
            left: 0,
            center: ["20%", "50%"],
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 0, name: "Collected" },
              { value: 0, name: "Pending" },
              // { value: 0, name: "Cancelled" },
            ],
          },
        ],
      },
      periods: [
        { label: "This Week", value: "thisweek" },
        { label: "Last Week", value: "lastweek" },
        { label: "This Month", value: "thismonth" },
        { label: "Last Month", value: "lastmonth" },
        { label: "This Year", value: "thisyear" },
        { label: "Last Year", value: "lastyear" },
        { label: "Custom", value: "custom" },
      ],
    };
  },

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonSelect,
    IonSelectOption,
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
    VChart,
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
    handleSalesSummaryFilter(period: string) {
      this.showFilterSheet = false;
      if (period == "custom") {
        this.showFilterSheet = true;
        this.searchFilters.period = period;
        return;
      }
      Object.assign(this.searchFilters, {
        start_dt: "",
        end_dt: "",
        period: this.searchFilters.period,
      });
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
        this.option.series[0].data[0].value = Number(
          this.creditSummary?.credit_sales?.collections?.collected
        ).toFixed(2) as any;
        this.option.series[0].data[1].value = Number(
          this.creditSummary?.credit_sales?.collections?.pending
        ).toFixed(2) as any;
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
.chart {
  height: 150px;
}
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

  h6 {
    font-weight: 500;
    font-size: 1em;
    margin: 0px;
  }

  a {
    padding: 3px 10px;
    color: #666eed;
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
