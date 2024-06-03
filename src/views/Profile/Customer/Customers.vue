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
              <IonLabel>{{ $t("profile.customers.customers") }}</IonLabel>
              <ion-badge class="badge">{{
                customerStore.totalCustomers
              }}</ion-badge>
            </section></IonTitle
          >
          <ion-buttons slot="end">
            <IonButton color="dark" @click="addCustomer()">
              <IonIcon :icon="personAddOutline" color="dark"></IonIcon>
            </IonButton>
            <ion-button
              v-if="customers?.length > 0"
              @click="searchEnabled = !searchEnabled"
              color="dark"
            >
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <IonToolbar v-if="searchEnabled || customerStore?.searchTerm?.length > 0">
        <IonSearchbar
          :placeholder="$t('profile.customers.searchCustomers') + '...'"
          class="search-input"
          v-model="customerStore.searchTerm"
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
      <div class="ion-padding ion-text-center" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-else>
        <EmptyCustomers v-if="customers?.length == 0"></EmptyCustomers>
        <CustomersList :customers="customers" />
      </section>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  onIonViewDidEnter,
  onIonViewWillEnter,
} from "@ionic/vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import EmptyCustomers from "@/components/modules/customers/EmptyCustomers.vue";
import CustomersList from "@/components/modules/customers/CustomersList.vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/CustomerStore";

const fetching = ref(false);
const refreshing = ref(false);
const fetchingMore = ref(false);
const router = useRouter();
const searchEnabled = ref(false);
const customers = ref<any[]>([]);

const customerStore = useCustomerStore();

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchCustomers();
  refreshing.value = false;
  event.target.complete();
};

const onSearch = async (event: any) => {
  if (fetching.value) return;
  refreshing.value = true;
  fetching.value = true;
  customerStore.setSearchTerm(event.target.value);
  await fetchCustomers({
    name_like: (event.target as HTMLIonSearchbarElement).value,
  });
  refreshing.value = false;
};

const addCustomer = () => {
  router.push("/profile/company/customers/add-customer");
};

const ionInfinite = async (ev: InfiniteScrollCustomEvent) => {
  fetchingMore.value = true;
  await fetchCustomers();
  ev.target.complete();
  fetchingMore.value = false;
};

const fetchCustomers = async (options: any = {}) => {
  if (customers.value?.length == 0) {
    fetching.value = true;
  }
  const userStore = useUserStore();

  if (userStore.activeRole?.isSalesAssociate()) {
    options = Object.assign(options, { limit: 100 });
    customers.value = await userStore.fetchAssignedBusinesses(
      userStore.user?.id,
      options,
      refreshing.value
    );
  } else {
    customers.value = await customerStore.getBusinessCustomers(
      userStore.activeBusiness as Business,
      50,
      options,
      refreshing.value,
      fetchingMore.value
    );
  }

  fetching.value = false;
};

onIonViewDidEnter(() => {
  fetchCustomers();
});

// onIonViewWillEnter(() => {
//   customerStore.clearCustomers();
// });
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
</style>
