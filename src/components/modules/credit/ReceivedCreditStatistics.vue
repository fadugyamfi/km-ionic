<template>
  <IonRow style="margin: 0px 10px;">
    <IonCol size="6">
      <IonCard class="ion-no-margin total-credit">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="medium">{{
            $t("vendor.credit.outstandingCredit")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(totalSales) }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin total-recovered">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="medium">{{
            $t("vendor.credit.paymentTerms")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            <!-- {{ Filters.currency(avgSales) }} -->
            50% each week
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
</template>

<script lang="ts">
import { IonRow, IonCol, IonCard, IonCardContent, IonText } from "@ionic/vue";
import Filters from "@/utilities/Filters";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
  },
  props: {
    totalSales: {
      type: Number,
      default: 0,
    },
    avgSales: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      Filters,
    };
  },
});
</script>

<style scoped>
.total-credit {
  border-radius: 6px;
  background: #fff;
}
.total-recovered {
  border-radius: 6px;
  background: #fff;
}
</style>
