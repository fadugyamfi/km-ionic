<template>
    <IonButton class="kola-white-button" type="button"  fill="clear" @click.stop="toggleFollowed()">
        <slot>{{title}}</slot>
   
    </IonButton>
  </template>
  
  <script setup lang="ts">
  import { IonButton, IonIcon } from '@ionic/vue';
  import { heart, heartOutline } from 'ionicons/icons';
  import Business from '@/models/Business';
  import { useBusinessStore } from '@/stores/BusinessStore';
  import {ref} from 'vue';
  
  const props = defineProps({
      Business: Business
  })
  
  const BusinessStore = useBusinessStore();
  const title = ref("Follow");
  
  
  const toggleFollowed = () => {
      if( !props.Business ) {
          return;
      }
  
      if(title.value === 'Follow') {
        title.value = 'Unfollow';
      } else {
        title.value = 'Follow';
      }
  }
  </script>
  <style scoped lang="css">
  
  ion-button {
    --background: #FFF !important;
    --padding-top: 8px;
    --padding-bottom: 8px;
    --padding-start: 32px !important;
    --padding-end: 32px !important;
    --color: #101828;
    --border-style: solid;
    --border-color: #101828;
    --border-width: 1px;
    --border-radius: 0.8em;
    --box-shadow: none;
    text-transform: none;
    font-weight: 600;
    font-size: 0.75em;
  }
  </style>