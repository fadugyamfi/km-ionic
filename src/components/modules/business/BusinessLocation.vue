<template>
    <section>
      <IonIcon :icon="'location'" color="medium" />
      {{ business?.location || 'No Description Available' }}
    </section>
  </template>
  
  <script lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { PropType, defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      business: {
        type: Object as PropType<any | null>,
      },
    },
  
    components: { IonIcon },
  });
  </script>
<style lang="css">
ion-icon {
    --color: var(--kola-blue);
    --background: #F0F9FF;
    font-size: 0.8em;
    border-radius: 16px;
    padding: 6px 10px 6px 10px;
    margin-right: 3px;
    height: auto;
}

</style>  