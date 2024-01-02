<template>
    <RecycleScroller class="scroller" :items="products" :grid-items="2" :item-size="210" :item-secondary-size="cardWidth"
                     :item-class="'product-card-item'" key-field="id" v-slot="{ item }">

        <GuestProductCard v-if="userStore.isInGuestMode()" :product="item" :showDescription="false">
        </GuestProductCard>
        <ProductCard v-else :product="item" :showDescription="false"></ProductCard>

    </RecycleScroller>
</template>

<style scoped>
.product-card-item {
    margin-bottom: 10px;
    padding-bottom: 15px;
}

.scroller {
    height: 100%;
}
</style>


<script setup lang="ts">
import { PropType } from 'vue';
import Product from '@/models/Product';
import { useUserStore } from '@/stores/UserStore';
import GuestProductCard from '@/components/cards/GuestProductCard.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import { computed } from 'vue';


const props = defineProps({
    products: {
        type: Array<Product>,
        default: []
    }
});

const userStore = useUserStore();

const cardWidth = computed(() => {
    return (window.document.documentElement.clientWidth / 2);
});

</script>
