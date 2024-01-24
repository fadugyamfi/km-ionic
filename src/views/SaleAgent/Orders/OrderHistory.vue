<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/agent/home"></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">Order History</IonTitle>
          <ion-buttons slot="end">
            <IonButton @click="showFilterSheet = true" color="dark">
              <IonIcon :icon="optionsOutline"></IonIcon>
            </IonButton>

            <NotificationButton />
          </ion-buttons>
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
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton @click="onRaiseOrder()">
          <IonIcon :icon="add"></IonIcon>
        </IonFabButton>
      </IonFab>

      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-show="!fetching">
        <NoResults v-if="orderStore.orders?.length == 0"></NoResults>

        <ReceivedOrderList :orders="orderStore.orders"></ReceivedOrderList>
      </section>

      <FilterOrdersSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
        @update="onFilterUpdate($event)"
      >
      </FilterOrdersSheet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonBadge,
  IonTitle,
  IonButton,
  IonIcon,
  IonSpinner,
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { defineComponent, ref } from "vue";
import { useOrderStore } from "@/stores/OrderStore";
import ReceivedOrderList from "@/components/modules/order/ReceivedOrderList.vue";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  filter,
  optionsOutline,
  add,
} from "ionicons/icons";
import { mapStores } from "pinia";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import filters from "@/utilities/Filters";
import FilterOrdersSheet from "@/components/modules/order/FilterOrdersSheet.vue";
import NoResults from "@/components/layout/NoResults.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      filter,
      optionsOutline,
      add,
      fetching: false,
      filters,
      showFilterSheet: false,
      searchFilters: {
        start_dt: "",
        end_dt: "",
        customer_id: null,
        cms_users_id: null as number | undefined | null,
      },
    };
  },

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonBadge,
    IonTitle,
    ReceivedOrderList,
    NotificationButton,
    IonButton,
    IonIcon,
    FilterOrdersSheet,
    NoResults,
    IonSpinner,
    IonFab,
    IonFabButton,
  },

  computed: {
    ...mapStores(useOrderStore, useUserStore),
  },

  methods: {
    async fetchOrders() {
      try {
        this.fetching = true;
        this.searchFilters.cms_users_id = this.userStore.user?.id;
        await this.orderStore.fetchPlacedOrders(this.searchFilters);
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    onSegmentChanged(event: CustomEvent) {
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

      this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
      this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

      this.fetchOrders();
    },

    onFilterUpdate(event: { start_dt: string; end_dt: string }) {
      this.searchFilters.start_dt = event.start_dt;
      this.searchFilters.end_dt =
        event.end_dt || formatMySQLDateTime(new Date().toISOString());
      this.fetchOrders();
    },

    onRaiseOrder() {
      this.orderStore.resetForNewOrder();
      this.$router.push("/agent/orders/place-order/select-customer");
    },
  },

  mounted() {
    this.onSegmentChanged(
      new CustomEvent("load", { detail: { value: "thisweek" } })
    );
  },
});
</script>

<style scoped>
.ion-content {
  --align-items: center;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
  --text-align: justify;
  --white-space: normal;
  --border-radius: 10px;
}

.ion-segment-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
}

/* ion-segment-button ion-label {
    font-size: 16px;
    --align-items: center;
    text-align: center;
    overflow: inherit;
    text-overflow: inherit;
  } */
</style>
