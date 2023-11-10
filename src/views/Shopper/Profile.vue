<template>
  <ion-page>

    <!-- <ShopperHeader></ShopperHeader> -->

    <ProfileManager></ProfileManager>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonButton, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent, IonItem, IonAvatar, IonList } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import { useUserStore } from '@/stores/UserStore';
import ProfileManager from '@/components/profile/ProfileManager.vue';
import { ref } from 'vue';
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
