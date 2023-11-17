<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 1]">
    <IonContent>

    <section>
      <OrderConfirmedDetail :order="(order as Order)"></OrderConfirmedDetail>
    </section>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonCol,
  IonContent,
  IonCard,
  IonFooter,
  IonGrid,
  IonInput,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/vue";
import { defineComponent, ref, toRefs } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { useCartStore } from "@/stores/CartStore";
import OrderConfirmedDetail from "@/components/modules/carts/OrderConfirmedDetail.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Order } from "@/models/Order";


interface FormData {
  fields: {
    delivery_location: string;
  };
  errors: Record<string, string | null>;
}

export default defineComponent({
  props:{
    order: {
      type: Order,
      required: true
    }
  },
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonCard,
    OrderConfirmedDetail
  },
  setup() {

    const form = ref<FormData>({
      fields: {
        delivery_location: "",
      },
      errors: {},
    });

    const router = useRouter();
    const route = useRoute();
    const cartStore = useCartStore();

    const storeDeliveryAddress = () => {
      const index = cartStore.orders.findIndex(
        (b) => b.businesses_id == Number(route.params.id)
      );
      cartStore.orders[index] = {
        ...cartStore.orders[index],
        ...form.value.fields,
      };
      router.push(`/shopper/cart/business/${route.params.id}/item-review`);
    };

    return {
      form,
      storeDeliveryAddress,
    };
  },
});
</script>

<style scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}

ion-input {
  --padding-start: 0.4em;
  --padding-end: 0.4em;
}
</style>
