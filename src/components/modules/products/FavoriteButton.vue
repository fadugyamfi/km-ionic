<template>
  <IonButton fill="clear" @click.stop="toggleFavorited()">
    <IonIcon
      v-if="!product?.favorited"
      slot="icon-only"
      :icon="heart"
      style="color: #6d7280"
    ></IonIcon>
    <IonIcon
      v-else
      slot="icon-only"
      style="color: #ef4444"
      :icon="heart"
    ></IonIcon>
    <LoginRequiredSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
    >
    </LoginRequiredSheet>
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { heart, heartOutline } from "ionicons/icons";
import Product from "@/models/Product";
import { useProductStore } from "@/stores/ProductStore";
import { useUserStore } from "@/stores/UserStore";
import LoginRequiredSheet from "../LoginRequiredSheet.vue";
import { ref } from "vue";

const props = defineProps({
  product: Product,
});

const showFilterSheet = ref(false);

const productStore = useProductStore();

const toggleFavorited = () => {
  const userStore = useUserStore();
  if (userStore.isInGuestMode()) {
    showFilterSheet.value = true;
    return;
  }

  if (!props.product) {
    return;
  }

  if (props.product.favorited) {
    productStore.removeFromFavorites(props.product);
  } else {
    productStore.addProductToFavorites(props.product);
  }
};
</script>
