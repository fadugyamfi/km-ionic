<template>
    <section class="shopper-home-section ion-padding-top">
        <header class="ion-padding-horizontal ion-padding-bottom">
            <h6>Recently Viewed Products</h6>

            <!-- <IonText color="primary" router-link="/shopper/home/recent-products">
                View all
            </IonText> -->
        </header>

        <Swiper :slides-per-view="2">
            <SwiperSlide v-for="product of products" :key="product.id">
                <ProductCard :product="product" :show-description="false"></ProductCard>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Product from '@/models/Product';
import { useProductStore } from '@/stores/ProductStore';
import { mapStores } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonText } from '@ionic/vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import AppStorage from '@/stores/AppStorage';

const storage = new AppStorage();
const RECENTLY_VIEWED = 'kola.recently-viewed';

export default defineComponent({
    data() {
        return {
            products: [] as Product[]
        };
    },
    components: { Swiper, SwiperSlide, IonText, ProductCard },

    computed: {
        ...mapStores( useProductStore )
    },

    methods: {
        viewProduct(product: Product) {
            this.$router.push(`/shopper/home/products/${product.id}`);
        },

        async fetchRecentlyViewedProducts() {
            this.products = await this.productStore.fetchRecentlyViewedProducts({ limit: 6 });

        }
    },

    mounted() {
        this.fetchRecentlyViewedProducts();
    }
})
</script>
