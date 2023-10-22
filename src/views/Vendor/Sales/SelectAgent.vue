<template>
  <IonPage class="ion-padding">
    <IonHeader class="inner-header">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/vendor/sales">
            <IonIcon :icon="close"></IonIcon>
          </IonBackButton>
        </IonButtons>
        <IonTitle size="small"><b>Select Agent</b></IonTitle>
        <IonButtons slot="end">
          <ion-button @click="refresh()">
            <IonIcon :icon="search"></IonIcon>
          </ion-button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="ion-padding-vertical">
      Agent List
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton } from '@ionic/vue';
import { close, refreshOutline, search } from 'ionicons/icons';

const cancel = () => {}
const refresh = () => {}
</script>
