<template>
  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonText> {{ order?.business?.name || "No Business" }} </IonText>
          </IonItem>
          <IonItem v-for="(item, index) in order.order_items" :key="index">
            <IonLabel class="font">{{ item.product?.product_name }}</IonLabel>
            <IonText slot="end" class="font-medium">
              {{ Filters.currency(item.total_price || 0) }}
            </IonText>
          </IonItem>

          <!-- <IonItem>
            <IonLabel class="font">Tax/Vat</IonLabel>
            <IonText slot="end" class="font-medium"> GHS 0.00 </IonText>
          </IonItem> -->

          <IonItem class="ion-margin-top">
            <IonLabel class="font">Delivery fee</IonLabel>
            <IonText slot="end" class="font-medium"> TBD</IonText>
          </IonItem>

          <IonItem>
            <IonLabel class="font">Total Cost</IonLabel>
            <IonText slot="end" class="font-medium">
              {{ Filters.currency(order?.total_order_amount as number || 0) }}
            </IonText>
          </IonItem>
          <IonItem>
            <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
              <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>
              {{ order.delivery_location }}
            </IonText>
          </IonItem>
          <IonItem>
            <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
              <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon>{{ order.delivery_date }}
            </IonText>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonText,
  IonIcon,
} from "@ionic/vue";
import { locationOutline, timeOutline } from "ionicons/icons";
import { useCartStore } from "@/stores/CartStore";
import { useRoute } from "vue-router";
import Filters from "@/utilities/Filters";
import { Order } from "../../models/Order";

const props = defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
});

const route = useRoute();

const cartStore = useCartStore();

const totalCost = computed(() => {
  let total = 0;

  const order = cartStore.orders.find(
    (o: Order) => o?.businesses_id == +route.params.id
  );

  if (order) {
    total = order.order_items?.reduce(
      (acc, item) => acc + (item.total_price || 0),
      0
    );
  }

  return total;
});
</script>

<style scoped lang="scss">
ion-label {
  margin: 0px;
}

ion-item {
  --min-height: 32px;
}

.font {
  color: var(--Grey-blue, #667085);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}
</style>
