<template>
    <section class="shopper-home-section ion-padding-top" v-if="products.length > 0">
        <header class="ion-padding-horizontal ion-padding-bottom">
            <h6>Recently Viewed Products</h6>

            <!-- <IonText color="primary" router-link="/shopper/home/recent-products">
                View all
            </IonText> -->
        </header>

        <section v-if="fetching">
            <ProductsLoadingSkeletons></ProductsLoadingSkeletons>
        </section>

        <Swiper v-else :slides-per-view="2">
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
import ProductsLoadingSkeletons from '@/components/layout/ProductsLoadingSkeletons.vue';

const storage = new AppStorage();
const RECENTLY_VIEWED = 'kola.recently-viewed';

export default defineComponent({
    data() {
        return {
            products: [] as Product[],
            fetching: false
        };
    },
    components: { Swiper, SwiperSlide, IonText, ProductCard, ProductsLoadingSkeletons },

    computed: {
        ...mapStores( useProductStore )
    },

    methods: {
        viewProduct(product: Product) {
            this.$router.push(`/shopper/home/products/${product.id}`);
        },

        async fetchRecentlyViewedProducts() {
            this.fetching = true;
            const products = await storage.get(RECENTLY_VIEWED);

            if( products ) {
                this.products = products.map((el: object) => new Product(el));
                this.fetching = false;
                return;
            }

            this.products = await this.productStore.fetchRecentlyViewedProducts({ limit: 6 });
            storage.set(RECENTLY_VIEWED, this.products, 5, 'minutes');

            this.fetching = false;
        }
    },

    mounted() {
        this.fetchRecentlyViewedProducts();
    }
})
</script>
