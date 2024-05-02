<template>
  <IonCard>
    <IonCardContent class="ion-no-padding">
      <IonList lines="none">
        <IonItem v-for="item in order?.order_items" :key="item.id">
          <IonLabel class="font-medium">
            {{ item.product?.product_name }}
          </IonLabel>
          <IonText slot="end" class="font-medium">
            {{ Filters.currency(item.total_price as number) }}
          </IonText>
        </IonItem>

        <!-- <IonItem>
          <IonLabel class="font-medium">Tax/Vat</IonLabel>
          <IonText slot="end" class="font-medium"> GHS 0.00 </IonText>
        </IonItem> -->

        <IonItem class="ion-margin-top">
          <IonLabel class="font-medium">Delivery Fee</IonLabel>
          <IonText slot="end" class="font-medium">TBD</IonText>
        </IonItem>

        <IonItem>
          <IonLabel class="font-medium">Total Cost</IonLabel>
          <IonText slot="end" class="font-medium">
            {{ Filters.currency(order?.total_order_amount as number) }}
          </IonText>
        </IonItem>
      </IonList>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { locationOutline, timeOutline } from "ionicons/icons";
import { Order } from "@/models/Order";
import Filters from "../../../utilities/Filters";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
IonText,
} from "@ionic/vue";

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<Order>,
    },
    showChangeAddress: {
      default: true,
    },
    showChangeDate: {
      default: true,
    },
  },
  data() {
    return {
      Filters,
    };
  },
  components: { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText },
});
</script>

<style scoped lang="scss">
ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
</style>
