<template>
  <section>
    <v-chart ref="chart" class="chart" :option="barOption" autoresize />
  </section>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import { useSaleStore } from "@/stores/SaleStore";
import { mapStores } from "pinia";
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
import axios from "axios";
import { useUserStore } from "@/stores/UserStore";

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
  props: {
    queryFilters: {
      type: Object,
      required: true,
    },
    salesType: {
      type: String,
      default: 'vendor',
    },
  },
  components: {
    VChart,
  },

  data() {
    return {
      filters: {
        start_dt: "",
        end_dt: "",
        period: "thisweek",
      },
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
    ...mapStores(useSaleStore, useUserStore),
  },
  mounted() {
    this.fetchSalesSummary();
  },
  methods: {
    getTotalYearSales(summary: any[]) {
      let totalSales = [] as any[];

      for (const sale of summary) {
        if (totalSales.some((item: any) => item.year === sale.year)) {
          totalSales.find((item: any) => item.year === sale.year).total =
            Number(
              totalSales.find((item: any) => item.year === sale.year).total
            ) + Number(sale.total);
        } else {
          totalSales.push(sale);
        }
      }
      const totalSalesValues = totalSales.map((sale) => sale.total);
      return totalSalesValues;
    },

    removeDuplicates(duplicates: any[]) {
      return duplicates.filter(
        (item, index) => duplicates.indexOf(item) === index
      );
    },
    async fetchSalesSummary() {
      Object.assign(this.filters, this.queryFilters);
      try {
        const params = {
          businesses_id: this.salesType == 'vendor' ? this.userStore.activeBusiness?.id : null,
          cms_users_id: this.salesType == 'agent' ? this.userStore.user?.id : null,
          ...this.filters,
        };
        const response = await axios.get("v2/sales/summary", { params });
        // const summary = await this.saleStore.fetchSalesSummary({
        //   ...this.queryFilters,
        // });
        if (response) {
          const summary = response.data.data;
          const days = summary.map((s: any) => s.dayname);
          const weeks = summary.map((s: any) => `Week ${s.week_of_month}`);
          const months = summary.map((s: any) => s.monthname);
          const years = summary.map((s: any) => s.year);
          const totalSales = summary.map((s: any) => s.total);

          const difference = getDateDifference(
            this.filters.start_dt,
            this.filters.end_dt
          );

          switch (this.filters.period) {
            case "thisweek":
            case "lastweek":
              this.barOption.xAxis.data = days;
              this.barOption.series[0].data = totalSales;
              break;
            case "thismonth":
            case "lastmonth":
              this.barOption.xAxis.data = weeks;
              this.barOption.series[0].data = totalSales;
              break;
            case "thisyear":
            case "lastyear":
              this.barOption.xAxis.data = months;
              this.barOption.series[0].data = totalSales;
              break;
            case "custom":
              switch (true) {
                case difference <= 14:
                  this.barOption.xAxis.data = days;
                  this.barOption.series[0].data = totalSales;
                  break;
                case difference > 14 && difference < 32:
                  this.barOption.xAxis.data = weeks;
                  this.barOption.series[0].data = totalSales;
                  break;
                case difference > 31 && difference <= 365:
                  this.barOption.xAxis.data = months;
                  this.barOption.series[0].data = totalSales;
                  break;
                case difference > 365:
                  this.barOption.xAxis.data = this.removeDuplicates(years);
                  this.barOption.series[0].data =
                    this.getTotalYearSales(summary);
                  break;
              }
          }
        }
      } catch (error) {
      } finally {
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.chart {
  height: 180px;
  margin-bottom: 10px;
}
</style>
