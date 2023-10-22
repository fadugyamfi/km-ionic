<template>
    <section class="supplier-pill">
      <IonAvatar>
        <Image :alt="supplier.name" :src="supplier.logo" />
      </IonAvatar>
      <p>{{ supplier.name }}</p>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonAvatar } from '@ionic/vue';
  import Business from '@/models/Business';
  import Image from '@/components/Image.vue';
  
  export default defineComponent({
    props: {
      supplier: {
        required: true,
        type: Business,
      },
    },
  
    components: { IonAvatar, Image },
  
    data() {
      return {};
    },
  });
  </script>
  
  <style lang="scss">
  .supplier-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80px;
    padding: 10px;
  
    ion-avatar {
      width: 60px;
      height: 60px;
  
      img {
        width: 60px !important;
        height: 60px !important;
        object-fit: cover;
      }
    }
  
    p {
      margin-top: 5px;
      font-size: 0.6em;
      line-height: 1em;
      text-wrap: wrap;
      text-overflow: ellipsis;
    }
  }
  </style>
  