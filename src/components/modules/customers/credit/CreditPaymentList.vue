<template>
  <IonList lines="full" class="customers-select-list simple">
    <CreditListItem
      v-for="(payment, index) in creditPayments"
      :key="payment?.id"
      :credit="payment"
      :showPopover=showPopover
      @click="viewDetails(payment)"
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
              <!-- <ion-item :button="true" lines="full" aria-label="sync">
                <ion-icon
                  slot="start"
                  :icon="sync"
                  aria-hidden="true"
                ></ion-icon>
                Re-order
              </ion-item>
              <ion-item :button="true" lines="full">
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                Message Supplier
              </ion-item>
              <ion-item :button="true" lines="full">
                <ion-icon slot="start" :icon="createOutline"></ion-icon>
                Edit Order
              </ion-item> -->
              <ion-item
                :button="true"
                lines="full"
                @click="deleteCredit(payment)"
              >
                <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                Delete
              </ion-item>
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </CreditListItem>
    <DeleteCreditModal
      :isOpen="showConfirmDeleteModal"
      :creditPayment="selectedCredit"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    ></DeleteCreditModal>
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
import Image from "@/components/Image.vue";
import CreditListItem from "./CreditListItem.vue";
import { SalePayment } from "@/models/SalePayment";
import DeleteCreditModal from "@/components/modules/customers/DeleteCreditModal.vue";
import { useCustomerStore } from "@/stores/CustomerStore";

export default defineComponent({
  props: {
    creditPayments: {
      type: Array as PropType<SalePayment[]>,
      required: true,
    },
    showPopover: {
      type: Boolean,
      default: true,
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
    CreditListItem,
    DeleteCreditModal,
  },

  computed: {
    ...mapStores(useCustomerStore),
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
      selectedCredit: null as SalePayment | null,
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

    deleteCredit(credit: any) {
      this.selectedCredit = credit;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      await this.customerStore.deleteCreditPayment(
        this.selectedCredit?.id as number
      );
    },

    viewDetails(payment: SalePayment) {
      this.$emit("view-details", payment);
      this.$router.push(`/vendor/orders/${payment.id}`);
    },
  },
});

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
.customers-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    --padding-start: 0px;
  }

  ion-item ion-chip {
    --background: #eaecf5;
    --color: #304296;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
    margin-top: 0px;

    ion-text {
      margin-bottom: 5px !important;
      font-size: 12px;
    }
  }

  ion-text {
    font-size: 14px;
    color: #787486 !important;
  }

  ion-item ion-label p {
    font-weight: 500;
    color: #111;
    margin-bottom: 5px;
  }
}
.momo {
  max-width: 20px;
  margin-left: 5px;
}
ion-item::part(native).item-inner {
  padding-right: 0px;
  --padding-end: 0px;
}
</style>
