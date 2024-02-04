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

    props: ['notifications'],

    components: {
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        NotificationItem
    },

    emits: ['notification-clicked'],

    data() {
        return {
            checkmarkCircleOutline,
            checkmark,
            checkmarkCircle,
            warningOutline,
        }
    }
})
</script>
