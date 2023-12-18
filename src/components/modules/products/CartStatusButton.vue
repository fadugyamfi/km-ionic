<template>
  <IonButton fill="clear" @click="goToCart()">
    <IonIcon slot="icon-only" :icon="cartOutline"></IonIcon>
    <IonBadge>
      {{ cartStore.orders?.length }}
    </IonBadge>

    <ConfirmModal
      :is-open="confirmSwitch"
      :title="'Switching To Shopping Mode'"
      :description="'Are you sure you want to continue'"
      @confirm="switchAndGoToCart()"
      @dismiss="confirmSwitch = false"
    ></ConfirmModal>
  </IonButton>
  <LoginRequiredSheet
    :isOpen="showFilterSheet"
    @didDismiss="showFilterSheet = false"
  >
  </LoginRequiredSheet>
</template>

<script setup lang="ts">
import { IonBadge, IonButton, IonIcon } from "@ionic/vue";
import { cartOutline } from "ionicons/icons";
import Product from "@/models/Product";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/CartStore";
import { useUserStore } from "@/stores/UserStore";
import ConfirmModal from "../../modals/ConfirmModal.vue";
import { ref } from "vue";
import LoginRequiredSheet from "../LoginRequiredSheet.vue";

const props = defineProps({
  product: Product,
});

const confirmSwitch = ref(false);
const showFilterSheet = ref(false);

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();
cartStore.loadFromStorage();

const goToCart = () => {
  if (userStore.isInGuestMode()) {
    showFilterSheet.value = true;
    return;
  }
  if (!userStore.isInShoppingMode()) {
    confirmSwitch.value = true;
    return;
  }

  router.push("/shopper/cart");
};

const switchAndGoToCart = () => {
  userStore.setAppModeAsShopping();
  goToCart();
};
</script>

<style scoped lang="scss">
ion-button {
  position: relative;

  ion-badge {
    --background: #003366;
    position: absolute;
    font-size: 0.5em;
    top: -2px;
    right: -5px;
  }
}
</style>
