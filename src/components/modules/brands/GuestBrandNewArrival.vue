<template>
    <section class="shopper-home-section ion-padding-top">
        <header class="ion-padding-horizontal ion-padding-bottom">
            <h6>{{ $t("shopper.home.newArrivals") }}</h6>

            <IonText color="primary" :router-link="`/guest/home/brands/${$route.params.id}/products`">
                {{ $t("shopper.home.showAll") }}
            </IonText>
        </header>

        <p v-if="fetching" class="ion-text-center">
            <IonSpinner name="crescent"></IonSpinner>
        </p>

        <Swiper v-if="!fetching" :slides-per-view="2">
            <SwiperSlide v-for="product of products" :key="product.id">
                <GuestProductCard :product="product" :show-description="false"></GuestProductCard>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Product from '@/models/Product';
import { useProductStore } from '@/stores/ProductStore';
import { mapStores } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonSpinner, IonText } from '@ionic/vue';
import Brand from '@/models/Brand';
import GuestProductCard from '@/components/cards/GuestProductCard.vue';

export default defineComponent({

    props: {
        brand: {
            required: true,
            type: Object as PropType<Brand | null>
        }
    },

    data() {
        return {
            fetching: false,
            products: [] as Product[]
        };
    },

    components: { Swiper, SwiperSlide, IonText, GuestProductCard, Brand, IonSpinner },

    computed: {
        ...mapStores(useProductStore)
    },


    methods: {
        viewProduct(product: Product) {
            this.$router.push(`/shopper/home/products/${product.id}`);
        },


        async fetchBrandProducts() {
            this.fetching = true;
            this.products = await this.productStore.fetchProducts({
                brands_id: this.brand?.id,
                limit: 10,
                sort: 'latest'
            });
            this.fetching = false;
        }
    },

    watch: {
        brand: function(newBrand, oldBrand) {
            if( newBrand ) {
                this.fetchBrandProducts();
            }
        }
    }
})
</script>
