<template>
  <IonList lines="full">
    <PlacedOrderListItem
      v-for="(order, index) in orders"
      :key="order.id"
      :order="order"
      @click="viewDetails(order)"
      @openMenu="openMenu($event, index)"
    >
      <template v-slot:popover>
        <IonPopover
          :event="event"
          :isOpen="openPopover == index"
          @didDismiss="openPopover = -1"
        >
          <IonContent class="ion-no-padding">
            <IonList lines="full" class="ion-no-padding">
              <ion-item
                :button="true"
                lines="full"
                aria-label="sync"
                :disabled="!canReorder(order)"
                @click="reOrder(order)"
              >
                <ion-icon
                  slot="start"
                  :icon="sync"
                  aria-hidden="true"
                ></ion-icon>
                {{ $t("general.reorder") }}
              </ion-item>
              <ion-item :button="true" lines="full" :disabled="true">
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                {{ $t("vendor.orders.messageSupplier") }}
              </ion-item>
              <ion-item
                :button="true"
                lines="full"
                :disabled="!canUpdate(order)"
                @click="editOrder(order)"
              >
                <ion-icon slot="start" :icon="createOutline"></ion-icon>
                {{ $t("general.edit") }}
              </ion-item>
              <ion-item :button="true" lines="full" @click="deleteOrder(order)">
                <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                {{ $t("general.delete") }}
              </ion-item>
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </PlacedOrderListItem>

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
import { PropType, defineComponent } from "vue";
import {
  IonAvatar,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonContent,
  IonSkeletonText,
  IonButton,
  IonChip,
  IonText,
} from "@ionic/vue";
import {
  chatbubbleOutline,
  createOutline,
  ellipsisHorizontal,
  trashOutline,
} from "ionicons/icons";
import { create } from "ionicons/icons";
import { trash } from "ionicons/icons";
import { sync } from "ionicons/icons";
import { chatbubble } from "ionicons/icons";
import { useOrderStore } from "@/stores/OrderStore";
import { Order } from "@/models/Order";
import { mapStores } from "pinia";
import filters from "@/utilities/Filters";
import Image from "../../Image.vue";
import PlacedOrderListItem from "./PlacedOrderListItem.vue";
import DeleteModal from "../../modals/DeleteModal.vue";
import { useCartStore } from "@/stores/CartStore";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  props: {
    orders: {
      type: Array as PropType<Order[]>,
      required: true,
    },
  },

  components: {
    IonAvatar,
    IonBadge,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPopover,
    IonContent,
    IonSkeletonText,
    IonButton,
    IonChip,
    IonText,
    Image,
    PlacedOrderListItem,
    DeleteModal,
  },

  computed: {
    ...mapStores(useOrderStore, useCartStore, useToastStore),
  },

  data() {
    return {
      sync,
      create,
      trash,
      chatbubble,
      chatbubbleOutline,
      createOutline,
      ellipsisHorizontal,
      trashOutline,
      event: null as any,
      openPopover: -1,
      selectedOrder: null as Order | null,
      showConfirmDeleteModal: false,
      filters,
    };
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

    deleteOrder(order: Order) {
      this.selectedOrder = order;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      await this.orderStore.deleteOrder(this.selectedOrder?.id as number);
    },

    viewDetails(order: Order) {
      this.orderStore.selectedOrder = order;
      this.$emit("view-details", order);
      this.$router.push(`/shopper/orders/${order.id}`);
    },

    async reOrder(order: Order) {
      this.closeMenu();
      const toastStore = useToastStore();
      try {
        toastStore.blockUI("");
        const orderReorder = await this.orderStore.fetchOrder(Number(order.id));
        if (orderReorder) {
          toastStore.unblockUI();
          this.cartStore.reOrder(orderReorder);
          this.$router.push("/shopper/cart/business");
        } else {
          toastStore.showError(
            "Failed to Reorder. Please try again",
            "",
            "bottom",
            "footer"
          );
        }
      } catch (error) {
        toastStore.unblockUI();
      }
    },

    editOrder(order: Order) {
      this.orderStore.selectedOrder = order;
      this.$router.push(`/shopper/orders/${order.id}/edit-order`);
      this.closeMenu();
    },

    canUpdate(order: Order): Boolean {
      return order.order_status_id == 1 || order.order_status_id == 2;
    },

    canReorder(order: Order): Boolean {
      return order.order_status_id as number >= 7 && order.order_status_id !== 11;
    },
  },
});
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

ion-popover {
  ion-item {
    font-size: 0.9em;
  }
}
</style>
