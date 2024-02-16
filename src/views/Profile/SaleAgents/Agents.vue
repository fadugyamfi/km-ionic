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
              defaultHref="/vendor/profile"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel>{{ $t("profile.agent.agents") }}</IonLabel>
              <ion-badge class="badge">{{ agents?.length }}</ion-badge>
            </section></IonTitle
          >
          <ion-buttons slot="end" v-if="segment !== 'request'">
            <ion-button
              v-if="agents?.length > 0"
              @click="searchEnabled = !searchEnabled"
              color="dark"
            >
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </ion-buttons>

          <ion-buttons slot="end" v-else>
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <IonToolbar>
        <IonSegment
          value="all"
          mode="ios"
          @ionChange="onSegmentChanged($event)"
        >
          <IonSegmentButton value="all">
            <IonLabel>{{ $t("profile.agent.allAgents") }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="request">
            <IonLabel>{{ $t("profile.agent.requests") }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="leaderboard">
            <IonLabel>{{ $t("profile.agent.leaderboard") }}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
      <IonToolbar v-if="searchEnabled">
        <IonSearchbar
          :placeholder="$t('Find agent by name') + '...'"
          class="search-input"
          @keyup.enter="onSearch($event)"
          @ion-change="onSearch($event)"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>
    <ion-content>
      <IonRefresher
        ref="refresher"
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent pullingIcon="crescent"></IonRefresherContent>
      </IonRefresher>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-show="!fetching">
        <AgentsList v-if="segment == 'all'" :agents="agents" />
        <AgentRequestList
          v-if="segment == 'request'"
          :agentRequests="agentRequests"
        />
        <LeaderBoard v-if="segment == 'leaderboard'" />
      </section>
      <FilterAgentRequestsSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onFilterUpdate($event)"
      >
      </FilterAgentRequestsSheet>
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
  onIonViewDidEnter,
} from "@ionic/vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
  arrowBackOutline,
  personAddOutline,
  search,
  optionsOutline,
} from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import Business from "@/models/Business";
import Agent from "@/models/Agent";
import AgentsList from "@/components/modules/agents/AgentsList.vue";
import AgentRequestList from "@/components/modules/agents/AgentRequestList.vue";
import LeaderBoard from "@/components/modules/agents/LeaderBoard.vue";
import FilterAgentRequestsSheet from "@/components/modules/agents/FilterAgentRequestsSheet.vue";
import AgentRequest from "@/models/AgentRequest";
import { useAgentsStore } from "@/stores/AgentsStore";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import { useRequestStore } from "@/stores/RequestStore";

const fetching = ref(false);
const refreshing = ref(false);
const searchEnabled = ref(false);
const agents = ref<Agent[]>([]);
const segment = ref("all");
const showFilterSheet = ref(false);
const agentRequests = ref<AgentRequest[] | null>([]);

const searchFilters = ref({
  start_dt: "",
  end_dt: "",
});

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchAgents();
  refreshing.value = false;
  event.target.complete();
};

const onSearch = async (event: Event) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchAgents({
    name_like: (event.target as HTMLIonSearchbarElement).value,
  });
  refreshing.value = false;
};
const onSegmentChanged = (event: CustomEvent) => {
  const option = event.detail.value;
  switch (option) {
    case "all":
      segment.value = option;
      fetchAgents();
      break;
    case "request":
      segment.value = option;
      fetchAgentRequests();
      break;
    case "leaderboard":
      segment.value = option;
      break;

    default:
      break;
  }
};
const fetchAgentRequests = async () => {
  try {
    fetching.value = true;

    const requestStore = useRequestStore();
    agentRequests.value = await requestStore.fetchAgentRequests(
      searchFilters.value
    );
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};
const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
  fetchAgentRequests();
};
const fetchAgents = async (options = {}) => {
  if (agents.value?.length == 0) {
    fetching.value = true;
  }
  const userStore = useUserStore();
  const agentsStore = useAgentsStore();

  agents.value = await agentsStore.getBusinessSaleAgents(
    userStore.activeBusiness as Business,
    100,
    options,
    refreshing.value
  );
  fetching.value = false;
};

onIonViewDidEnter(() => {
  onSegmentChanged(new CustomEvent("load", { detail: { value: "all" } }));
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
