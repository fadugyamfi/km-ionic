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
          <ion-buttons slot="end">
            <ion-button
              v-if="agents?.length > 0"
              @click="searchEnabled = !searchEnabled"
              color="dark"
            >
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
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
          <IonSegmentButton disabled value="request">
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
        <LeaderBoard v-if="segment == 'leaderboard'" />
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
import Business from "@/models/Business";
import Agent from "@/models/Agent";
import AgentsList from "@/components/modules/agents/AgentsList.vue";
import LeaderBoard from "@/components/modules/agents/LeaderBoard.vue";
import { useRouter } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";

const fetching = ref(false);
const refreshing = ref(false);
const router = useRouter();
const searchEnabled = ref(false);
const agents = ref<Agent[]>([]);
const segment = ref("all");

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
  segment.value = event.detail.value;
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

onMounted(() => {
  fetchAgents();
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
