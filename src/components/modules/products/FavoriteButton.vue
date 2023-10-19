
<template>
    <IonButton fill="clear" @click.stop="toggleFavorited()">
        <IonIcon v-if="!product?.favorited" slot="icon-only" :icon="heartOutline"></IonIcon>
        <IonIcon v-else slot="icon-only" :icon="heart"></IonIcon>
    </IonButton>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { heart, heartOutline } from 'ionicons/icons';
import Product from '@/models/Product';
import { useProductStore } from '@/stores/ProductStore';

const props = defineProps({
    product: Product
})

const productStore = useProductStore();

const toggleFavorited = () => {
    if( !props.product ) {
        return;
    }

    if( props.product.favorited ) {
        productStore.removeFromFavorites(props.product);
    } else {
        productStore.addProductToFavorites(props.product);
    }
}
</script>
