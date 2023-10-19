<template>
    <IonButton fill="clear" @click.stop="toggleFavorited()">
        <IonIcon v-if="!Business?.favorited" slot="icon-only" :icon="heartOutline"></IonIcon>
        <IonIcon v-else slot="icon-only" :icon="heart"></IonIcon>
    </IonButton>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { heart, heartOutline } from 'ionicons/icons';
import Business from '@/models/Business';
import { useBusinessStore } from '@/stores/BusinessStore';

const props = defineProps({
    Business: Business
})

const BusinessStore = useBusinessStore();

const toggleFavorited = () => {
    if( !props.Business ) {
        return;
    }

    if( props.Business.favorited ) {
        BusinessStore.removeFromFavorites(props.Business);
    } else {
        BusinessStore.addToFavorites(props.Business);
    }
}
</script>
