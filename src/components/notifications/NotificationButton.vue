<template>
    <IonButton @click="showNotifications()">
        <IonIcon :icon="notifications"></IonIcon>
    </IonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificationsModal from './NotificationsModal.vue';
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import { notifications } from 'ionicons/icons';

export default defineComponent({

    components: {
        IonButton,
        NotificationsModal,
        IonIcon
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
});
</script>
