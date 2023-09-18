<template>
    <IonList lines="none">
        <NotificationItem
            v-for="notification in notifications"
            :notification="notification"
            :key="notification.id"
        >
        </NotificationItem>
    </IonList>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmarkCircleOutline, checkmark, checkmarkCircle, warningOutline } from 'ionicons/icons';
import NotificationItem from './NotificationItem.vue';


export default defineComponent({

    components: {
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        NotificationItem
    },

    data() {
        return {
            checkmarkCircleOutline,
            checkmark,
            checkmarkCircle,
            warningOutline,
            notifications: [
                { id: 1, title: 'Your account was approved', type: 'order', created_at: '2023-09-17 22:20:20' },
                { id: 2, title: 'Your next order is on the way', type: 'error', created_at: '2023-09-17 20:25:20' }
            ]
        }
    }
})
</script>
