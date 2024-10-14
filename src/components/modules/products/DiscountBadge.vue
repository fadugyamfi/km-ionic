<template>
  <ion-badge>
    <ion-icon :icon="pricetagOutline"> </ion-icon> <slot></slot
  ></ion-badge>
</template>
<script setup lang="ts">
import { IonBadge, IonIcon } from "@ionic/vue";
import { pricetagOutline } from "ionicons/icons";
</script>
<style scoped lang="scss">
ion-badge {
  --background: #474a4e;
  --color: white;
  --padding-end: 6px;
  --padding-top: 4px;
  --padding-bottom: 4px;
  --padding-start: 6px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 63px;
  height: 28px;
  gap: 4px;

  ion-icon {
    font-size: 15px;
    --ionicon-stroke-width: 45px;
  }
}
</style>
