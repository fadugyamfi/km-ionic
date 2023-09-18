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
          <ion-button>
            &nbsp; &nbsp;
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-top" :fullscreen="true">

      <IonSegment value="personal" mode="ios" v-model="viewing">
        <IonSegmentButton value="general">
          <IonLabel>General</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="orders">
          <ion-label>Orders</ion-label>
        </IonSegmentButton>
      </IonSegment>

      <GeneralNotifications v-if="viewing == 'general'"></GeneralNotifications>
      <OrderNotifications v-if="viewing == 'orders'"></OrderNotifications>

    </ion-content>
  </section>
</template>

<script setup lang="ts">
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
  IonSegmentButton
} from '@ionic/vue';
import { arrowBack, close } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components';
import { ref } from 'vue';
import GeneralNotifications from './GeneralNotifications.vue';
import OrderNotifications from './OrderNotifications.vue';

const viewing = ref('general');
const input = ref();
const name = ref();

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss(name.value, 'confirm');


const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {

  }
};

</script>

<style lang="scss">
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>
