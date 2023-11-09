<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header ion-margin-bottom">
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
            <section class="ion-align-items-center ion-justify-content-center">
              <IonLabel>
                <!-- {{ $t("profile.customers.customers") }} -->
                Stock
              </IonLabel>
            </section></IonTitle
          >
        </ion-toolbar>
      </ion-header>
      <IonSegment
        value="pastmonth"
        mode="ios"
        @ionChange="onSegmentChanged($event)"
        ><IonSegmentButton value="pastmonth">
          <IonLabel>{{ $t("general.pastMonth") }}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="thisweek">
          <IonLabel>{{ $t("general.thisWeek") }}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="today">
          <IonLabel>
            {{ $t("general.today") }}
          </IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonHeader>
    <ion-content class="ion-padding-horizontal">
      <!-- <EmptyStock></EmptyStock> -->
      <Summary></Summary>
      <Filters />
      <AvailableStock />
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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  RefresherCustomEvent,
  IonLabel,
  InfiniteScrollCustomEvent,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import EmptyStock from "@/components/modules/stock/EmptyStock.vue";
import Filters from "@/components/modules/stock/Filters.vue";
import Summary from "@/components/modules/stock/Summary.vue";
import { formatMySQLDateTime } from "@/utilities";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/CustomerStore";
import AvailableStock from "./AvailableStock.vue";

const fetching = ref(false);
const refreshing = ref(false);
const currentPage = ref(1);
const router = useRouter();

const viewing = ref();
const searchFilters = ref({
  start_dt: "",
  end_dt: "",
});

const searchEnabled = ref(false);

const customers = ref<any[]>([]);
const paginatedCustomers = ref<Business[]>([]);

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchCustomers();
  refreshing.value = false;
  event.target.complete();
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

  // this.fetchSales();
};

const onSearch = async (event: Event) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchCustomers({
    name_like: (event.target as HTMLIonSearchbarElement).value,
  });
  refreshing.value = false;
};

const addStock = () => {
  router.push("/profile/company/stocks/add-stock");
};

const ionInfinite = async (ev: InfiniteScrollCustomEvent) => {
  await fetchCustomers();
  ev.target.complete();
};

const fetchCustomers = async (options = {}) => {
  if (customers.value?.length == 0) {
    fetching.value = true;
  }
  const userStore = useUserStore();
  const customerStore = useCustomerStore();

  customers.value = await customerStore.getBusinessCustomers(
    userStore.activeBusiness as Business,
    100,
    options,
    refreshing.value
  );

  fetching.value = false;
};

onMounted(() => {
  fetchCustomers();
  onSegmentChanged(new CustomEvent("load", { detail: { value: "pastmonth" } }));
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
