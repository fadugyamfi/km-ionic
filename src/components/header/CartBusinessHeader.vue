<template>
    <IonHeader class="inner-header">
      <IonToolbar class="ion-align-items-center">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/shopper/home"></IonBackButton>
        </IonButtons>
        <IonTitle size="small" class="fw-bold">
          Cart
        </IonTitle>
        <IonButtons slot="end">
          <NotificationButton></NotificationButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  </template>
  
  <script lang="ts">
  import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';
  import NotificationButton from '@/components/notifications/NotificationButton.vue';
  
  export default {
    components: {
       
      NotificationButton,
      IonTitle,
      IonButtons,
      IonHeader,
      IonBackButton,
      IonToolbar,
    },
  };
  </script>

<style scoped="scss">
ion-title {
  color: #000;
font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 140%; 
}

</style>

  