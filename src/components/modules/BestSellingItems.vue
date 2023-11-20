<template>
  <IonRow>
    <IonCol size="6">
      <IonCard class="ion-no-margin best-selling-card">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{ $t("general.bestSellingItem") }}</IonText>
          <IonText color="dark" class="fw-semibold"
            >{{ topSellingProduct?.product?.product_name || "N/A" }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin customers-card">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">{{ $t("general.noOfCustomers") }}</IonText>
          <IonText color="dark" class="fw-semibold">
            {{ Filters.number(totalCustomers) }}
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
</template>

<script lang="ts">
import { IonRow, IonCol, IonCard, IonCardContent, IonText } from "@ionic/vue";
import Filters from "@/utilities/Filters";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
  },
  props: {
    topSellingProduct: {
      type: Object,
      default: true,
    },
    totalCustomers: {
      type: Number,
      default: true,
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
.customers-card {
  --background: #f2f7f7;
}

.best-selling-card {
  --background: #fff2ebcc;
}
</style>
