<template>
       
       <section>
        <IonCard>
            <IonCardContent class="ion-no-padding">
                <IonList lines="none">
                    <IonItem>
                        <IonLabel class="font-medium">Frytol Geisha</IonLabel>
                        <IonLabel slot="end" class="font-medium">
                            GHS 0.00
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="font-medium">Tax/Vat</IonLabel>
                        <IonLabel slot="end" class="font-medium">
                            GHS 0.00
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="font-medium">Delivery free</IonLabel>
                        <IonLabel slot="end" class="font-medium">
                            GHS 0.00
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="font-medium">Total Cost</IonLabel>
                        <IonLabel slot="end" class="font-medium">
                            GHS 0.00
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
                            <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>
                        </IonText>

                    </IonItem>
                    <IonItem>
                        <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
                            <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon>
                        </IonText>
                    </IonItem>

                </IonList>
            </IonCardContent>
        </IonCard>
    </section>
  
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonCard, IonCardContent, IonItem, IonLabel, IonList, IonRadio, IonText, IonIcon } from '@ionic/vue';
import { useCartStore } from "@/stores/CartStore";
import { useRoute } from "vue-router";
import Filters from '@/utilities/Filters';
import { Order } from "../../models/Order";

const route = useRoute();

const cartStore = useCartStore();

const totalCost = computed(() => {
  let total = 0;

  const order = cartStore.orders.find((o: Order) => o?.businesses_id == +route.params.id);

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

</style>
