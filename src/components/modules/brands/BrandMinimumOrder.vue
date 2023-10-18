<template>
  <section>
    <IonChip v-for="tag in brand.tags" :key="tag">
      {{ tag }}
    </IonChip>
  </section>
</template>

<script lang="ts">
import { IonChip } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import Brand from '@/models/Brand';

export default defineComponent({
  props: {
    brand: {
      type: Object as PropType<Brand | null>,
    },
  },

  components: { IonChip },

  data() {
    return {
      brand: {
        tags: ['Homemade', 'Retails'],
      },
    };
  },
});
</script>

<style lang="css">
ion-chip {
  --color: var(--kola-blue);
  --background: #F0F9FF;
  font-size: 0.8em;
  border-radius: 16px;
  padding: 6px 10px 6px 10px;
  margin-right: 3px;
  height: auto;
}
</style>
