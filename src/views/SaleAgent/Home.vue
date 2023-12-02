<template>
  <ion-page>

    <AgentHeader></AgentHeader>

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
    <ion-content>
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
        ></BestSellingItems>
      </IonGrid>
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
  IonSpinner,
  IonLabel,
  IonSegmentButton,
  IonSegment,
IonGrid,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { formatMySQLDateTime } from "@/utilities";
import Business from "@/models/Business";
import Agent from "@/models/Agent";
import { useRoute } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";
import SalesStatistics from "@/components/modules/SalesStatistics.vue";
import Performance from "@/components/modules/Performance.vue";
import BestSellingItems from "@/components/modules/BestSellingItems.vue";
import FilterAgentSaleReportSheet from "@/components/modules/agents/FilterAgentSaleReportSheet.vue";
import AgentHeader from '@/components/layout/AgentHeader.vue';

const fetching = ref(false);
const route = useRoute();

const showFilterSheet = ref(false);
const agent = ref<Agent | null>();
const searchFilters = ref({
  start_dt: "",
  end_dt: "",
});

const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
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

onMounted(() => {
  onSegmentChanged(new CustomEvent("load", { detail: { value: "thisweek" } }));
});
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
</style>
