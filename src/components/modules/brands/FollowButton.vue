<template>
  <IonButton class="kola-white-button" type="button" fill="clear" @click.stop="toggleFollowed()">
    <slot>{{ title }}</slot>
  </IonButton>
</template>
<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import Brand from '@/models/Brand';
import { useBrandStore } from '@/stores/BrandStore';
import { ref, defineProps, onBeforeMount, PropType, computed } from 'vue';

const props = defineProps({
  brand: {
    type: Object as PropType<Brand | null>
  }
});

const brandStore = useBrandStore();
const title = computed(() => props.brand?.favorited ? 'Unfollow' : 'Follow');

const toggleFollowed = () => {
  if (!props.brand) {
    return;
  }

  if (!props.brand.favorited) {
    brandStore.addToFavorites(props.brand);
  } else {
    brandStore.removeFromFavorites(props.brand);
  }
};

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
