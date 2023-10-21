<template>
  <IonButton class="kola-white-button" type="button" fill="clear" @click.stop="toggleFollowed" :disabled="!isFollowed">
    {{ buttonLabel }}
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import Business from '@/models/Business';
import { useBusinessStore } from '@/stores/BusinessStore';
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
  Business: Business
});

const businessStore = useBusinessStore();
const buttonLabel = ref("Follow");
const isFollowed = ref(false);

const toggleFollowed = () => {
  if (!props.Business) {
    return;
  }

  if (isFollowed.value) {
    buttonLabel.value = 'Follow';
    businessStore.removeFromFavorites(props.Business);
    isFollowed.value = false;
  } else {
    buttonLabel.value = 'Unfollow';
    businessStore.addToFavorites(props.Business);
    isFollowed.value = true;
  }
};

onMounted(() => {
  if (props.Business && props.Business.favorited) {
    buttonLabel.value = 'Unfollow';
    isFollowed.value = true;
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
  font-size: 1em; /* Adjust the font size here */
}
</style>
