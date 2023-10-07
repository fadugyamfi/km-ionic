<template>
    <IonButton fill="clear" @click="goToCart()">
        <IonIcon slot="icon-only" :icon="cartOutline"></IonIcon>
        <IonBadge>
            {{ cartStore.items?.length }}
        </IonBadge>
    </IonButton>
</template>

<script setup lang="ts">
import { IonBadge, IonButton, IonIcon } from '@ionic/vue';
import { cartOutline } from 'ionicons/icons';
import Product from '@/models/Product';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/CartStore';

const props = defineProps({
    product: Product
})

const router = useRouter();
const cartStore = useCartStore();
cartStore.loadFromStorage();

const goToCart = () => {
    router.push('/shopper/cart');
}
</script>

<style scoped lang="scss">
ion-button {
    position: relative;

    ion-badge {
        --background: #003366;
        position: absolute;
        font-size: 0.5em;
        top: -2px;
        right: -5px;
    }
}
</style>
