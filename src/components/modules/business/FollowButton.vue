<template>
  <IonButton class="kola-white-button" type="button" fill="clear" @click.stop="toggleFollowed()">
    <slot>{{ title }}</slot>
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import Business from '@/models/Business';
import { useBusinessStore } from '@/stores/BusinessStore';
import { ref, defineProps, onBeforeMount } from 'vue';

const props = defineProps({
  business: Business
});

const businessStore = useBusinessStore();
const title = ref(props.business?.favorited ? 'Unfollow' : 'Follow');

const toggleFollowed = () => {
  if (!props.business) {
    return;
  }

  if (title.value === 'Follow') {
    title.value = 'Unfollow';
    businessStore.addToFavorites(props.business);

  } else {
    title.value = 'Follow';
    businessStore.removeFromFavorites(props.business);
  }
};

onBeforeMount(() => {
  if (props.business && props.business.favorited) {
    title.value = 'Unfollow';
  }
});
</script>

<style scoped lang="css">
ion-button {
  --background: #FFF !important;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 32px !important;
  --padding-end: 32px !important;
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
