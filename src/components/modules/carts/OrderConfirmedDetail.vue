<template>
  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <!-- <Image style="width: 32px;" src="/img/icons/group.svg"></Image> -->
            <IonLabel style="margin-left: 8px">
              <p class="fw-bold">Order Confirmed</p>
              <IonText color="medium" class="font-medium">
                Supplier will prepare your order shortly
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>

  <section>
    <OrderStatusHistoryView :order="order"></OrderStatusHistoryView>
  </section>

  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonItem>
          <IonLabel class="font-medium">
            Order summary:
            <span class="order-no"> Order No.{{ order?.businesses_id }}</span>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="font-color ion-text-wrap">
            You are responsible for 10% tax on this item.
            <span class="learn-more">
              Learn More
            </span>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  </section>

  <section>
    <CartOrderTotalCard :order="(order as Order)"></CartOrderTotalCard>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Filters from "@/utilities/Filters";
import { Order } from "@/models/Order";
import { useCartStore } from "@/stores/CartStore";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import CartOrderTotalCard from "@/components/cards/CartOrderTotalCard.vue";
import Image from "@/components/Image.vue";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonIcon,
  IonText,
} from "@ionic/vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";

// const router = useRouter();
// const route = useRoute();

// const orderBusiness = ref<any>(null);
// const orders = computed(() => cartStore.orders);
// const order = computed<Order>(() => {
//   return cartStore.orders.find(
//     (order: Order) => order?.businesses_id == +route.params.id
//   ) as Order;
// });

// const cartStore = useCartStore(orderBusiness.value);

// cartStore.loadFromStorage();
// const cartOrders = computed(() => cartStore.orders);

export default defineComponent({
  props: {
    order: {
      type: Order,
    },
    showChangeAddress: {
      default: true,
    },
    showChangeDate: {
      default: true,
    },
  },
  data() {
    return {
      Filters,
    };
  },
  setup() {
    const getIconForStatus = (status: string) => {
      if (status === "Confirmed") {
        return "checkmark-circle";
      } else if (status === "Out for Delivery") {
        return "truck";
      } else if (status === "Delivered") {
        return "checkmark-done";
      } else {
        return "alert-circle";
      }
    };

    return {
      getIconForStatus,
    };
  },
  components: {
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonIcon,
    OrderStatusHistoryView,
    CartOrderTotalCard,
    Image,
    ProfileAvatar,
    IonText,
  },
});
</script>
<style scoped lang="scss">
.learn-more {
  color: #666eed !important;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.font-color {
  color: #5c626f;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  /* 16.8px */
}

.order-no {
  color: #6b7785;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
</style>
