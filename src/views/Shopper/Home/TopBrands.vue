<template>
    <section class="shopper-home-section ion-padding-top">
        <header class="ion-padding-horizontal">
            <h6>Top Brands</h6>

            <IonText color="primary" router-link="/shopper/home/brands">
                View all
            </IonText>
        </header>

        <Swiper :slides-per-view="3">
            <SwiperSlide v-for="brand of brands" :key="brand.id">
                <BrandCard :brand="brand" style="width: 110px;"></BrandCard>
                <!-- <BrandPill :brand="brand" @click="viewBrand(brand)"></BrandPill> -->
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Brand from '@/models/Brand';
import BrandPill from './BrandPill.vue';
import { useBrandStore } from '@/stores/BrandStore';
import { mapStores } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonText } from '@ionic/vue';
import BrandCard from '../../../components/cards/BrandCard.vue';


export default defineComponent({
    data() {
        return {
            brands: [] as Brand[]
        };
    },
    components: { BrandPill, Swiper, SwiperSlide, IonText, BrandCard },

    computed: {
        ...mapStores( useBrandStore )
    },

    methods: {
        viewBrand(brand: Brand) {
            this.$router.push(`/shopper/home/brands/${brand.id}`);
        },

        async fetchTopBrands() {
            const brands = await this.brandStore.getBrands();
            this.brands = brands.slice(0, 10);
        }
    },

    mounted() {
        this.fetchTopBrands();
    }
})
</script>
