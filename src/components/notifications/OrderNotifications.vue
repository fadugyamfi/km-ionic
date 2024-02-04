<template>
    <IonList lines="none">
        <NotificationItem
            v-for="notification in notifications"
            :notification="notification"
            :key="(notification.id as number)"
            @click="viewOrder(notification)"
        >
        </NotificationItem>
    </IonList>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmarkCircleOutline, checkmark, checkmarkCircle, warningOutline } from 'ionicons/icons';
import NotificationItem from './NotificationItem.vue';
import Notification from '../../models/Notification';
import { PropType } from 'vue';
import { useUserStore } from '../../stores/UserStore';
import { useOrderStore } from '../../stores/OrderStore';


export default defineComponent({

    props: {
        notifications: {
            type: Array as PropType<Notification[]>,
            default: []
        }
    },

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
    },

    methods: {
        viewOrder(notification: Notification) {
            const userStore = useUserStore();
            const orderStore = useOrderStore();
            const order = notification.order;

            if( !order ) {
                return;
            }

            orderStore.selectedOrder = order;
            this.$emit('notification-clicked', notification);

            if( userStore.user?.isSalesAssociate() ) {
                this.$router.push(`/agents/orders/${order.id}`);
                return;
            }

            if( order.businesses_id == userStore.activeBusiness?.id ) {
                userStore.setAppModeAsVendor();
                this.$router.replace(`/vendor/orders/${order.id}`);
                return;
            }

            if( order.customer_id == userStore.activeBusiness?.id ) {
                userStore.setAppModeAsShopping();
                this.$router.replace(`/shopper/orders/${order.id}`);
                return;
            }


        }
    }
})
</script>
