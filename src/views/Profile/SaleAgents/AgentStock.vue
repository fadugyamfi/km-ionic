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
              defaultHref="/agent/profile"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">{{
            $t("profile.stock.myStock")
          }}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="dark"
              @click="
                router.push(`/agent/request/place-request/select-products`)
              "
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
        <Summary
          :total-value="stockSummary?.total_value"
          :total-items="meta?.total"
        />
        <MyAvailableStock :stocks="stocks" />
        <EmptyStock
          description="Looks like your stock is currently empty. Start by adding new requests"
          :showButton="false"
          v-if="stocks?.length == 0"
        ></EmptyStock>
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
  onIonViewDidEnter,
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
import MyAvailableStock from "@/components/modules/stock/MyAvailableStock.vue";
import { useStockStore } from "@/stores/StockStore";
import { handleAxiosRequestError } from "@/utilities";
import Stock from "@/models/Stock";
import { useUserStore } from "@/stores/UserStore";

const fetching = ref(false);
const refreshing = ref(false);
const showFilterSheet = ref(false);
const router = useRouter();
const stockStore = useStockStore();
const userStore = useUserStore();

const stocks = ref<Stock[]>();

const searchFilters = ref({
  start_dt: null as string | null,
  end_dt: null as string | null,
  product_categories_id: null as number | null,
});

const meta = computed(() => stockStore.meta);
const stockSummary = computed(() => stockStore.stockSummary);

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
    stocks.value = await stockStore.fetchStocks(
      searchFilters.value,
      `/v2/users/${userStore.user?.id}/products`
    );
  } catch (error) {
    console.log(error);
  } finally {
    fetching.value = false;
  }
};
const fetchSearchedStocks = async () => {
  fetching.value = true;
  try {
    stocks.value = await stockStore.fetchSearchedStocks(
      1,
      50,
      `/v2/users/${userStore.user?.id}/products`
    );
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

onIonViewDidEnter(() => {
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
