<template>
    <ion-list>
      <ion-item v-for="product in products" :key="product.id">
        <!-- Display product details here -->
        <ion-label>
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </template>
  
  <script lang="ts">
  import { IonList, IonItem, IonLabel } from '@ionic/vue';
  import { defineComponent, PropType } from 'vue';
  import Product from '@/models/Product';
  
  export default defineComponent({
    props: {
      products: {
        required: true,
        type: Array as PropType<Array<Product>>,
      },
    },
    components: { IonList, IonItem, IonLabel },
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  