<template>
    <IonItem color="light" class="font-medium ion-text-center ion-align-items-center" lines="none"
             v-if="requestStore.recordedRequests.length > 0" :button="true" @click="startSync()">
        <IonLabel>
            <IonIcon :icon="arrowUpOutline"></IonIcon>
            {{ requestStore.recordedRequests.length }} requests pending upload
        </IonLabel>

        <IonSpinner v-if="syncing || showSyncing" slot="end" name="crescent"></IonSpinner>
    </IonItem>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonSpinner } from '@ionic/vue';
import { arrowUpOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRequestStore } from '@/stores/RequestStore';

const requestStore = useRequestStore();
const syncing = ref(false);

const props = defineProps({
    showSyncing: {
        default: false
    }
})

const startSync = () => {
    requestStore.startRequestDataSync();
    syncing.value = true;
}
</script>
