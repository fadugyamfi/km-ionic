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
          <IonTitle size="small" class="fw-bold">Customers</IonTitle>
          <ion-buttons slot="end">
            <IonButton>
              <img src="/images/user-plus.svg" alt="" />
            </IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
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
      <section v-show="!fetching" style="margin-top: 60px">
        <EmptyCustomers></EmptyCustomers>
        <!-- <IonList
          v-if="!fetching"
          lines="none"
          class="ion-padding-horizontal sales-select-list simple"
        >
          <IonItem v-for="customer in customers" :key="customer.id">
            <IonAvatar slot="start">
              <Image :src="customer.logo"></Image>
            </IonAvatar>
            <IonLabel>
              <p class="ion-no-margin">{{ customer.name }}</p>
              <IonText color="medium" class="font-medium">
                {{ customer.location || "Location Unknown" }}
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList> -->
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
  IonList,
  IonAvatar,
  IonLabel,
  IonText,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { onMounted, ref } from "vue";
import { arrowBackOutline } from "ionicons/icons";
import EmptyCustomers from "@/components/modules/customers/EmptyCustomers.vue";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import Image from "@/components/Image.vue";

const fetching = ref(false);
const refreshing = ref(false);

const customers = ref<Business[]>([]);

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  await fetchCustomers();
  refreshing.value = false;
  event.target.complete();
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

<style scoped></style>
