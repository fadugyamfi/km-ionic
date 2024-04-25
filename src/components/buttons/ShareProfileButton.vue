<template>
  <IonButton
    class="kola-white-button"
    type="button"
    fill="clear"
    @click="share"
  >
    <IonIcon :icon="shareOutline"></IonIcon>
    <ion-text>{{ $t("vendor.home.share") }}</ion-text>
  </IonButton>
</template>
<script setup lang="ts">
import { IonButton, IonIcon, IonText } from "@ionic/vue";
import { shareOutline } from "ionicons/icons";
import { Share } from "@capacitor/share";
import { computed } from "vue";
import { Capacitor } from "@capacitor/core";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const activeBusiness = computed(() => userStore.activeBusiness);

const shareUrl = computed(
  () => `/guest/home/businesses/${activeBusiness.value?.id}`
);

const share = async () => {
  if (Capacitor.isNativePlatform()) {
    await Share.share({
      title: `${activeBusiness.value?.name} | Kola Market`,
      dialogTitle: `${activeBusiness.value?.name} | Kola Market`,
      text: `${activeBusiness.value?.name} | Kola Market`,
      url: shareUrl.value,
    });
  } else {
    await navigator.share({
      title: `${activeBusiness.value?.name} | Kola Market`,
      text: `${activeBusiness.value?.name} | Kola Market`,
      url: shareUrl.value,
    });
  }
};
</script>
<style lang="scss" scoped>
ion-button {
  --background: #fff !important;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 10px !important;
  --padding-end: 10px !important;
  --color: #101828;
  --border-style: solid;
  --border-color: #101828;
  --border-width: 1px;
  --border-radius: 0.8em;
  --box-shadow: none;
  height: 34px !important;
  text-transform: none;
  font-weight: 500;
  font-size: 0.85em;

  ion-icon {
    font-size: 16px;
    margin-right: 5px;
  }

  ion-text {
    margin-top: 1px;
  }
}
</style>
