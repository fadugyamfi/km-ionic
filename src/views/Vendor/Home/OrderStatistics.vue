<template>
  <IonRow>
    <IonCol size="6">
      <IonCard class="ion-no-margin">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{
            $t("general.totalOrdersReceived")
          }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ orderSummary?.total_count }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{ $t("general.newOrders") }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ noOfNewOrders }}
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
    orderSummary: {
      type: Object,
      default: () => {},
    },
    noOfNewOrders: {
      type: [String, Number],
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
