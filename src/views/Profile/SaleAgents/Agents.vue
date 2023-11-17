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
              <IonLabel>{{ $t("Agents") }}</IonLabel>
              <ion-badge class="badge">{{ agents?.length }}</ion-badge>
            </section></IonTitle
          >
          <ion-buttons slot="end">
            <!-- <IonButton color="dark" @click="addCustomer()">
              <IonIcon :icon="personAddOutline" color="dark"></IonIcon>
            </IonButton> -->
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
            <IonLabel> All agents </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="request">
            <IonLabel>Requests</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="leaderboard">
            <IonLabel>Leaderboard</IonLabel>
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
        <AgentsList :agents="agents" />
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
import User from "@/models/User";
import AgentsList from "@/components/modules/agents/AgentsList.vue";
import { useRouter } from "vue-router";
import { useAgentsStore } from "@/stores/AgentsStore";

const fetching = ref(false);
const refreshing = ref(false);
const router = useRouter();
const searchEnabled = ref(false);
const agents = ref<User[]>([]);

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
  let start_dt = new Date();
  let end_dt = new Date();
  const option = event.detail.value;

  switch (option) {
    case "all":
      start_dt.setMonth(start_dt.getMonth() - 1);
      break;

    case "request":
      start_dt.setDate(start_dt.getDate() - 1);
      break;

    case "leaderboard":
      start_dt.setDate(start_dt.getDate() - 7);
      break;
  }

  //   this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
  //   this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

  //   this.fetchOrders();
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
  //   this.onSegmentChanged(new CustomEvent('load', { detail: { value: 'thisweek' } }));
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
