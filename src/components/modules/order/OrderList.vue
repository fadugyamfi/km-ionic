<template>
  <ion-list>
    <ion-item v-for="order in filteredOrders" :key="order.id">
      <ion-avatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>
        <h2><span class="bold-text">{{ order.id }}</span>{{ order.id }}</h2>
        <p>{{ order.businesses_id }}</p>
        <p>{{ order.created_at }}</p>
        <ion-badge :color="getStatusColor(order.order_status_id)">{{ order.order_status?.name }}</ion-badge>
      </ion-label>
      <ion-icon slot="end" :icon="ellipsisHorizontal"></ion-icon>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { defineProps, computed, PropType } from 'vue';
import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { ellipsisHorizontal } from 'ionicons/icons';
import { Order } from '@/models/Order';

const props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
    required: true,
  },
  selectedSegment: String,
});

const filteredOrders = computed(() => {
  const currentDate = new Date();
  const orders = props.orders;

  if (props.selectedSegment === 'today') {
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return orderDate >= today && orderDate < tomorrow;
    });
  } else if (props.selectedSegment === 'thisweek') {
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    return orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return orderDate >= startOfWeek;
    });
  } else if (props.selectedSegment === 'pastmonth') {
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    return orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return orderDate >= oneMonthAgo;
    });
  }

  return orders;
});

const getStatusInfo = (orderStatusId: number) => {
  switch (orderStatusId) {
    case 1:
      return {
        color: 'primary',
        label: 'Processing',
      };
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return {
        color: 'warning',
        label: 'Pending',
      };
    case 7:
      return {
        color: 'success',
        label: 'Completed',
      };
    case 8:
    case 9:
    case 10:
      return {
        color: 'danger',
        label: 'Cancelled',
      };
    default:
      return {
        color: 'medium',
        label: 'Default',
      };
  }
};
</script>
</script>
