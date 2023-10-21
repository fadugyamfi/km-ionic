<template>
  <section>
    <ion-text style="color: #6B7785;">
      {{ 'Fulfills orders within 1-3 days' }}
    </ion-text>
  </section>
</template>

<script lang="ts">
import { IonText } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import Business from '@/models/Business';

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
    },
  },

  components: { IonText, Business },
});
</script>

<style lang="css">

.ion-text {
  --color: var(--kola-blue);
  --background: #F0F9FF;
  font-size: 1em;
  border-radius: 16px;
  padding: 6px 10px 6px 10px;
  margin-right: 3px;
  height: auto;
  text-decoration-color: #6B7785;
}
</style>
