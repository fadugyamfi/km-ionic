<template>
  <IonRow class="ion-padding-horizontal">
    <IonCol size="6">
      <IonCard class="ion-no-margin total-credit">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="dark">{{ $t("vendor.credit.totalCredit") }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(creditSummary?.total_value) }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin total-recovered">
        <IonCardContent class="d-flex flex-column ion-align-items-center">
          <IonText color="dark">{{
            $t("vendor.credit.totalRecovered")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(creditSummary?.repayment_value) }}
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
    creditSummary: {
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

<style lang="scss" scoped>
.total-credit {
  border-radius: 6px;
  background: #f2f7f7;

  ion-text:nth-child(1) {
    font-size: 12px;
  }
}
.total-recovered {
  border-radius: 6px;
  background: #fff9ef;

  ion-text:nth-child(1) {
    font-size: 12px;
  }
}
</style>
