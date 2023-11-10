<template>
  <IonList lines="full">
    <OrderListItem v-for="(order, index) in orders" :key="order.id" :order="order" @click="viewDetails(order)"
                   @openMenu="openMenu($event, index)">
      <template v-slot:popover>
        <IonPopover :event="event" :isOpen="openPopover == index" @didDismiss="openPopover = -1">
          <IonContent class="ion-no-padding">
            <IonList lines="full" class="ion-no-padding">
              <ion-item :button="true" lines="full" aria-label="sync" v-if="order?.isPendingApproval()"
                        @click="approveOrder(order)">
                <ion-icon slot="start" :icon="checkmark" aria-hidden="true"></ion-icon>
                {{ $t('general.accept') }}
              </ion-item>
              <ion-item :button="true" lines="full" v-if="order?.isPendingApproval()" @click="cancelOrder(order)">
                <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
                {{ $t('general.cancel') }}
              </ion-item>
              <ion-item :button="true" lines="full">
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                {{ $t('vendor.orders.messageCustomer') }}
              </ion-item>
              <ion-item :button="true" lines="full" @click="deleteOrder(order)">
                <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                {{ $t("general.delete") }}
              </ion-item>
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </OrderListItem>

    <DeleteModal
      :title="$t('vendor.orders.deleteOrderFromList')"
      :description="$t('vendor.orders.youCantUndoThisAction')"
      :isOpen="showConfirmDeleteModal"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    ></DeleteModal>
  </IonList>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonContent, IonSkeletonText, IonButton, IonChip, IonText } from '@ionic/vue';
import { chatbubbleOutline, checkmark, closeCircleOutline, ellipsisHorizontal, trashOutline } from 'ionicons/icons';
import { useOrderStore } from '@/stores/OrderStore';
import { Order } from '@/models/Order';
import { mapStores } from 'pinia';
import filters from '@/utilities/Filters';
import Image from '@/components/Image.vue';
import OrderListItem from './OrderListItem.vue';
import { useToastStore } from '@/stores/ToastStore';
import { handleAxiosRequestError } from '@/utilities';
import DeleteModal from '@/components/modals/DeleteModal.vue';

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
    OrderListItem,
    DeleteModal
  },

  computed: {
    ...mapStores(useOrderStore, useToastStore)
  },

  data() {
    return {
      chatbubbleOutline, closeCircleOutline,
      ellipsisHorizontal, trashOutline, checkmark,
      event: null as any,
      openPopover: -1,
      selectedOrder: null as Order | null,
      showConfirmDeleteModal: false,
      filters
    }
  },

  methods: {
    getStatusInfo(orderStatusId?: number) {
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
    },

    openMenu(e: Event, index = -1) {
      this.event = e;
      this.openPopover = index;
    },

    closeMenu() {
      this.openPopover = -1;
      this.event = null;
    },

    deleteOrder(order: Order) {
      this.selectedOrder = order;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      const response = await this.orderStore.deleteOrder(this.selectedOrder?.id as number);
      console.log(response);
    },

    viewDetails(order: Order) {
      this.$emit('view-details', order);
      this.$router.push(`/vendor/orders/${order.id}`);
    },

    async approveOrder(order: Order) {
      try {
        const response = await this.orderStore.approveOrder(order);

        this.toastStore.showSuccess(this.$t('vendor.orders.orderHasBeenApproved'), '', 'bottom', 'vendorTabs')
      } catch (error) {
        handleAxiosRequestError(error);
        this.toastStore.showError(this.$t('vendor.orders.anErrorOccured'), '', 'bottom', 'vendorTabs')
      }
    },

    async cancelOrder(order: Order) {
      try {
        const response = await this.orderStore.cancelOrder(order);

        this.toastStore.showSuccess(this.$t('vendor.orders.orderHasBeenCanceled'), '', 'bottom', 'vendorTabs')
      } catch (error) {
        handleAxiosRequestError(error);
        this.toastStore.showError(this.$t('vendor.orders.anErrorOccured'), '', 'bottom', 'vendorTabs')
      }
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
