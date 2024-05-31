<template>
  <IonList lines="full">
    <ReceivedOrderListItem
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
                v-if="order?.isPendingApproval()"
                @click="confirmApproval(order)"
              >
                <ion-icon
                  slot="start"
                  :icon="checkmark"
                  aria-hidden="true"
                ></ion-icon>
                {{ $t("general.accept") }}
              </ion-item>
              <ion-item
                :button="true"
                lines="full"
                v-if="order?.isPendingApproval()"
                @click="confirmCancellation(order)"
              >
                <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
                {{ $t("general.cancel") }}
              </ion-item>
              <ion-item :button="true" lines="full" :disabled="true">
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                {{ $t("vendor.orders.messageCustomer") }}
              </ion-item>
              <ion-item :button="true" lines="full" @click="deleteOrder(order)">
                <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                {{ $t("general.delete") }}
              </ion-item>
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </ReceivedOrderListItem>

    <ConfirmModal
      :isOpen="showConfirm"
      :description="confirmDescription"
      @confirm="doConfirm()"
      @dismiss="showConfirm = false"
    ></ConfirmModal>

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
  checkmark,
  closeCircleOutline,
  ellipsisHorizontal,
  trashOutline,
} from "ionicons/icons";
import { useOrderStore } from "@/stores/OrderStore";
import { Order } from "@/models/Order";
import { mapStores } from "pinia";
import filters from "@/utilities/Filters";
import Image from "@/components/Image.vue";
import ReceivedOrderListItem from "./ReceivedOrderListItem.vue";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import ConfirmModal from "../../modals/ConfirmModal.vue";
import { useUserStore } from "@/stores/UserStore";

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
    ReceivedOrderListItem,
    DeleteModal,
    ConfirmModal,
  },

  computed: {
    ...mapStores(useOrderStore, useToastStore, useUserStore),
    isVendorMode() {
      return this.userStore.appMode == "vendor";
    },
  },

  data() {
    return {
      chatbubbleOutline,
      closeCircleOutline,
      ellipsisHorizontal,
      trashOutline,
      checkmark,
      event: null as any,
      openPopover: -1,
      selectedOrder: null as Order | null,
      showConfirmDeleteModal: false,
      showConfirm: false,
      confirmDescription: "",
      confirmAction: "",
      actionOrder: null as Order | null,
      filters,
    };
  },

  methods: {
    getStatusInfo(orderStatusId?: number) {
      switch (orderStatusId) {
        case 1:
          return {
            color: "primary",
            label: "Processing",
          };
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          return {
            color: "warning",
            label: "Pending",
          };
        case 7:
          return {
            color: "success",
            label: "Completed",
          };
        case 8:
        case 9:
        case 10:
          return {
            color: "danger",
            label: "Cancelled",
          };
        default:
          return {
            color: "medium",
            label: "Default",
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
      const response = await this.orderStore.deleteOrder(
        this.selectedOrder?.id as number
      );
    },

    viewDetails(order: Order) {
      this.orderStore.selectedOrder = order;
      this.closeMenu();
      this.$emit("view-details", order);
      if (this.isVendorMode) {
        this.$router.push(`/vendor/orders/${order.id}`);
        return;
      }
      this.$router.push(`/shopper/orders/${order.id}`);
    },

    confirmApproval(order: Order) {
      this.actionOrder = order;
      this.confirmAction = "approve";
      this.confirmDescription = "Are you sure you want approve this order?";
      this.showConfirm = true;
    },

    confirmCancellation(order: Order) {
      this.actionOrder = order;
      (this.confirmAction = "cancel"),
        (this.confirmDescription = "Are you sure you want cancel this order?");
      this.showConfirm = true;
    },

    doConfirm() {
      this.showConfirm = false;

      if (this.confirmAction == "approve") {
        this.approveOrder(this.actionOrder as Order);
        return;
      }

      this.cancelOrder(this.actionOrder as Order);
    },

    async approveOrder(order: Order) {
      try {
        const response = await this.orderStore.approveOrder(order);

        this.toastStore.showSuccess(
          this.$t("vendor.orders.orderHasBeenApproved"),
          "",
          "bottom",
          "vendorTabs"
        );
      } catch (error) {
        handleAxiosRequestError(error);
        this.toastStore.showError(
          this.$t("vendor.orders.anErrorOccured"),
          "",
          "bottom",
          "vendorTabs"
        );
      }
    },

    async cancelOrder(order: Order) {
      try {
        const response = await this.orderStore.cancelOrder(order);

        this.toastStore.showSuccess(
          this.$t("vendor.orders.orderHasBeenCanceled"),
          "",
          "bottom",
          "vendorTabs"
        );
      } catch (error) {
        handleAxiosRequestError(error);
        this.toastStore.showError(
          this.$t("vendor.orders.anErrorOccured"),
          "",
          "bottom",
          "vendorTabs"
        );
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
