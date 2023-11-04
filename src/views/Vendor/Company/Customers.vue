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
              <IonLabel>Customers</IonLabel>
              <ion-badge class="badge">{{ customers.length }}</ion-badge>
            </section></IonTitle
          >
          <ion-buttons slot="end">
            <IonButton v-if="customers.length <= 0">
              <img src="/images/user-plus.svg" alt="" />
            </IonButton>
            <ion-button
              v-else
              @click="searchEnabled = !searchEnabled"
              color="dark"
            >
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <IonToolbar v-if="searchEnabled">
        <IonSearchbar
          :placeholder="$t('profile.customers.searchCustomers') + '...'"
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
        <EmptyCustomers v-if="customers.length <= 0"></EmptyCustomers>
        <IonList
          v-else
          lines="none"
          class="ion-padding-horizontal customers-select-list simple"
        >
          <CustomersList
            v-for="customer in customers"
            :key="customer.id"
            :customer="customer"
          />
        </IonList>
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
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { arrowBackOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import EmptyCustomers from "@/components/modules/customers/EmptyCustomers.vue";
import CustomersList from "@/components/modules/customers/CustomersList.vue";

const fetching = ref(false);
const refreshing = ref(false);

const searchEnabled = ref(false);

const customers = ref<Business[]>([]);

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  await fetchCustomers();
  refreshing.value = false;
  event.target.complete();
};

const onSearch = async (event: Event) => {
  refreshing.value = true;
  await fetchCustomers({
    name_like: (event.target as HTMLIonSearchbarElement).value,
  });
  refreshing.value = false;
};

const fetchCustomers = async (options = {}) => {
  fetching.value = true;
  const userStore = useUserStore();
  const businessStore = useBusinessStore();

  customers.value = await businessStore.getBusinessCustomers(
    userStore.activeBusiness as Business,
    300,
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
