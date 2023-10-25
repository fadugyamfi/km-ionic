<template>
  <IonList>
    <IonItem v-for="order in filteredOrders" :key="order.id">
      <IonAvatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </IonAvatar>
      <IonLabel>
        <h2>{{ order.id }}</h2>
        <p>{{ order.businesses_id }}</p>
        <p>{{ order.start_dt }}</p>
        <IonBadge :color="getStatusColor(order.order_status_id)">{{ order.order_status?.name }}</IonBadge>
      </IonLabel>
      <IonIcon slot="end" :icon="ellipsisHorizontal"></IonIcon>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, PropType } from 'vue';
import { Order } from '@/models/Order';
import { ellipsisHorizontal } from 'ionicons/icons';
import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';

const props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
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

  return props.orders.filter((order) => {
    const orderDate = new Date(order.start_dt as string);
    return orderDate >= startDt;
  });
});

const getStatusColor = (orderStatusId: any) => {
  switch (orderStatusId) {
    case 1:
      return 'primary';
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return 'warning';
    case 7:
      return 'success';
    case 8:
    case 9:
    case 10:
      return 'danger';
    default:
      return 'medium';
  }
};

</script>
<style>
</style>
