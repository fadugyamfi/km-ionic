<template>
    <IonItem color="light" class="font-medium ion-text-center ion-align-items-center" lines="none"
             v-if="saleStore.recordedSales.length > 0" :button="true" @click="startSync()">
        <IonLabel>
            <IonIcon :icon="arrowUpOutline"></IonIcon>
            {{ saleStore.recordedSales.length }} sales pending upload
        </IonLabel>

        <IonSpinner v-if="syncing" slot="end" name="crescent"></IonSpinner>
    </IonItem>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonSpinner } from '@ionic/vue';
import { useSaleStore } from '../../../stores/SaleStore';
import { arrowUpOutline } from 'ionicons/icons';
import { ref } from 'vue';

const saleStore = useSaleStore();
const syncing = ref(false);

const startSync = () => {
    saleStore.startSaleDataSync();
    syncing.value = true;
}
</script>
