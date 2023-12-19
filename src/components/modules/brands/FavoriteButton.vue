<template>
  <IonButton fill="clear" @click.stop="toggleFavorited()">
    <IonIcon
      v-if="!brand?.favorited"
      slot="icon-only"
      :icon="heartOutline"
    ></IonIcon>
    <IonIcon v-else slot="icon-only" :icon="heart"></IonIcon>
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
import Brand from "@/models/Brand";
import { useBrandStore } from "@/stores/BrandStore";
import { useUserStore } from "@/stores/UserStore";
import LoginRequiredSheet from "../LoginRequiredSheet.vue";
import { ref } from "vue";

const props = defineProps({
  brand: Brand,
});

const showFilterSheet = ref(false);
const brandStore = useBrandStore();

const toggleFavorited = () => {
  const userStore = useUserStore();
  if (userStore.isInGuestMode()) {
    showFilterSheet.value = true;
    return;
  }
  if (!props.brand) {
    return;
  }

  if (props.brand.favorited) {
    brandStore.removeFromFavorites(props.brand);
  } else {
    brandStore.addToFavorites(props.brand);
  }
};
</script>
