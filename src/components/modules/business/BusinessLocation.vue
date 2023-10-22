<template>
  <section class="d-flex ion-align-items-center">
    <IonIcon :icon="locationOutline"></IonIcon>
    <IonText style="color:#728087;">{{ business?.location || 'No Description Available' }}</IonText>
  </section>
</template>

<script lang="ts">
import { IonIcon, IonText } from '@ionic/vue';
import { locationOutline } from 'ionicons/icons';
import { defineComponent, PropType } from 'vue';
import Business from '@/models/Business';

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
    },
  },
  components: { IonIcon, IonText, Business },
  setup() {
    return {
      locationOutline,
    };
  },

  data() {
    return {
      location
    }
  }
});
</script>

<style scoped lang="css">
ion-icon {
  --color: var(--kola-blue);
  --background: #F0F9FF;
  font-size: 1.2em;
  border-radius: 16px;
  margin-right: 3px;
}
</style>
