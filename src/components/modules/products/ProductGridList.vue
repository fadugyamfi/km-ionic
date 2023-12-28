<template>
    <section class="grid">
        <div v-for="product in products" :key="product?.id">
            <GuestProductCard v-if="userStore.isInGuestMode()" :product="product" :showDescription="false"></GuestProductCard>
            <ProductCard v-else :product="product" :showDescription="false"></ProductCard>
        </div>
    </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 5px;
  margin: 0px 5px;
}
</style>


<script setup lang="ts">
import { PropType } from 'vue';
import Product from '@/models/Product';
import { useUserStore } from '@/stores/UserStore';
import GuestProductCard from '@/components/cards/GuestProductCard.vue';
import ProductCard from '@/components/cards/ProductCard.vue';


const props = defineProps({
    products: {
        type: Array<Product>,
        default: []
    }
});

const userStore = useUserStore();


</script>
