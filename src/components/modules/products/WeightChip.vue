<template>
  <ion-card class="weight">
    <ion-card-content><slot></slot> </ion-card-content>
  </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
</script>
<style scoped lang="scss">
ion-card {
  &.weight {
    width: auto !important;
    min-width: 80px !important;
    border-radius: 16px 0px 0px 16px;
    background: #f9fafb;
    border: none;
    padding: 0px;
    box-shadow: 0px 8px 24px -4px #18274b0a;
    box-shadow: 0px 6px 12px -6px #18274b14;

    ion-card-content {
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      text-align: center;
      color: #581c87;
      padding: 8px 12px;
    }
  }
}
</style>
