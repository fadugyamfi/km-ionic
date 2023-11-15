<template>
    <section>
        <IonCard>
            <IonCardContent class="ion-no-padding">
                <IonList lines="none">
                    <IonItem>
                        <IonLabel class="font-medium">Order Confirmed</IonLabel>
                        <IonRadio slot="end"> </IonRadio>
                    </IonItem>

                    <IonItem>
                        <p>Supplier will prepare your order shortly</p>
                    </IonItem>

                </IonList>
            </IonCardContent>
        </IonCard>
    </section>

    <section>
        <OrderStatusHistoryView></OrderStatusHistoryView>
    </section>

    <section>
        <IonCard>
            <IonCardContent class="ion-no-padding">

                <IonItem>
                    <IonLabel class="font-medium">Order summary: Order No. 234312321</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel class="font-medium">You are responsible for 10% tax on this item. Learn More</IonLabel>

                </IonItem>
            </IonCardContent>
        </IonCard>
    </section>


    <section>
        <CartOrderTotalCard></CartOrderTotalCard>
    </section>
 
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { locationOutline, timeOutline } from "ionicons/icons";
import Filters from '../../../utilities/Filters';
import { Order, OrderStatus } from '@/models/Order';
import OrderStatusHistoryView from '../../../components/modules/order/OrderStatusHistoryView.vue';
import CartOrderTotalCard from '../../../components/cards/CartOrderTotalCard.vue';
import { IonCard, IonCardContent, IonItem, IonLabel, IonList, IonRadio, IonText, IonIcon } from '@ionic/vue';

export default defineComponent({
    props: {
        order: {
            type: Object as PropType<Order>
        },
        // Check if these props are used, remove if not needed
        showChangeAddress: {
            default: true
        },
        showChangeDate: {
            default: true
        }
    },
    data() {
        return {
            Filters
        };
    },
    setup() {
        // Add a function to get the corresponding icon for each status
        const getIconForStatus = (status: string) => {
            if (status === 'Confirmed') {
                return 'checkmark-circle';
            } else if (status === 'Out for Delivery') {
                return 'truck';
            } else if (status === 'Delivered') {
                return 'checkmark-done';
            } else {
                return 'alert-circle';
            }
        };

        return {
            getIconForStatus,
        };
    },
    components: { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonRadio, IonText, IonIcon, OrderStatus, OrderStatusHistoryView, CartOrderTotalCard }
})
</script>

<style scoped lang="scss">
ion-item {
    --min-height: 16px;
    margin-bottom: 0.5em;

    ion-label {
        margin: 0px;
    }
}
</style>
