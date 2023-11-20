<template>
    <IonCard>
        <IonCardContent>
            <FreeDeliveryPromo></FreeDeliveryPromo>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import FreeDeliveryPromo from '@/components/modules/promos/FreeDeliveryPromo.vue';


export default defineComponent({
    data() {
        return {};
    },

    components: {
        IonCard,
        IonCardContent,
        FreeDeliveryPromo
    }
})
</script>

<style scoped lang="scss">
ion-card {
    --background: #F5AA2926;
}
</style>
