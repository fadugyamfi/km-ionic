<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/shopper/home"></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">{{ $t('profile.accountActivity.accountActivitys') }}</IonTitle>
        </ion-toolbar>
      </ion-header>

      <IonToolbar>
        <IonSegment value="month" mode="ios" @ionChange="onSegmentChanged($event)">
          <IonSegmentButton value="today">
            <IonLabel>
              {{ $t('general.today') }}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="month">
            <IonLabel>{{ $t('general.month') }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="year">
            <IonLabel>{{ $t('general.year') }}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
    <ion-content>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-show="!fetching">
        <NoResults v-if="orderStore.orders?.length == 0"></NoResults>

        <!-- <AccountActivity></AccountActivity> -->
      </section>

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
  IonSpinner
} from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import { defineComponent, ref } from 'vue';
import { useOrderStore } from '@/stores/OrderStore';
import PlacedOrderList from '@/components/modules/order/PlacedOrderList.vue';
import { search, arrowBack, ellipsisHorizontal, filter, optionsOutline, add } from 'ionicons/icons';
import { mapStores } from 'pinia';
import { formatMySQLDateTime, handleAxiosRequestError } from '@/utilities';
import filters from '@/utilities/Filters';
import FilterOrdersSheet from '@/components/modules/order/FilterOrdersSheet.vue';
import NoResults from '@/components/layout/NoResults.vue';

export default defineComponent({

  data() {
    return {
      search, arrowBack, ellipsisHorizontal, filter, optionsOutline, add,
      fetching: false,
      filters,
      showFilterSheet: false,
      searchFilters: {
        start_dt: '',
        end_dt: ''
      }
    }
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
    PlacedOrderList,
    NotificationButton,
    IonButton,
    IonIcon,
    FilterOrdersSheet,
    NoResults,
    IonSpinner
  },

  computed: {
    ...mapStores(useOrderStore)
  },

  methods: {
    async fetchAccountActivities() {
      try {
        this.fetching = true;
        await this.orderStore.fetchPlacedOrders(this.searchFilters);
      } catch (error) {
        handleAxiosRequestError(error)
      } finally {
        this.fetching = false;
      }
    },
    async fetchOrders() {
      try {
        this.fetching = true;
        await this.orderStore.fetchPlacedOrders(this.searchFilters);
      } catch (error) {
        handleAxiosRequestError(error)
      } finally {
        this.fetching = false;
      }
    },

    onSegmentChanged(event: CustomEvent) {
      let start_dt = new Date();
      let end_dt = new Date();
      const option = event.detail.value;

      switch (option) {
        case 'month':
          start_dt.setMonth(start_dt.getMonth() - 1);
          break;

        case 'today':
          start_dt.setDate(start_dt.getDate() - 1);
          break;

        case 'year':
          start_dt.setFullYear( start_dt.getFullYear() - 1 );
          break;
      }

      this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
      this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

      this.fetchOrders();
    },

  },

  mounted() {
    this.onSegmentChanged(new CustomEvent('load', { detail: { value: 'today' } }));
  }
})
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
