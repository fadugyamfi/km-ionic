<template>
  <section class="ion-padding">
    <ion-header class="inner-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <IonButton @click="cancel()">
            <IonIcon :icon="close"></IonIcon>
          </IonButton>
        </ion-buttons>
        <ion-title size="small"><b>Notifications</b></ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refresh()">
            <IonIcon :icon="refreshOutline"></IonIcon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-top" :fullscreen="true">
      <div
        class="ion-padding ion-text-center"
        v-if="notificationsStore.fetching"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <main v-else>
        <EmptyNotifications
          v-if="notificationsStore?.notifications?.length == 0"
          @refresh="refresh"
        ></EmptyNotifications>

        <section v-else>
          <IonSegment value="personal" mode="ios" v-model="viewing">
            <IonSegmentButton value="general">
              <IonLabel>General</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="orders">
              <ion-label>Orders</ion-label>
            </IonSegmentButton>
          </IonSegment>

          <GeneralNotifications
            v-if="viewing == 'general'"
            :notifications="notificationsStore.getGeneralNotifications()"
          >
          </GeneralNotifications>
          <OrderNotifications
            v-if="viewing == 'orders'"
            :notifications="notificationsStore.getOrderNotifications()"
          >
          </OrderNotifications>
        </section>
      </main>
    </ion-content>
  </section>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
  modalController,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { arrowBack, close, refreshOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import GeneralNotifications from "./GeneralNotifications.vue";
import OrderNotifications from "./OrderNotifications.vue";
import { useNotificationStore } from "@/stores/NotificationStore";
import { mapStores } from "pinia";
import EmptyNotifications from "./EmptyNotifications.vue";

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    GeneralNotifications,
    OrderNotifications,
    EmptyNotifications,
    IonSpinner,
  },

  data() {
    return {
      viewing: "general",
      name: null,
      close,
      refreshOutline,
    };
  },

  computed: {
    ...mapStores(useNotificationStore),
  },

  methods: {
    refresh() {
      this.notificationsStore.fetchNotifications();
    },

    cancel() {
      modalController.dismiss(null, "cancel");
    },

    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === "confirm") {
      }
    },
  },

  mounted() {
    const notificationStore = useNotificationStore();
    notificationStore.fetchNotifications();
  },
});
</script>

<style scoped lang="scss">
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>
