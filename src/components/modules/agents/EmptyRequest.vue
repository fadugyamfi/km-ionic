<template>
  <div class="ion-text-center ion-padding-horizontal">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em">
      <img src="/images/disappointed.svg" style="width: 150px; height: 150px" />
    </div>
    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom fw-semibold"><b>You have no Request</b></h5>
    </div>
  </div>
</template>

<script lang="ts">
import { IonText, IonFooter } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonText,
    IonFooter,
  },
});
</script>
