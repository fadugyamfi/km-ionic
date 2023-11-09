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
          <IonTitle size="small" class="fw-bold">Stock</IonTitle>
          <IonButtons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>
          </IonButtons>
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
      <Summary/>
      <IonSearchbar
        class="search-input"
        placeholder="Search..."
        @keyup.enter="onSearch($event)"
        @ion-change="onSearch($event)"
      ></IonSearchbar>
      <StockChips />
      <AvailableStock />
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
} from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import EmptyStock from "@/components/modules/stock/EmptyStock.vue";
import StockChips from "@/components/modules/stock/StockChips.vue";
import FilterStockSheet from "@/components/modules/stock/FilterStockSheet.vue";
import Summary from "@/components/modules/stock/Summary.vue";
import { formatMySQLDateTime } from "@/utilities";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/CustomerStore";
import AvailableStock from "./AvailableStock.vue";

const fetching = ref(false);
const refreshing = ref(false);
const showFilterSheet = ref(false);
const router = useRouter();

const searchFilters = ref({
  start_dt: "",
  end_dt: "",
});

// const handleRefresh = async (event: RefresherCustomEvent) => {
//   refreshing.value = true;
//   fetching.value = true;
//   await fetchCustomers();
//   refreshing.value = false;
//   event.target.complete();
// };

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
const onFilterUpdate = (event: { start_dt: string; end_dt: string }) => {
  searchFilters.value.start_dt = event.start_dt;
  searchFilters.value.end_dt =
    event.end_dt || formatMySQLDateTime(new Date().toISOString());
  // this.fetchSales();
};
// const fetchSales = () => {
//             try {
//                 this.fetching = true;
//                 await this.saleStore.fetchSales(this.searchFilters);
//             } catch(error) {
//                 console.log(error);
//             } finally {
//                 this.fetching = false;
//             }
//         },
// const onSearch = async (event: Event) => {
//   refreshing.value = true;
//   fetching.value = true;
//   await fetchCustomers({
//     name_like: (event.target as HTMLIonSearchbarElement).value,
//   });
//   refreshing.value = false;
// };

onMounted(() => {
  onSegmentChanged(new CustomEvent("load", { detail: { value: "pastmonth" } }));
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
