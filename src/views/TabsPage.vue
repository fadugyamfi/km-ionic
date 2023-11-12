<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <NavTabs></NavTabs>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import NavTabs from '@/components/layout/NavTabs.vue';
</script>
