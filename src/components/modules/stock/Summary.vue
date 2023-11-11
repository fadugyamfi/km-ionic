<template>
  <section class="d-flex">
    <IonCard>
      <ion-card-header>
        <ion-card-title>GHS 3789.00</ion-card-title>
        <ion-card-subtitle>Total value of stock</ion-card-subtitle>
      </ion-card-header>
    </IonCard>
    <IonCard>
      <ion-card-header>
        <ion-card-title>140</ion-card-title>
        <ion-card-subtitle>Number of Items</ion-card-subtitle>
      </ion-card-header>
    </IonCard>
  </section>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardContent } from "@ionic/vue";
</script>

<style lang="scss" scoped>
ion-card {
  width: 100%;
  margin: 4px;
  padding: 10px 16px;
  border-radius: 6px;
  box-shadow: none;
  border: none;
  text-align: center;

  ion-card-header {
    padding: 0px;

    ion-card-title {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
    }
    ion-card-subtitle {
      color: #000;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      text-transform: initial;
    }
  }

  &:nth-child(1) {
    --background: #fff2eb;
  }
  &:nth-child(2) {
    --background: #f2f7f7;
  }
}
</style>
