<template>
    <ion-content class="ion-padding" :fullscreen="true">
      <ion-header class="inner-header ion-margin-bottom">
        <ion-toolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <ion-title>Profile</ion-title>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon :icon="search"></IonIcon>
            </IonButton>
          </IonButtons>
        </ion-toolbar>
      </ion-header>

      <IonSegment value="personal" mode="ios" v-model="viewing">
        <IonSegmentButton value="personal">
          <IonLabel>Personal</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="company">
          <ion-label>Company</ion-label>
        </IonSegmentButton>
      </IonSegment>



      <PersonalActions v-if="viewing == 'personal'"></PersonalActions>
      <CompanyActions v-if="viewing == 'company'"></CompanyActions>

    </ion-content>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { useUserStore } from '@/stores/UserStore';
import PersonalActions from '@/components/profile/PersonalActions.vue';
import CompanyActions from '@/components/profile/CompanyActions.vue';
import { ref } from 'vue';

const userStore = useUserStore();
const viewing = ref('personal');
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
