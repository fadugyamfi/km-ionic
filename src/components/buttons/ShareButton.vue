<template>
  <IonButton slot="icon-only" @click="share()">
    <IonIcon :icon="shareOutline"></IonIcon>
  </IonButton>
</template>
<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { shareOutline } from "ionicons/icons";
import { Share } from "@capacitor/share";
import { computed, PropType } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { Capacitor } from "@capacitor/core";

const route = useRoute();
const props = defineProps({
  title: {
    type: String as PropType<String | null>,
    required: true,
  },
});

const shareUrl = computed(() => `https://m.kola.market${route.fullPath}`);

const share = async () => {
  if (Capacitor.isNativePlatform()) {
    const userStore = useUserStore();
    await Share.share({
      title: `${props.title} | Kola Market`,
      dialogTitle: `${props.title} | Kola Market`,
      text: `${props.title} | Kola Market`,
      url: shareUrl.value,
    });
  } else {
    if (navigator.canShare()) {
      navigator.share({
        title: `${props.title} | Kola Market`,
        text: `${props.title} | Kola Market`,
        url: shareUrl.value,
      });
    }
  }
};
</script>
