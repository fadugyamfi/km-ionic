<template>
  <IonHeader class="ion-no-border">
    <ion-toolbar>
      <IonTitle>
        <IonText class="welcome">Welcome {{ userStore.user?.firstName() }} 👋</IonText>
      </IonTitle>

      <IonButtons slot="end">
        <NotificationButton></NotificationButton>
      </IonButtons>
    </ion-toolbar>
  </IonHeader>
</template>

<script lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import NotificationButton from '../notifications/NotificationButton.vue';

export default defineComponent({

  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    NotificationButton
  },

  computed: {
    ...mapStores(useUserStore)
  },

})
</script>

<style lang="scss">
.welcome {
  font-size: 0.8em;
  font-weight: bold;
}
</style>
