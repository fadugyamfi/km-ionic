<template>
  <IonHeader class="ion-no-border">
    <ion-toolbar>
      <IonTitle>
        <IonText class="welcome">Welcome {{ userStore.user?.firstName() }} 👋</IonText>
      </IonTitle>

      <IonButtons slot="end">
        <IonButton @click="showNotifications()">
          <IonIcon :icon="notifications"></IonIcon>
        </IonButton>
      </IonButtons>
    </ion-toolbar>
  </IonHeader>
</template>

<script lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import { notifications } from 'ionicons/icons';
import NotificationsModal from '@/components/notifications/NotificationsModal.vue';

export default defineComponent({

  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    NotificationsModal
  },

  computed: {
    ...mapStores(useUserStore)
  },

  data() {
    return {
      notifications
    }
  },

  methods: {
    async showNotifications() {
      const modal = await modalController.create({
        component: NotificationsModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        // message.value = `Hello, ${data}!`;
      }
    }
  }
})
</script>

<style lang="scss">
.welcome {
  font-size: 0.8em;
  font-weight: bold;
}
</style>
