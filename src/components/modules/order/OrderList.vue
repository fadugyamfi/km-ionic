<template>
  <ion-list>
    <ion-item v-for="order in filteredOrders" :key="order.id">
      <ion-avatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>
        <h2>{{ order.Credit_id }}</h2>
        <p>{{ order.businesses_id }}</p>
        <p>{{ order.start_dt }}</p>
        <ion-badge :color="getStatusColor(order.order_status_id)">{{ order.status }}</ion-badge>
      </ion-label>
      <ion-icon slot="end" :icon="more"></ion-icon>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { Order } from '@/models/Order';
import { more } from 'ionicons/icons';

const props = defineProps({
  orders: {
    type: Array as () => Order[],
    required: true,
  },
});

const selectedSegment = ref('today');
const currentDate = new Date();

const filteredOrders = computed(() => {
  const segment = selectedSegment.value;
  const startDt = new Date(currentDate);
  if (segment === 'thisweek') {
    startDt.setDate(currentDate.getDate() - currentDate.getDay());
  } else if (segment === 'pastmonth') {
    startDt.setMonth(currentDate.getMonth() - 1);
  }

  return props.orders.filter((Order) => {
    const orderDate = new Date(Order.start_dt);
    return orderDate >= startDt;
  });
});

const getStatusColor = (orderStatusId: any) => {
  switch (orderStatusId) {
    case 1:
      return 'warning';
    case 2:
      return 'success';
    case 3:
      return 'danger';
    case 4:
      return 'primary';
    default:
      return 'medium';
  }
};
</script>
<style>
</style>