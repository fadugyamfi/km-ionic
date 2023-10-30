<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ order }}
          </IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon name="chatbubble-outline"></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true">
      <Orderslides></Orderslides>
      <OrderSupplierCard></OrderSupplierCard>
      <OrdersCard></OrdersCard>
      <UpdateButon></UpdateButon>
      <OrderStatus></OrderStatus>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { Order } from '@/models/Order';
import { IonIcon, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';
import { IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import Orderslides from '@/components/modules/order/Orderslides.vue';
import OrderSupplierCard from '@/components/modules/order/OrderSupplierCard.vue';
import OrdersCard from '@/components/modules/order/OrdersCard.vue';
import UpdateButon from '@/components/modules/order/UpdateButon.vue';
import OrderStatus from '@/components/modules/order/OrderStatus.vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle, IonPage, IonSelect, IonSelectOption, IonAvatar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonIcon,
    IonContent,
    Orderslides,
    OrderSupplierCard,
    OrdersCard,
    UpdateButon,
    OrderStatus
  },

  name: 'OrderDetails',

  props: {
    order: {
      type: Object as () => Order,
      required: true,
    },
  },


});
</script>

<style scoped>
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}
</style>
