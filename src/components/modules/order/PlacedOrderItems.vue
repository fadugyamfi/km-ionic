<template>
  <section>
    <IonCard>
      <IonCardHeader class="ion-no-padding">
        <IonItem lines="none">
          <ProfileAvatar slot="start" :image="order?.business?.logo"
                       :username="order?.business?.name" customSize="32px"></ProfileAvatar>

          <IonLabel class="font-medium">{{ order?.business?.name }}</IonLabel>
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="product-list ion-no-padding">
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
            <IonText slot="end" class="font-medium text-end ion-align-self-start">
              {{ Filters.currency(item.total_price as number, item.currency?.symbol as string) }}
            </IonText>
          </IonItem>
        </IonList>
      </IonCardContent>

    </IonCard>

    <section>
      <OrderDeliverySummary
        :show-change-address="showChangeAddress"
        :show-change-date="showChangeDate"
        :order="(order as Order)"
      ></OrderDeliverySummary>
    </section>
  </section>
</template>



<script lang=ts>
import { Order, OrderStatus } from "@/models/Order";
import { IonAccordion, IonItem, IonLabel, IonThumbnail, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonText, IonButton } from "@ionic/vue";
import { PropType, defineComponent } from 'vue';
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import { OrderItem } from "../../../models/OrderItem";
import OrderDeliverySummary from "./OrderDeliverySummary.vue";
import ProfileAvatar from "../../ProfileAvatar.vue";

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
    IonButton,
    OrderDeliverySummary,
    ProfileAvatar
},

  props: {
    order: {
      type: Object as PropType<Order | null>
    },
  },

  data() {
    return {
      Filters,
    };
  },

  computed: {
    showChangeDate() {
      return this.order?.order_status_id == OrderStatus.PENDING;
    },

    showChangeAddress() {
      return this.order?.order_status_id == OrderStatus.PENDING;
    }
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
.product-list ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
</style>
