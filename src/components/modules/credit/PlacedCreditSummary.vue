<template>
  <IonRow class="ion-padding-horizontal">
    <IonCol size="6">
      <IonCard class="ion-no-margin total-credit">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="medium">{{
            $t("shopper.credit.totalAmountOverdue")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(placedCreditSummary?.total_value) }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin total-recovered">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="medium">{{
            $t("shopper.credit.totalTimeOverdue")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ placedCreditSummary?.repayment_value || "N/A" }}
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
    placedCreditSummary: {
      type: Object,
      default: () => {},
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
  background: #f2f7f7;
}
.total-recovered {
  border-radius: 6px;
  background: #fff9ef;
}
</style>
