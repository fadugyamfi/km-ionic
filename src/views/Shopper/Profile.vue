<template>
  <ion-page>

    <ShopperHeader></ShopperHeader>

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
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonButton, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent, IonItem, IonAvatar, IonList } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import { search, createOutline } from 'ionicons/icons';
import { useUserStore } from '@/stores/UserStore';
import PersonalActions from '@/views/Shopper/Profile/PersonalActions.vue';
import CompanyActions from '@/views/Shopper/Profile/CompanyActions.vue';
import { ref } from 'vue';

const userStore = useUserStore();
const viewing = ref('personal');
</script>

<style lang="scss">
// See @/theme/profile.scss for global styles



ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}


</style>
