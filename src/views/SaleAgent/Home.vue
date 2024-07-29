<template>
  <ion-page>
    <AgentHeader @openFilterSheet="showFilterSheet = true"></AgentHeader>

    <IonHeader class="ion-padding-horizontal ion-no-border">
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
    <ion-content
      ><IonItem
        lines="none"
        class="profile-item ion-margin-top"
        style="margin: 0px 12px"
      >
        <section class="d-flex ion-align-items-center" style="gap: 10px;">
          <IonText style="font-size: 14px;">Team: </IonText>
          <ProfileAvatar
            :image="userStore.activeBusiness?.logo"
            :username="userStore.activeBusiness?.name"
            customSize="32px"
          ></ProfileAvatar>
        </section>
        <IonLabel>{{ userStore.activeBusiness?.name }}</IonLabel>
        <IonButton
          slot="end"
          fill="clear"
          size="small"
          class="fw-semibold ion-text-capitalize"
          color="primary"
          @click="showSwitchTeamSheet = true"
        >
          Switch
        </IonButton>
      </IonItem>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <IonGrid v-if="!fetching">
        <SalesStatistics
          :total-sales="agent?.total_sales"
          :avg-sales="agent?.avg_sales"
        ></SalesStatistics>
        <Performance :agent="agent"></Performance>
        <BestSellingItems
          :top-selling-product="agent?.top_selling_product"
          :total-customers="agent?.total_customers"
        >
        </BestSellingItems>
      </IonGrid>
      <section v-if="!fetching">
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
        <BarChart :queryFilters="searchFilters"></BarChart>
      </section>
      <section>
        <IonList style="margin-bottom: 0px; padding-bottom: 0px">
          <IonListHeader>
            <IonLabel color="dark" class="fw-semibold">Sales History</IonLabel>
            <IonButton
              fill="clear"
              size="small"
              class="fw-semibold ion-text-capitalize"
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
        <section v-else>
          <NoRecordCard
            title="No sale history available"
            description="Record a sale to see history here"
            v-if="recentSales?.length == 0"
          ></NoRecordCard>
          <SalesList :sales="recentSales" style="padding-top: 0px"></SalesList>
        </section>
      </section>
      <section>
        <IonList style="margin-bottom: 0px; padding-bottom: 0px">
          <IonListHeader>
            <IonLabel color="dark" class="fw-semibold">{{
              $t("general.leaderboard")
            }}</IonLabel>
            <IonButton
              fill="clear"
              size="small"
              class="fw-semibold ion-text-capitalize"
              color="primary"
              router-link="/agent/leaderboard"
            >
              View More
            </IonButton>
          </IonListHeader>
        </IonList>
        <section v-if="fetching" class="d-flex ion-justify-content-center">
          <IonSpinner name="crescent"></IonSpinner>
        </section>

        <section v-else>
          <NoRecordCard
            title="No sale history available"
            description="Record a sale to show up on leaderboard"
            v-if="topThree?.length == 0"
          ></NoRecordCard>
          <TopLeaders :top-three="topThree" v-if="topThree?.length !== 0" />
        </section>
      </section>
    </ion-content>

    <FilterAgentSaleReportSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
      @update="onFilterUpdate($event)"
    ></FilterAgentSaleReportSheet>
    <SwitchBusinessSheet
      :isOpen="showSwitchTeamSheet"
      @didDismiss="showSwitchTeamSheet = false"
    >
    </SwitchBusinessSheet>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSpinner,
  IonLabel,
  IonSegmentButton,
  IonSegment,
  IonGrid,
  IonList,
  IonListHeader,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
  onIonViewDidEnter,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { formatMySQLDateTime } from "@/utilities";
import { useRoute, useRouter } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";
import { useSaleStore } from "../../stores/SaleStore";
import { Sale } from "../../models/Sale";
import { chevronDownOutline, swapHorizontalOutline } from "ionicons/icons";
import Agent from "@/models/Agent";
import AgentHeader from "@/components/layout/AgentHeader.vue";
import BestSellingItems from "@/components/modules/BestSellingItems.vue";
import Business from "@/models/Business";
import FilterAgentSaleReportSheet from "@/components/modules/agents/FilterAgentSaleReportSheet.vue";
import Performance from "@/components/modules/Performance.vue";
import SalesStatistics from "@/components/modules/SalesStatistics.vue";
import SalesList from "@/components/modules/sales/SalesList.vue";
import BarChart from "@/components/charts/BarChart.vue";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import TopLeaders from "@/components/modules/agents/TopLeaders.vue";
import NoRecordCard from "@/components/cards/NoRecordCard.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import SwitchBusinessSheet from "@/components/modules/SwitchBusinessSheet.vue";

const fetching = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const recentSales = ref([] as Sale[]);
const fetchingHistory = ref(false);
const topPerformingAgents = ref<TopPerformingAgent[]>([]);
const topThree = ref<TopPerformingAgent[]>([]);

const showFilterSheet = ref(false);
const showSwitchTeamSheet = ref(false);
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

  fetchAgent();
  fetchRecentSales();
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
      break;

    case "today":
      start_dt.setDate(start_dt.getDate() - 1);
      break;

    case "thisweek":
      start_dt.setDate(start_dt.getDate() - 7);
      break;
  }

  searchFilters.value.start_dt = formatMySQLDateTime(start_dt.toISOString());
  searchFilters.value.end_dt = formatMySQLDateTime(end_dt.toISOString());

  fetchAgent();
  fetchTopPerformingAgents();
};

const fetchAgent = async (options = {}) => {
  fetching.value = true;
  const userStore = useUserStore();
  const agentsStore = useAgentsStore();

  agent.value = await agentsStore.getAgent(
    userStore.activeBusiness as Business,
    userStore.user?.id,
    searchFilters.value
  );
  fetching.value = false;
};
const fetchTopPerformingAgents = async () => {
  const agentsStore = useAgentsStore();
  const userStore = useUserStore();

  fetching.value = true;
  topPerformingAgents.value = await agentsStore.fetchTopPerformingAgents(
    userStore.activeBusiness as Business,
    10,
    searchFilters.value
  );
  topThree.value = [...topPerformingAgents.value].splice(0, 3);
  // remaining.value = this.topPerformingAgents.slice(3);
  fetching.value = false;
};

onMounted(() => {
  onSegmentChanged(new CustomEvent("load", { detail: { value: "thisweek" } }));
  fetchRecentSales();
});

onIonViewDidEnter(() => {
  const saleStore = useSaleStore();
  setTimeout(() => saleStore.fetchInventory(), 200);
});

const onViewSales = () => {
  router.push("/agent/sales");
};

const fetchRecentSales = async () => {
  const userStore = useUserStore();
  const saleStore = useSaleStore();

  fetchingHistory.value = true;
  recentSales.value = await saleStore.fetchSales({
    businesses_id: null, // override internal values
    cms_users_id: userStore.user?.id,
    limit: 5,
    sort: "latest",
    ...searchFilters.value,
  });
  fetchingHistory.value = false;
};
</script>

<style lang="scss" scoped>
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
