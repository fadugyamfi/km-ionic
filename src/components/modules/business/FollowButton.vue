<template>
  <IonButton
    class="kola-white-button"
    type="button"
    fill="clear"
    @click.stop="toggleFollowed()"
  >
    <slot>{{ title }}</slot>
    <LoginRequiredSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
    >
    </LoginRequiredSheet>
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import Business from "@/models/Business";
import { useBusinessStore } from "@/stores/BusinessStore";
import { ref, defineProps, onBeforeMount, PropType, computed } from "vue";
import LoginRequiredSheet from "../LoginRequiredSheet.vue";
import { useUserStore } from "@/stores/UserStore";

const props = defineProps({
  business: {
    type: Object as PropType<Business | null>,
  },
});

const businessStore = useBusinessStore();
const showFilterSheet = ref(false);

const title = computed(() =>
  props.business?.favorited ? "Unfollow" : "Follow"
);

const toggleFollowed = () => {
  const userStore = useUserStore();
  if (userStore.isInGuestMode()) {
    showFilterSheet.value = true;
    return;
  }
  if (!props.business) {
    return;
  }

  if (title.value === "Follow") {
    businessStore.addToFavorites(props.business);
  } else {
    businessStore.removeFromFavorites(props.business);
  }
};
</script>

<style scoped lang="css">
ion-button {
  --background: #fff !important;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 16px !important;
  --padding-end: 16px !important;
  --color: #101828;
  --border-style: solid;
  --border-color: #101828;
  --border-width: 1px;
  --border-radius: 0.8em;
  --box-shadow: none;
  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;
}
</style>
