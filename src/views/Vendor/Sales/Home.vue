<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonButton router-link="/vendor/home">
              <IonIcon :icon="arrowBackOutline" slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>

          <IonTitle size="small" class="fw-bold">Sales Report</IonTitle>
          <IonButtons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>

            <NotificationButton />
          </IonButtons>
        </IonToolbar>
      </ion-header>
    </IonHeader>

    <ion-content>
      <IonItem style="width: 100%" lines="none">
        <IonText color="dark" class="fw-semibold"> Sales </IonText>
        <IonSelect
          class="sale-filter"
          labelPlacement="stacked"
          fill="outline"
          required
          v-model="saleFilters.period"
          name="category"
          :toggle-icon="chevronDownOutline"
          @ion-change="handleFilter($event.detail.value)"
        >
          <ion-select-option value="thisweek">Week</ion-select-option>
          <ion-select-option value="thismonth">Month</ion-select-option>
          <ion-select-option value="thisyear">Year</ion-select-option>
          <ion-select-option value="custom">Custom</ion-select-option>
        </IonSelect>
        <IonButton
          slot="end"
          fill="clear"
          class="add-sale"
          @click="onAddSale()"
        >
          Add Sale
        </IonButton>
      </IonItem>

      <v-chart ref="chart" class="chart" :option="barOption" autoresize />
      <!-- 
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton @click="onAddSale()">
          <IonIcon :icon="add"></IonIcon>
        </IonFabButton>
      </IonFab> -->

      <section v-if="fetchingSummary" class="d-flex ion-justify-content-center">
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <section v-if="!fetchingSummary">
        <section v-if="showFilterSummary">
          <IonItem color="light" lines="none">
            <IonLabel color="dark" class="font-medium">
              Show Data From:
              {{ Filters.date(queryFilters["start_dt"] as string, "short") }} to
              {{ Filters.date(queryFilters["end_dt"] as string, "short") }}
            </IonLabel>
          </IonItem>
        </section>

        <IonGrid>
          <SalesStatistics
            :total-sales="businessStore.businessSummary?.total_sales_value"
            :avg-sales="businessStore.businessSummary?.average_sales_value"
          ></SalesStatistics>

          <IonRow>
            <IonCol>
              <IonCard class="ion-no-margin">
                <IonCardContent class="ion-no-padding">
                  <IonItem lines="none">
                    <ProfileAvatar
                      slot="start"
                      :image="userStore.activeBusiness?.logo"
                      :username="userStore.activeBusiness?.name"
                    ></ProfileAvatar>
                    <IonLabel>
                      <h6>
                        <IonText color="medium">Performance</IonText>
                      </h6>
                      <p>
                        <IonText color="dark" class="fw-semibold"
                          >You have met {{ percentageComplete }}% of your target
                        </IonText>
                      </p>
                    </IonLabel>
                  </IonItem>
                  <section class="ion-margin-horizontal ion-margin-bottom">
                    <IonProgressBar
                      :value="(percentageComplete as number) / 100"
                      color="warning"
                    ></IonProgressBar>
                  </section>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard
                class="ion-no-margin best-selling-card"
                @click="viewTopSellingProduct()"
              >
                <IonCardContent class="d-flex flex-column">
                  <IonText color="medium">Best Selling Item</IonText>
                  <IonText color="dark" class="fw-semibold line-clamp">
                    {{ topSellingProduct?.product_name }}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard
                class="ion-no-margin customers-card"
                router-link="/profile/company/customers"
              >
                <IonCardContent class="d-flex flex-column">
                  <IonText color="medium">No. of Customers</IonText>
                  <IonText color="dark" class="fw-semibold">
                    {{
                      Filters.number(
                        businessStore.businessSummary?.customer_count
                      )
                    }}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <section class="ion-margin-top">
          <IonLabel class="font-medium ion-margin-horizontal"
            >Conversion Rate From Orders To Sales</IonLabel
          >
          <IonCard>
            <IonCardContent
              class="d-flex ion-justify-content-between ion-align-items-center"
            >
              <section class="d-flex flex-column">
                <IonText>Number of Sales / Orders</IonText>
                <IonText color="dark" class="fw-bold font-large">
                  {{
                    businessStore.businessSummary?.orders
                      ?.converted_to_sales_count
                  }}
                  Sales /
                  {{ businessStore.businessSummary?.orders?.total_count }}
                  Orders
                </IonText>
              </section>

              <section>
                <IonChip color="success">
                  <IonIcon :icon="arrowUpOutline"></IonIcon>
                  <IonLabel
                    >{{ Filters.number(percentageOfConversion, 2) }}%</IonLabel
                  >
                </IonChip>
              </section>
            </IonCardContent>
          </IonCard>
        </section>
      </section>

      <section>
        <SaleSyncStatus></SaleSyncStatus>

        <IonList style="margin-bottom: 0px; padding-bottom: 0px">
          <IonListHeader>
            <IonLabel color="dark" class="fw-semibold">Sales History</IonLabel>
            <IonButton
              fill="clear"
              size="small"
              class="fw-semibold"
              color="primary"
              @click="onViewSales()"
            >
              View All
            </IonButton>
          </IonListHeader>
        </IonList>

        <section
          v-if="fetchingHistory"
          class="d-flex ion-justify-content-center"
        >
          <IonSpinner name="crescent"></IonSpinner>
        </section>

        <SalesList
          v-else
          :sales="recentSales"
          style="padding-top: 0px"
        ></SalesList>
      </section>

      <FilterSalesSheet
        :is-open="showFilterSheet"
        title="Filter Report"
        :filter-by-sale-type="false"
        @update="updateFilterOptions($event)"
      ></FilterSalesSheet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardHeader,
  IonText,
  IonList,
  IonListHeader,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCardContent,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonChip,
  IonItem,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import ShopperHeader from "@/components/layout/ShopperHeader.vue";
