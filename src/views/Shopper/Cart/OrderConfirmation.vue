<template>
  <IonPage>
    <section class="ion-padding">
      <OrderCloseHeader />
    </section>

    <IonContent>
      <IonCard class="ion-no-border">
        <IonCardContent>
          <section class="ion-padding ion-text-center">
            <IonImg
              :src="'/images/vendor/sale-confirmation-smiley.svg'"
            ></IonImg>
            <IonLabel class="fw-bolds">
              Order #{{ order?.id }} <span>confirmed</span>
            </IonLabel>
          </section>
          <section class="ion-padding ion-text-center" style="margin-top: -27px">
          <IonLabel class="fw-bold">
              {{ $t("shopper.cart.confirmTime") }}
            </IonLabel>
            </section>
          <KolaYellowButton @click="toggleFilterSheet">
            {{ $t("shopper.cart.trackOrder") }}
          </KolaYellowButton>
          <KolaWhiteButton @click="placeNewOrder">
            {{ $t("shopper.cart.placeNewOrder") }}
          </KolaWhiteButton>
          <OrderConfirmSheet
            :isOpen="showFilterSheet"
            @didDismiss="showFilterSheet = false"
            :order="order"
          ></OrderConfirmSheet>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import {
  IonPage,
  IonContent,
  IonImg,
  IonLabel,
  IonCard,
  IonCardContent,
} from "@ionic/vue";

import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import OrderCloseHeader from "@/components/header/OrderCloseHeader.vue";
import OrderConfirmSheet from "@/components/modules/carts/OrderConfirmSheet.vue";
import { useCartStore } from "@/stores/CartStore";
import { useRoute, useRouter } from "vue-router";
import { Order } from "@/models/Order";

export default defineComponent({
  props: {
    order: {
      type: Order,
      required: true,
    },
  },
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonImg,
    IonLabel,
    KolaYellowButton,
    KolaWhiteButton,
    OrderCloseHeader,
    OrderConfirmSheet,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartStore();

    const showFilterSheet = ref(false);
    const toggleFilterSheet = () => {
      showFilterSheet.value = !showFilterSheet.value;
    };
    const placeNewOrder = () => {
      router.push("/shopper/cart/business");
    };
    const order = computed(() => cartStore.placedOrder);

    return {
      showFilterSheet,
      toggleFilterSheet,
      placeNewOrder,
      route,
      router,
      order,
    };
  },
});
</script>

<style scoped>
ion-card {
  box-shadow: none;
  border: none;
}

ion-card-content {
  background-image: url("/images/vendor/sale-confirmation-bg.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
}

ion-img {
  height: 150px;
  margin-top: 100px;
}

.fw-bolds{
  color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 28px; 
}
</style>

