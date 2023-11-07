<template>
  <ion-button size="small" slot="end" color="light"><ion-title>Save for later</ion-title></ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonButton,
  },
});
</script>

<style scope="scss">
ion-buttom{
font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 12px */
}
</style>
