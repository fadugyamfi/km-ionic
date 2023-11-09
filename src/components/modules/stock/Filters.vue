<template>
  <section>
    <IonChip class="chip">
      <IonLabel class="label"> All </IonLabel>
    </IonChip>
    <IonChip class="chip">
      <IonLabel class="label"> Dental </IonLabel>
    </IonChip>
    <IonChip class="chip">
      <IonLabel class="label"> Food </IonLabel>
    </IonChip>
    <IonChip class="chip">
      <IonLabel class="label"> Fashion </IonLabel>
    </IonChip>
    <IonChip class="chip">
      <IonLabel class="label"> Household </IonLabel>
    </IonChip>
  </section>
</template>
<script setup>
import { IonChip, IonLabel } from "@ionic/vue";
</script>
<style scoped>
.chip {
  border-radius: 16px;
  background: var(--gray-100, #f2f4f7);
}
.label {
  color: rgba(52, 64, 84, 1);
  text-align: center;
  font-weight: 500;
  line-height: 20px;
}
</style>
