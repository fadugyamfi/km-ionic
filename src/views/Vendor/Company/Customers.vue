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
              <ion-badge color="warning">{{ customers.length }}</ion-badge>
            </section></IonTitle
          >
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
      <section v-show="!fetching">
        <!-- <EmptyCustomers></EmptyCustomers> -->
        <IonList
          v-if="!fetching"
          lines="none"
          class="ion-padding-horizontal customers-select-list simple"
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
              <IonText><IonChip>new</IonChip></IonText>
            </IonLabel>
            <ion-icon
              :id="`popover-button-${customer.id}`"
              color="medium"
              :icon="ellipsisHorizontal"
            ></ion-icon>
            <IonPopover
              :trigger="`popover-button-${customer.id}`"
              :dismiss-on-select="true"
            >
              <IonContent scroll-y="false">
                <IonList>
                  <IonItem :button="true" :detail="false">
                    <IonIcon :icon="createOutline"></IonIcon> Update customer
                  </IonItem>
                  <IonItem :button="true" :detail="false">
                    <IonIcon :icon="trashOutline"></IonIcon>
                    Remove customer</IonItem
                  >
                </IonList>
              </IonContent>
            </IonPopover>
          </IonItem>
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
  IonList,
  IonAvatar,
  IonLabel,
  IonText,
  IonItem,
  IonChip,
  IonIcon,
  IonPopover,
  IonBadge,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import {
  arrowBackOutline,
  ellipsisHorizontal,
  createOutline,
  trashOutline,
} from "ionicons/icons";
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

<style lang="scss" scoped>
.customers-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    --background: #ffffff;
    border: solid 1px #f4f4f4;
    border-radius: 12px;
    margin-bottom: 0.5em;
    box-shadow: 0px 4px 12px 0px #696f821a;
  }
  ion-item ion-chip {
    --background: #eaecf5;
    --color: #304296;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
  }

  ion-item ion-label p {
    font-weight: bold;
    color: #111;
  }

  &.simple {
    ion-item {
      border: solid 1px #f4f4f4;
      border-radius: 12px;
      margin-bottom: 0.5em;
      box-shadow: none;
      --background: none;
    }
  }
}
ion-popover {
  --width: 220px;
}

ion-icon {
  margin-right: 10px;
}
</style>
