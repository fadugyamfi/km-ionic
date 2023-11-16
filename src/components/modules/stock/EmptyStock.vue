<template>
  <div class="ion-text-center ion-padding-horizontal" style="margin-top: 80px">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em">
      <img src="/images/disappointed.svg" style="width: 150px; height: 150px" />
    </div>
    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom">
        <b> {{ $t("profile.stock.stockIsEmpty") }}</b>
      </h5>
      <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
        {{ $t("profile.stock.noStock") }}
      </p>
    </div>
  </div>
  <IonFooter class="ion-padding-vertical ion-no-border">
    <KolaYellowButton @click="addStock()" class="ion-margin-bottom">
      {{ $t("profile.stock.addStock") }}
    </KolaYellowButton>
  </IonFooter>
</template>

<script lang="ts">
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { IonText, IonFooter } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonText, IonFooter, KolaYellowButton },

  methods: {
    addStock() {
      this.$router.push("/profile/company/stocks/add-stock");
    },
  },
});
</script>
