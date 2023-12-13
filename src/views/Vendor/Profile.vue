
<template>
  <ion-page>
    <ProfileManager></ProfileManager>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import ProfileManager from '@/components/profile/ProfileManager.vue';
import ModeToggleCard from '../../components/cards/ModeToggleCard.vue';
</script>

<style scoped lang="scss">
// See @/theme/profile.scss for global styles



ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}


</style>
