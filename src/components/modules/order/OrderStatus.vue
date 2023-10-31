<template>
  <ion-list>
    <ion-list-header>Order Status</ion-list-header>
    <ion-item v-for="(status, index) in orderStatuses" :key="index">
      <ion-avatar slot="start">
        <ion-skeleton-text :animated="true" style="width: 40px; height: 40px;"></ion-skeleton-text>
      </ion-avatar>
      <ion-label>
        <h3>{{ status }}</h3>
        <p>Estimated delivery time: {{ estimatedDeliveryTimes[index] }}</p>
      </ion-label>
      <ion-icon slot="end" :icon="index < orderStatuses.length - 1 ? 'arrow-forward' : ''"></ion-icon>
    </ion-item>
  </ion-list>
</template>

<script>
import { IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText } from '@ionic/vue';
import { useOrderStore } from '@/stores/OrderStore';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  components: {
    IonAvatar,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
  },
  setup() {
    const orderStore = useOrderStore();

    const orderStatuses = computed(() => orderStore.orders.map(order => order.order_status.name));

    const estimatedDeliveryTimes = computed(() => {
      return orderStatuses.value.map(status => {
        if (status === 'Confirmed') {
          return '2 hours';
        } else if (status === 'Out for Delivery') {
          return '4 hours';
        } else if (status === 'Delivered') {
          return '6 hours';
        } else {
          return 'N/A';
        }
      });
    });

    return {
      orderStatuses,
      estimatedDeliveryTimes,
    };
  },
});
</script>
