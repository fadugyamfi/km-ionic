
<template>
    <ion-list class="ion-list">
      <ion-item v-for="order in filteredOrders" :key="order.id">
        <ion-avatar slot="start">
          <img
            style="width: 100%; height: 100%"
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </ion-avatar>
        <ion-label class="item">
          <ion-skeleton-text :animated="true" style="width: 80%;"><h3>{{ order.id }}</h3></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 60%;"><p>{{ order.businesses_id }}</p></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 40%;"><p>{{ order.created_at }}</p></ion-skeleton-text>
          <ion-badge :color="getStatusInfo(order.order_status_id)?.color">{{ order.order_status?.name }}</ion-badge>
        </ion-label>
        <ion-icon slot="end" :icon="ellipsisHorizontal" @click="showActions(order, $event)">
          <ion-popover :event="popoverEvent" trigger-action="click">
            <ion-content class="ion-padding">
              <ion-list>
                <ion-card v-if="selectedAction === 'reorder'">
                  <ion-card-header>
                    <ion-icon :icon="sync" class="alert-icon"></ion-icon>
                    <ion-card-subtitle>Re-order</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    Do you want to re-order this item?
                    <ion-skeleton-text :animated="true" style="width: 80%;"><p>You cant Undo this Action</p></ion-skeleton-text>

                  </ion-card-content>
                  <ion-button expand="block" class="kola-yellow-button" @click="reorderItem(order)" color="yellow">Re-order</ion-button>
                  <ion-button expand="block" class="kola-white-button"  @click="closePopover()" >Cancel</ion-button>

                </ion-card>
                <ion-card v-else-if="selectedAction === 'messageSupplier'">
                  <ion-card-header>
                    <ion-icon :icon="chatbubbleOutline" class="alert-icon"></ion-icon>
                    <ion-card-subtitle>Message Supplier</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                 <h3>  Send a message to the supplier.</h3>
                    <ion-skeleton-text :animated="true" style="width: 80%;"><p>You cant Undo this Action</p></ion-skeleton-text>
                  </ion-card-content>
                  <ion-button expand="block" class="kola-yellow-button" @click="sendMessage(order)" color="yellow">Send Message</ion-button>
                  <ion-button expand="block" class="kola-white-button"  @click="closePopover()" >Cancel</ion-button>
                </ion-card>
                <ion-card v-else-if="selectedAction === 'editOrder'">
                  <ion-card-header>
                    <ion-icon :icon="createOutline" class="alert-icon"></ion-icon>
                    <ion-card-subtitle>Edit Order</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    Edit the order details.
                  </ion-card-content>
                  <ion-button expand="block" class="kola-yellow-button" @click="editOrder(order)" color="yellow">Edit Order</ion-button>
                  <ion-button expand="block" class="kola-white-button"  @click="closePopover()">Cancel</ion-button>
                </ion-card>
                <ion-card v-else-if="selectedAction === 'delete'">
                  <ion-card-header>
                    <ion-icon :icon="trashOutline" class="alert-icon"></ion-icon>
                    <ion-card-subtitle>Delete Order</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    Are you sure you want to delete this order?
                  </ion-card-content>
                  <ion-button expand="block" class="kola-yellow-button" @click="deleteOrder(order)" color="yellow">Delete</ion-button>
                  <ion-button expand="block" class="kola-white-button"  @click="closePopover()" >Cancel</ion-button>
                </ion-card>
              </ion-list>
            </ion-content>
          </ion-popover>
        </ion-icon>
      </ion-item>
    </ion-list>
  </template>

  <script default setup lang="ts">
  /**
   * @deprecated Remove file
   */
  import { defineProps, computed, ref, onMounted, PropType } from 'vue';
  import { IonAvatar, IonBadge, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonContent } from '@ionic/vue';
  import { chatbubbleOutline,sync, createOutline, ellipsisHorizontal, trashOutline } from 'ionicons/icons';
  import { useOrderStore } from '@/stores/OrderStore';
  import { Order} from '@/models/Order';


  const orderstore = useOrderStore();
  const orders = ref([]);
  const props = defineProps({
    orders: {
      type: Array as PropType<Order[]>,
      required: true,
    },
    selectedSegment: String,
  });
  const popoverEvent = ref(null);
  const selectedAction = ref(null);

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

  const showActions = (order: Order, event: null) => {Order
    popoverEvent.value = event;
  };


  const closePopover = () => {
    popoverEvent.value = null;
  };

  const reorderItem = (order: Order) => {

    // orderstore.reorderOrder(order.id);
  };

  const sendMessage = (order: Order) => {

    // orderstore.sendMessageToSupplier(order.id);
  };

  const editOrder = (order: Order) => {

    // orderstore.editOrderDetails(order.id);
  };

  const deleteOrder = (order: Order) => {

    // orderstore.deleteOrder(order.id);
  };

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
  .kola-white-button {
    --background: #FFF !important;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --color: #101828;
    --border-style: solid;
    --border-color: #101828;
    --border-width: 1px;
    --border-radius: 0.8em;
    --box-shadow: none;
    text-transform: none;
    font-weight: 600;
    font-size: 0.75em;
  }
  .badge {
    align-content: center;
    justify-content: center;
  }
  </style>
