<template>
  <IonButton
    expand="block"
    class="intro-btn white ion-margin-bottom"
    @click="share"
  >
    {{ $t("vendor.home.shareYourProfile") }}
  </IonButton>
</template>
<script setup lang="ts">
import { IonButton } from "@ionic/vue";
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
    navigator.share({
      title: `${activeBusiness.value?.name} | Kola Market`,
      text: `${activeBusiness.value?.name} | Kola Market`,
      url: shareUrl.value,
    });
  }
};
</script>
<style lang="scss" scoped>
.intro-btn {
  text-transform: none;
  font-weight: 500;
  font-size: 0.85em;
}
.intro-btn.white {
  --background: #fff;
  --color: #101828;
  --box-shadow: none;
  --border: 0.5px;
  --border-style: solid;
  --border-radius: 8px;
  margin-bottom: 3em;
}
</style>
