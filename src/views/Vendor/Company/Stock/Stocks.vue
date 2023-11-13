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
          <IonTitle size="small" class="fw-bold">Stock</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="dark"
              @click="router.push(`/profile/company/stocks/add-stock`)"
            >
              <IonIcon :icon="bagAddOutline"></IonIcon>
            </IonButton>
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </ion-toolbar>
      </ion-header>
      <IonToolbar>
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          @keyup.enter="onSearch($event)"
          @ion-change="onSearch($event)"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>
    <ion-content class="ion-padding-horizontal">
      <StockChips @filter="onFilterCategory($event)" />
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-if="!fetching" class="ion-margin-top">
        <Summary :total-items="meta.total" />
        <AvailableStock :stocks="stocks" />
        <EmptyStock v-if="stocks?.length == 0"></EmptyStock>
      </section>
    </ion-content>
    <FilterStockSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
      @update="onFilterUpdate($event)"
    ></FilterStockSheet>
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
  IonIcon,
  IonItem,
  IonSearchbar,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import {
  arrowBackOutline,
  personAddOutline,
  search,
  optionsOutline,
  bagAddOutline,
} from "ionicons/icons";
import EmptyStock from "@/components/modules/stock/EmptyStock.vue";
import StockChips from "@/components/modules/stock/StockChips.vue";
import FilterStockSheet from "@/components/modules/stock/FilterStockSheet.vue";
import Summary from "@/components/modules/stock/Summary.vue";
import { formatMySQLDateTime } from "@/utilities";
import { useRouter } from "vue-router";
import AvailableStock from "./AvailableStock.vue";
import { useStockStore } from "@/stores/StockStore";
import { handleAxiosRequestError } from "@/utilities";
import Stock from "@/models/Stock";

const fetching = ref(false);
const refreshing = ref(false);
const showFilterSheet = ref(false);
const router = useRouter();
const stockStore = useStockStore();

const stocks = ref<Stock[]>();

const searchFilters = ref({
  start_dt: "",
  end_dt: "",
  product_categories_id: null as number | null,
});

const meta = computed(() => stockStore.meta);

// const handleRefresh = async (event: RefresherCustomEvent) => {
//   refreshing.value = true;
//   fetching.value = true;
//   await fetchCustomers();
//   refreshing.value = false;
//   event.target.complete();
// };

const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
  fetchStocks();
};
const onFilterCategory = (event: number) => {
  searchFilters.value.product_categories_id = event;
  fetchStocks();
};
const fetchStocks = async () => {
  try {
    fetching.value = true;
    stocks.value = await stockStore.fetchStocks(searchFilters.value);
  } catch (error) {
    console.log(error);
  } finally {
    fetching.value = false;
  }
};
const fetchSearchedStocks = async () => {
  fetching.value = true;
  try {
    stocks.value = await stockStore.fetchSearchedStocks();
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};

const onSearch = (event: any) => {
  stockStore.searchTerm = event.target?.value;
  stocks.value = [];
  fetchSearchedStocks();
};

onMounted(() => {
  // onSegmentChanged(new CustomEvent("load", { detail: { value: "pastmonth" } }));
  fetchStocks();
});
</script>

<style lang="scss" scoped>
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
ion-searhbar.custom {
  width: 100%;
}
</style>
