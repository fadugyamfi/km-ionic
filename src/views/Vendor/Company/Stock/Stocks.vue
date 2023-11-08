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
              <IonLabel>
                <!-- {{ $t("profile.customers.customers") }} -->
                Stock
              </IonLabel>
            </section></IonTitle
          >
          <ion-buttons slot="end">
            <IonButton color="dark" @click="addStock()">
              <IonIcon :icon="personAddOutline" color="dark"></IonIcon>
            </IonButton>
            <ion-button
              v-if="customers?.length > 0"
              @click="searchEnabled = !searchEnabled"
              color="dark"
            >
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <EmptyStock></EmptyStock>
    </IonHeader>
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
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import EmptyStock from "@/components/modules/customers/stock/EmptyStock.vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/CustomerStore";

const fetching = ref(false);
const refreshing = ref(false);
const currentPage = ref(1);
const router = useRouter();

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
});
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
</style>
