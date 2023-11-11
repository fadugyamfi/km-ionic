<template>
    <IonCard>
        <IonCardContent class="ion-no-padding">
            <IonList lines="none">
                <IonItem>
                    <IonLabel class="font-medium">{{ $t('shopper.orders.delivery') }}</IonLabel>
                    <IonLabel slot="end" class="font-medium">
                        GHS 0.00
                    </IonLabel>
                </IonItem>

                <IonItem>
                    <IonLabel color="medium" class="font-medium">
                        {{ order?.delivery_location || 'Unknown' }}
                    </IonLabel>
                    <IonLabel v-if="showChangeAddress" color="primary" slot="end" class="font-medium">
                        Change Address
                    </IonLabel>
                </IonItem>

                <IonItem lines="full" class="ion-padding-bottom">
                    <IonLabel color="medium" class="font-medium">
                        {{ order?.delivery_date ? Filters.date(order?.delivery_date as string, 'short') : 'TBD' }}
                    </IonLabel>
                    <IonLabel v-if="showChangeDate" color="primary" slot="end" class="font-medium">
                        Change Date
                    </IonLabel>
                </IonItem>

                <IonItem>
                    <IonLabel color="dark" class="font-medium">
                        {{ 'Total Cost' }}
                    </IonLabel>
                    <IonLabel color="dark" slot="end" class="font-medium fw-bold">
                        {{ Filters.currency(order?.getTotal() as number, order?.currency?.symbol as string) }}
                    </IonLabel>
                </IonItem>
            </IonList>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { Order } from '@/models/Order';
import Filters from '../../../utilities/Filters';
import { IonCard, IonCardContent, IonItem, IonLabel, IonList } from '@ionic/vue';


export default defineComponent({
    props: {
        order: {
            type: Object as PropType<Order>
        },
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
    components: { IonCard, IonCardContent, IonList, IonItem, IonLabel }
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