import { defineComponent } from "vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
import SalesList from "@/components/modules/sales/SalesList.vue";
import { Sale } from "@/models/Sale";
import {
  add,
  arrowUpOutline,
  optionsOutline,
  close,
  arrowBackOutline,
  chevronDownOutline,
} from "ionicons/icons";
import Filters from "@/utilities/Filters";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useUserStore } from "@/stores/UserStore";
import Business from "@/models/Business";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import FilterSalesSheet from "@/components/modules/sales/FilterSalesSheet.vue";
import SalesStatistics from "@/components/modules/SalesStatistics.vue";
import SaleSyncStatus from "../../../components/modules/sales/SaleSyncStatus.vue";
import { provide, ref } from "vue";
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

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    ShopperHeader,
    IonCard,
    IonCardHeader,
    IonText,
    IonList,
    IonListHeader,
    IonLabel,
    SalesList,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCardContent,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonChip,
    IonItem,
    ProfileAvatar,
    IonProgressBar,
    NotificationButton,
    FilterSalesSheet,
    SalesStatistics,
    SaleSyncStatus,
    VChart,
    IonSelect,
    IonSelectOption,
  },

  data() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    return {
      add,
      optionsOutline,
      arrowUpOutline,
      arrowBackOutline,
      chevronDownOutline,
      close,
      showFilterSheet: false,
      showFilterSummary: false,
      Filters,
      saleFilters: {
        period: "thisweek",
        // groupby: "week",
        // start_dt: Filters.date(startDate.toISOString(), "input"),
        // end_dt: Filters.date(new Date().toISOString(), "input"),
      },
      recentSales: [] as Sale[],
      fetchingSummary: false,
      fetchingHistory: false,
      topProducts: [],
      queryFilters: {} as { [key: string]: any },

      barOption: {
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
          data: [],
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#74787c",
            fontSize: 11,
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
            data: [],
            itemStyle: {
              borderRadius: [2, 2, 2, 2],
              opacity: 0.4,
              color: "#036",
            },
          },
        ],
      } as any,
    };
  },

  computed: {
    ...mapStores(useSaleStore, useBusinessStore, useUserStore),

    percentageOfConversion() {
      const orders = this.businessStore.businessSummary?.orders;
      return (orders?.converted_to_sales_count / orders?.total_count) * 100;
    },

    percentageComplete() {
      return this.businessStore.businessSummary?.targets?.percentage_complete;
    },

    topSellingProduct(): any | null {
      return this.topProducts ? this.topProducts[0] : null;
    },
  },

  methods: {
    async fetchSalesSummary() {
      const summary = await this.saleStore.fetchSalesSummary({
        ...this.saleFilters,
      });
      if (summary) {
        const days = summary.map((s: any) => s.short_dayname);
        const weeks = summary.map((s: any) => `Week ${s.week_of_month}`);
        const months = summary.map((s: any) => s.short_monthname);
        const totalSales = summary.map((s: any) => s.total);
        switch (this.saleFilters.period) {
          case "thisweek":
            this.barOption.xAxis.data = days;
            break;
          case "thismonth":
            this.barOption.xAxis.data = weeks;
            break;
          case "thisyear":
            this.barOption.xAxis.data = months;
            break;
          // case "custom":
        }
        this.barOption.series[0].data = totalSales;
      }
    },
    handleFilter(period: string) {
      if (period == "custom") {
        this.showFilterSheet = true;
        this.saleFilters.period = period;
        return;
      }
      this.saleFilters.period = period;
      this.fetchSalesSummary();
    },

    onAddSale() {
      this.saleStore.resetForNewSale();
      this.$router.push("/vendor/sales/add-sale/select-agent");
    },

    onViewSales() {
      this.$router.push("/vendor/sales/history");
    },

    async fetchRecentSales() {
      this.fetchingHistory = true;
      this.recentSales = await this.saleStore.fetchSales({
        limit: 5,
        sort: "latest",
        ...this.queryFilters,
      });
      this.fetchingHistory = false;
    },

    async fetchBusinessSummary() {
      this.fetchingSummary = true;
      await this.businessStore.getBusinessSummary(
        this.userStore.activeBusiness as Business,
        { ...this.queryFilters }
      );
      this.topProducts = await this.businessStore.getTopSellingProducts(
        this.userStore.activeBusiness as Business,
        { limit: 2, ...this.queryFilters }
      );
      this.fetchingSummary = false;
    },

    viewTopSellingProduct() {
      if (!this.topSellingProduct) return;

      this.$router.push(
        `/vendor/sales/products/${this.topSellingProduct.products_id}`
      );
    },

    updateFilterOptions(filters: object) {
      this.showFilterSummary = true;
      this.queryFilters = { ...filters };
      this.saleFilters = { ...this.saleFilters, ...filters, period: "custom" };
      this.fetchSalesSummary();
      this.fetchBusinessSummary();
      this.fetchRecentSales();
      this.showFilterSheet = false;
    },
  },

  mounted() {
    this.fetchRecentSales();
    this.fetchBusinessSummary();
    this.fetchSalesSummary();

    setTimeout(() => {
      this.saleStore.loadCachedRecordedSales();
      this.saleStore.fetchInventory();
    }, 200);
  },
});
</script>

<style lang="scss" scoped>
.chart {
  height: 165px;
  margin-bottom: 10px;
}
.customers-card {
  --background: #f2f7f7;
}

.best-selling-card {
  --background: #fff2ebcc;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.add-sale {
  text-transform: none;
  font-weight: 400;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --color: #666eed;
  font-size: 14px;
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
  max-width: 89px;
  margin-left: 10px;
}
</style>
