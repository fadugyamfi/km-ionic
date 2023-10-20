<template>
    <section>
      <IonChip v-for="tag in business.tags" :key="tag">
        {{ tag }}
      </IonChip>
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
    components: { IonChip },    data() {
      return {
        business: {
          tags: ['Eco-friendly', 'Retails','Homemade','Free Delivery'],
        },
      };
    },
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
