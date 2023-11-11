<template>
  <ion-button size="small" slot="end" color="light">
    <IonTitle size="small"> Save for later </IonTitle>
  </ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonButton, IonTitle } from "@ionic/vue";

export default defineComponent({
  components: {
    IonButton,
    IonTitle
  },
});
</script>

<style scoped="scss">
ion-title {
  color: #8D9093;
  font-family: Poppins;
  font-size: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  /* 12px */
}
</style>
