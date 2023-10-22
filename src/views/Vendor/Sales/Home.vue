<template>
  <ion-page>
    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true">
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol class="ion-justify-content-end ion-text-end">
            <IonButton fill="clear" color="primarys" router-link="/vendor/sales/add-sale/select-agent">
              Add Sale
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
</script>
