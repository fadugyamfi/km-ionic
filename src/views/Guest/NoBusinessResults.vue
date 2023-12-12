<template>
    <ion-page>
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/guest/home">
            </ion-back-button>
          </ion-buttons>
          <ion-title size="small"><b>No Search Results </b>
          </ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <section class="ion-padding ion-text-center" style="margin-top: 2em;">
          <img src="/images/disappointed.svg" style="width: 150px; height: 150px;" />
        </section>
  
        <section class="ion-text-center ion-margin-bottom">
          <h5 class="ion-margin-bottom"><b>No Search Results</b></h5>
          <p class="ion-margin-top" style="font-size: 0.88em;">
            No results match your search criteria.
          </p>
        </section>
  
        <ion-button expand="block" fill="solid" color="primary" style="margin-top: 30px;" @click="viewBusinesses">
          View Businesses
        </ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const viewBusinesses = () => {
    router.push('/businesses'); // Redirect to the page where you display businesses
  };
  </script>
