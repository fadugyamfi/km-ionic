<template>
  <section>
    <IonCard>
      <IonCardHeader class="ion-no-padding">
        <IonItem lines="none">
          <IonThumbnail slot="start">
            <Image :src="order?.customer?.logo"></Image>
          </IonThumbnail>

          <IonLabel class="font-medium">{{ order?.customer?.name }}</IonLabel>
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem v-for="item in order?.order_items" :key="item.id">
            <IonLabel class="ion-text-wrap font-medium">
              {{ item.product?.product_name }}
              <section>
                <IonText color="medium" class="font-medium">
                  {{ item.quantity }} {{ getItemUnit(item) }}
                </IonText>
              </section>
            </IonLabel>
            <IonLabel slot="end" class="font-medium text-end ion-align-self-start">
              {{ Filters.currency(item.product?.product_price as number, item.currency?.symbol as string) }}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>

    </IonCard>

    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonLabel class="font-medium">{{ $t('shopper.orders.delivery') }}</IonLabel>
            <IonLabel slot="end" class="font-medium">
              GHS 0.00
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel color="medium" class="font-medium">
              {{ order?.delivery_location || 'Unknown' }}
            </IonLabel>
            <IonLabel v-if="showChangeAddress"  color="primary" slot="end" class="font-medium">
              Change Address
            </IonLabel>
          </IonItem>

          <IonItem lines="full" class="ion-padding-bottom">
            <IonLabel color="medium" class="font-medium">
              {{ order?.delivery_date ? Filters.date(order?.delivery_date as string, 'short') : 'TBD' }}
            </IonLabel>
            <IonLabel v-if="showChangeDate" color="primary" slot="end" class="font-medium">
              Change Date
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel color="dark" class="font-medium">
              {{ 'Total Cost' }}
            </IonLabel>
            <IonLabel color="dark" slot="end" class="font-medium fw-bold">
              {{ Filters.currency(order?.getTotal() as number, order?.currency?.symbol as string) }}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>
</template>



<script lang=ts>
import { Order } from "@/models/Order";
import { IonAccordion, IonItem, IonLabel, IonThumbnail, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonText, IonButton } from "@ionic/vue";
import { PropType, defineComponent } from 'vue';
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import { OrderItem } from "../../../models/OrderItem";

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    Image,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonText,
    IonButton
  },

  props: {
    order: {
      type: Object as PropType<Order | null>
    },

    showChangeDate: {
      default: true
    },

    showChangeAddress: {
      default: true
    }
  },

  data() {
    return {
      Filters,
    };
  },

  methods: {

    getItemUnit(orderItem: OrderItem) {
      if (orderItem.product_units_id == 2) {
        return this.$tc('general.units.piece', orderItem.quantity as number);
      }

      return this.$tc('general.units.box', orderItem.quantity as number);
    },

    update() {
      this.$router.push({ name: 'OrderUpdate', params: { id: this.order?.id } });
    },
  },
});
</script>

<style scoped lang="scss">
ion-thumbnail {
  --size: 32px;
}

ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
</style>
