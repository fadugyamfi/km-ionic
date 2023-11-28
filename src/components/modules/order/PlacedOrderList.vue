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
import { defineProps, computed, PropType, ref, defineComponent } from "vue";
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
    ...mapStores(useOrderStore, useCartStore),
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
      this.$emit("view-details", order);
      this.$router.push(`/shopper/orders/${order.id}`);
    },
    reOrder(order: Order) {
      this.cartStore.reOrder(order);
    },
    editOrder(order: Order) {
      this.$router.push(`/shopper/orders/${order.id}/edit-order`);
      this.closeMenu();
    },
    canUpdate(order: Order): Boolean {
      if (order.order_status_id == 1 || order.order_status_id == 2) {
        return true;
      } else {
        return false;
      }
    },
    canReorder(order: Order): Boolean {
      if (order.order_status_id == 7) {
        return true;
      } else {
        return false;
      }
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
