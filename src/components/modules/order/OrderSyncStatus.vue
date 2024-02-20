<template>
    <IonItem color="light" class="font-medium ion-text-center ion-align-items-center" lines="none"
             v-if="orderStore.recordedOrders.length > 0" :button="true" @click="startSync()">
        <IonLabel>
            <IonIcon :icon="arrowUpOutline"></IonIcon>
            {{ orderStore.recordedOrders.length }} orders pending upload
        </IonLabel>

        <IonSpinner v-if="syncing || showSyncing" slot="end" name="crescent"></IonSpinner>
    </IonItem>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonSpinner } from '@ionic/vue';
import { useOrderStore } from '@/stores/OrderStore';
import { arrowUpOutline } from 'ionicons/icons';
import { ref } from 'vue';

const orderStore = useOrderStore();
const syncing = ref(false);

const props = defineProps({
    showSyncing: {
        default: false
    }
})

const startSync = () => {
    orderStore.startOrderDataSync();
    syncing.value = true;
}
</script>
