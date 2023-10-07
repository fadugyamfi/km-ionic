<template>
    <section class="minimum-order">
        <section v-if="business?.min_order_amount" class="d-flex ion-align-items-center">
            <IonIcon class="danger" color="danger" :icon="alertCircleOutline"></IonIcon>
            <IonText color="medium">
                {{ business?.currency?.symbol }} {{ business?.min_order_amount }} minimum
            </IonText>
        </section>

        <section v-else class="d-flex ion-align-items-center">
            <IonIcon class="success" color="success" :icon="checkmarkCircleOutline"></IonIcon>
            <IonText color="medium">
                No minimum order amount
            </IonText>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { locationOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon, IonText, IonAvatar } from '@ionic/vue';
import Business from '@/models/Business';

export default defineComponent({
    props: {
        business: {
            type: Object as PropType<Business | null>
        }
    },
    data() {
        return {
            locationOutline,
            alertCircleOutline,
            checkmarkCircleOutline
        };
    },
    components: { IonIcon, IonText, IonAvatar }
})
</script>

<style scoped lang="scss">
ion-icon {
    &.danger {
        background-color: rgba(255, 0, 0, 0.174);
    }

    &.success {
        background-color: rgba(0, 255, 85, 0.174);
    }

    font-size: 13px !important;
    padding: 3px;
    border-radius: 50%;
    margin-right: 5px;
}

ion-text {
    font-size: 0.8em;
}
</style>
