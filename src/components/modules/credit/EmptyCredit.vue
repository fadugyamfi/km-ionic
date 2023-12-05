<template>
  <div class="ion-text-center ion-padding-horizontal" style="margin-top: 80px">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em">
      <img src="/images/disappointed.svg" style="width: 150px; height: 150px" />
    </div>
    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom">
        <b> {{ $t("vendor.credit.noResultsFound") }}</b>
      </h5>
      <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
        {{ $t("vendor.credit.pleaseTryAgain") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { IonText, IonFooter } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonText, IonFooter },
});
</script>
