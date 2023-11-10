<template>
    <IonItem :button="true">
        <IonAvatar slot="start" class="ion-align-self-start">
            <Image :src="order.customer?.logo"></Image>
        </IonAvatar>
        <IonLabel>
            <p>
                <IonText color="dark">{{ order.customer?.name }}</IonText>
            </p>
            <p class="font-medium">
                <IonText color="medium">
                    {{ filters.date(order.created_at as string, 'short') }}
                </IonText>
                <span class="ion-margin-horizontal">|</span>
                <IonText color="medium">
                    {{ $tc('general.products', order.order_items_count as number, { count: order.order_items_count }) }}
                </IonText>
            </p>
            <p>
                <IonChip :color="getStatusInfo(order.order_status_id)?.color" class="font-medium">
                    {{ order.order_status?.name }}
                </IonChip>
            </p>
        </IonLabel>
        <IonButton slot="end" fill="clear" color="dark" class="ion-align-self-start ion-margin-top"
                   @click.stop="openMenu($event)">
            <IonIcon :icon="ellipsisHorizontal"></IonIcon>
        </IonButton>

        <slot name="popover"></slot>
    </IonItem>
</template>

<script lang="ts">
import { IonAvatar, IonButton, IonChip, IonIcon, IonItem, IonLabel, IonText } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import Image from '../../Image.vue';
import { Order } from '../../../models/Order';
import { ellipsisHorizontal } from 'ionicons/icons';
import filters from '@/utilities/Filters';


export default defineComponent({
    props: {
        order: {
            required: true,
            type: Object as PropType<Order>
        }
    },

    data() {
        return {
            ellipsisHorizontal,
            filters,
        };
    },
    components: { IonItem, IonAvatar, Image, IonLabel, IonText, IonChip, IonButton, IonIcon },

    emits: ['openMenu'],

    methods: {
        openMenu(event: CustomEvent) {
            this.$emit('openMenu', event);
        },

        getStatusInfo(orderStatusId?: number) {
            switch (orderStatusId) {
                case 1:
                    return {
                        color: 'info',
                        label: 'Processing',
                    };
                case 2:
                case 4:
                case 5:
                case 6:
                    return {
                        color: 'primary',
                        label: 'Pending',
                    };
                case 3:
                case 7:
                    return {
                        color: 'success',
                        label: 'Completed',
                    };
                case 8:
                case 9:
                case 10:
                    return {
                        color: 'danger',
                        label: 'Cancelled',
                    };
                default:
                    return {
                        color: 'medium',
                        label: 'Default',
                    };
            }
        },
    }
})
</script>
