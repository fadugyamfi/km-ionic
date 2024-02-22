<template>
  <IonRow>
    <IonCol size="6">
      <IonCard class="ion-no-margin">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{ $t("general.totalSalesMade") }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(totalSales as number) }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{ $t("general.avgSalesValue") }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.currency(avgSales as number) }}
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
      type: [Number, String],
      default: 0,
    },
    avgSales: {
      type: [Number, String],
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

<style scoped></style>
