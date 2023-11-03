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
              defaultHref="/shopper/profile"
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
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-show="!fetching" style="margin-top: 60px">
        <EmptyCustomers></EmptyCustomers>
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
  IonBadge,
  IonButton,
  IonIcon,
  IonSpinner,
  IonTitle,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { ref } from "vue";
import { arrowBackOutline } from "ionicons/icons";
import EmptyCustomers from "@/components/modules/customers/EmptyCustomers.vue";

const fetching = ref(false);
</script>

<style scoped></style>
