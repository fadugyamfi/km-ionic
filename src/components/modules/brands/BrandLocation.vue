<template>
  <section>
    <IonIcon :icon="'location'" color="medium" />
    {{ brand?.location || 'No Description Available' }}
  </section>
  <section>

    <IonText />
    {{ brand?.deliverytime || 'Fulfills orders within 1-3 fays' }}
  </section>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';


export default defineComponent({
  props: {
    brand: {
      type: Object as PropType<any | null>,
    },
  },

  components: { IonIcon },
});
</script>


