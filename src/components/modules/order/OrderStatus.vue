<template>
  <ion-list>
    <ion-list-header>Order Status</ion-list-header>
    <ion-item v-for="(status, index) in orderStatuses" :key="index">
      <ion-avatar slot="start">
        <!-- Add icons here based on the status -->
        <ion-icon :icon="getIconForStatus(status)"></ion-icon>
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

    // Add a function to get the corresponding icon for each status
    const getIconForStatus = (status) => {
      if (status === 'Confirmed') {
        return 'checkmark-circle';
      } else if (status === 'Out for Delivery') {
        return 'truck';
      } else if (status === 'Delivered') {
        return 'checkmark-done';
      } else {
        return 'alert-circle';
      }
    };

    return {
      orderStatuses,
      estimatedDeliveryTimes,
      getIconForStatus,
    };
  },
});
</script>
