<template>
    <IonButton fill="clear" @click.stop="toggleFavorited()">
        <IonIcon v-if="!brand?.favorited" slot="icon-only" :icon="heartOutline"></IonIcon>
        <IonIcon v-else slot="icon-only" :icon="heart"></IonIcon>
    </IonButton>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { heart, heartOutline } from 'ionicons/icons';
import Brand from '@/models/Brand';
import { useBrandStore } from '@/stores/BrandStore';

const props = defineProps({
    brand: Brand
})

const brandStore = useBrandStore();

const toggleFavorited = () => {
    if( !props.brand ) {
        return;
    }

    if( props.brand.favorited ) {
        brandStore.removeFromFavorites(props.brand);
    } else {
        brandStore.addToFavorites(props.brand);
    }
}
</script>
