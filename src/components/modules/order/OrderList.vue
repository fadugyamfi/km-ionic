<template>
  <ion-list class= "ion-list">
    <ion-item v-for="order in filteredOrders" :key="order.id">
      <ion-avatar slot="start">
        <img style="width: 100%;height:100%" alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label class= "item">
        <ion-skeleton-text :animated="true" style="width: 80%;"><h3>{{ order.id }}</h3></ion-skeleton-text>
        <ion-skeleton-text :animated="true"style="width: 60%;"><p>{{ order.businesses_id }}</p></ion-skeleton-text>
        <ion-skeleton-text :animated="true"style="width: 40%;"> <p>{{ order.created_at }}</p></ion-skeleton-text>
        <ion-badge :color="getStatusInfo(order.order_status_id)?.color">{{ order.order_status?.name }}</ion-badge>
      </ion-label>
      <ion-icon slot="end" :icon="ellipsisHorizontal" id="click-trigger">
      <ion-popover trigger="click-trigger" trigger-action = "click">
        <ion-content class="ion- padding">
          <ion-list>
            <ion-item :button="true" lines="full" aria-label="sync" >
              <ion-icon slot="start" :icon="sync" aria-hidden="true" ></ion-icon>
              Re-order
            </ion-item>
            <ion-item :button="true" lines="full">
              <ion-icon slot="start" :icon="chatbubbleOutline" ></ion-icon>
              Message Supplier
            </ion-item>
            <ion-item :button="true" lines="full" >
              <ion-icon slot="start" :icon="createOutline" ></ion-icon>
              Edit Order
            </ion-item>
            <ion-item :button="true" lines="full">
              <ion-icon slot="start" :icon="trashOutline" ></ion-icon>
              Delete
            </ion-item>
          </ion-list>
        </ion-content>
        </ion-popover>
      </ion-icon>
    </ion-item>
  </ion-list>
</template>

<script default setup lang="ts">
import { defineProps, computed, PropType } from 'vue';
import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonContent } from '@ionic/vue';
import { chatbubbleOutline, createOutline, ellipsisHorizontal, trashOutline } from 'ionicons/icons';
import { create } from 'ionicons/icons';
import { trash } from 'ionicons/icons';
import { sync } from 'ionicons/icons';
import { chatbubble } from 'ionicons/icons';
import { useOrderStore } from '@/stores/OrderStore';
import { Order } from '@/models/Order';
import Product from '../../../models/Product';
const orderstore = useOrderStore();
const orders = ref([]);
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
      const orderDate = new Date(order.created_at as string);
      return orderDate >= today && orderDate < tomorrow;
    });
  } else if (props.selectedSegment === 'thisweek') {
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    return orders.filter((order) => {
      const orderDate = new Date(order.created_at as string);
      return orderDate >= startOfWeek;
    });
  } else if (props.selectedSegment === 'pastmonth') {
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    return orders.filter((order) => {
      const orderDate = new Date(order.created_at as string);
      return orderDate >= oneMonthAgo;
    });
  }

  return orders;
});


const getStatusInfo = (orderStatusId?: number) => {
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

const openOptionsMenu = () => {

}
</script>
<style scoped lang="scss">
.order-list {
  --padding : 10px;
  --border-radius: 20px;
  --background: #fff;
  justify-content:center ;
}
.item{
  --align-content: center;
  --justify-content: center;
  --align-items:center;

}
.badge{
  align-content: center;
  justify-content: center;
}
</style>
