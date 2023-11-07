<template>
  <ion-button size="small" slot="end" color="light">Save for later</ion-button>
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
