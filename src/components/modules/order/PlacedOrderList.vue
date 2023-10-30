<template>
  <IonList lines="full">
    <OrderListItem
      v-for="(order, index) in orders"
      :key="order.id"
      :order="order"
      @click="viewDetails(order)"
      @openMenu="openMenu($event, index)"
    >
      <template v-slot:popover>
        <IonPopover :event="event" :isOpen="openPopover == index" @didDismiss="openPopover = -1">
            <IonContent class="ion-no-padding">
                <IonList lines="full" class="ion-no-padding">
                    <ion-item :button="true" lines="full" aria-label="sync">
                        <ion-icon slot="start" :icon="sync" aria-hidden="true"></ion-icon>
                        Re-order
                    </ion-item>
                    <ion-item :button="true" lines="full">
                        <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                        Message Supplier
                    </ion-item>
                    <ion-item :button="true" lines="full">
                        <ion-icon slot="start" :icon="createOutline"></ion-icon>
                        Edit Order
                    </ion-item>
                    <ion-item :button="true" lines="full">
                        <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                        Delete
                    </ion-item>
                </IonList>
            </IonContent>
        </IonPopover>
      </template>
    </OrderListItem>

  </IonList>
</template>

<script lang="ts">
import { defineProps, computed, PropType, ref, defineComponent } from 'vue';
import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonContent, IonSkeletonText, IonButton, IonChip, IonText } from '@ionic/vue';
import { chatbubbleOutline, createOutline, ellipsisHorizontal, trashOutline } from 'ionicons/icons';
import { create } from 'ionicons/icons';
import { trash } from 'ionicons/icons';
import { sync } from 'ionicons/icons';
import { chatbubble } from 'ionicons/icons';
import { useOrderStore } from '@/stores/OrderStore';
import { Order } from '@/models/Order';
import { mapStores } from 'pinia';
import filters from '@/utilities/Filters';
import Image from '../../Image.vue';
import OrderListItem from './OrderListItem.vue';

export default defineComponent({

  props: {
    orders: {
      type: Array as PropType<Order[]>,
      required: true,
    },
  },

  components: {
    IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonContent, IonSkeletonText,
    IonButton,
    IonChip,
    IonText,
    Image,
    OrderListItem
},

  computed: {
    ...mapStores(useOrderStore)
  },

  data() {
    return {
      sync, create, trash, chatbubble, chatbubbleOutline,
      createOutline, ellipsisHorizontal, trashOutline,
      event: null as any,
      openPopover: -1,
      selectedOrder: null as Order | null,
      showConfirmDeleteModal: false,
      filters
    }
  },

  methods: {


    openMenu(event: any, index: number) {
      this.event = event;
      this.openPopover = index;
    },

    closeMenu() {
      this.openPopover = -1;
      this.event = null;
    },

    deleteSale(order: Order) {
      this.selectedOrder = order;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      await this.orderStore.deleteOrder(this.selectedOrder?.id as number);
    },

    viewDetails(order: Order) {
      this.$emit('view-details', order);
      // this.$router.push(`/vendor/sales/${sale.id}`);
    }
  }
})

// const orderstore = useOrderStore();
// const orders = ref([]);

// const props = defineProps({

//   selectedSegment: String,
// });

// const filteredOrders = computed(() => {
//   const currentDate = new Date();
//   const orders = props.orders;

//   if (props.selectedSegment === 'today') {
//     const today = new Date(currentDate);
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     return orders.filter((order) => {
//       const orderDate = new Date(order.created_at as string);
//       return orderDate >= today && orderDate < tomorrow;
//     });
//   } else if (props.selectedSegment === 'thisweek') {
//     const dayOfWeek = currentDate.getDay();
//     const startOfWeek = new Date(currentDate);
//     startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

//     return orders.filter((order) => {
//       const orderDate = new Date(order.created_at as string);
//       return orderDate >= startOfWeek;
//     });
//   } else if (props.selectedSegment === 'pastmonth') {
//     const oneMonthAgo = new Date(currentDate);
//     oneMonthAgo.setMonth(currentDate.getMonth() - 1);

//     return orders.filter((order) => {
//       const orderDate = new Date(order.created_at as string);
//       return orderDate >= oneMonthAgo;
//     });
//   }

//   return orders;
// });


</script>
<style scoped lang="scss">
.order-list {
  --padding: 10px;
  --border-radius: 20px;
  --background: #fff;
  justify-content: center;
}

.item {
  --align-content: center;
  --justify-content: center;
  --align-items: center;

}

.badge {
  align-content: center;
  justify-content: center;
}
</style>
