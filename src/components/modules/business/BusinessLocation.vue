<template>
  <section>
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
});
</script>

<style lang="css">
ion-icon {
  --color: var(--kola-blue);
  --background: #F0F9FF;
  font-size: 1.2em; 
  border-radius: 16px;
  padding: 6px 10px 6px 10px;
  margin-right: 3px;
  height: auto;
}
</style>
