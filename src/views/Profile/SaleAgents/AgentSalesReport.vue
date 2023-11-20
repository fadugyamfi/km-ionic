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
              <IonLabel>{{ $t("Agent sales report") }}</IonLabel>
            </section></IonTitle
          >
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
      </section>
    </ion-content>
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
  IonSegment,
} from "@ionic/vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { formatMySQLDateTime } from "@/utilities";
import Business from "@/models/Business";
import User from "@/models/User";
import { useRouter, useRoute } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";
import SalesStatistics from "../../../components/modules/agents/SalesStatistics.vue";
import Performance from "../../../components/modules/agents/Performance.vue";
import BestSellingItems from "../../../components/modules/agents/BestSellingItems.vue";

const fetching = ref(false);
const route = useRoute();

const agent = ref<any>();
const searchFilters = ref({
  start_dt: "",
  end_dt: "",
});

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
  const agentId = route.params.id;

  agent.value = await agentsStore.getAgent(
    userStore.activeBusiness as Business,
    agentId,
    searchFilters.value
  );
  fetching.value = false;
};

onMounted(() => {
  fetchAgent();
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
