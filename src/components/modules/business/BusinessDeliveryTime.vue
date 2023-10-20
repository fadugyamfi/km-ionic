<template>
  <section>
    <ion-chip>
      {{ business?.deliverytime || 'Fulfills orders within 1-3 days' }}
    </ion-chip>
  </section>
</template>

<script lang="ts">
import { IonChip } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import Business from '@/models/Business';

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
    },
  },

  components: { IonChip },
});
</script>

<style lang="css">
ion-chip {
  --color: var(--kola-blue);
  --background: #F0F9FF;
  font-size: 1em;
  border-radius: 16px;
  padding: 6px 10px 6px 10px;
  margin-right: 3px;
  height: auto;
}
</style>
