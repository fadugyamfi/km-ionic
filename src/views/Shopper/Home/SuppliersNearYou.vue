<template>
    <section class="suppliers-near-you shopper-home-section">
        <header class="ion-padding-horizontal">
            <h6>Suppliers Near You</h6>

            <a router-link="/shopper/home/suppliers">
                View all
            </a>
        </header>

        <main>
            <Swiper :slides-per-view="2">
                <SwiperSlide v-for="supplier of suppliers" :key="supplier">
                    <SupplierCard :supplier="supplier"></SupplierCard>
                </SwiperSlide>
            </Swiper>
        </main>
    </section>
</template>

<script lang="ts">
import 'swiper/scss';
import '@ionic/vue/css/ionic-swiper.css';

import axios from 'axios';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SupplierCard from '@/components/cards/SupplierCard.vue';
import Business from '@/models/Business';

export default defineComponent({

    components: {
        Swiper,
        SwiperSlide,
        SupplierCard
    },

    data() {
        return {
            backOff: 1,
            suppliers: []
        }
    },

    methods: {
        async fetchSuppliers() {
            const params = {
                business_types_id: 3,
                limit: 6
            }

            try {
                const response = await axios.get('/v2/businesses', { params });
                const suppliers = response.data.data;

                this.suppliers = suppliers.map((element: any) => {
                    return new Business(element);
                });;
            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    this.fetchSuppliers();
                    this.backOff += 1;
                }, 100 * this.backOff);
            }
        }
    },

    mounted() {
        this.fetchSuppliers();
    }
});
</script>

<style lang="scss">

.suppliers-near-you {

    .swiper-wrapper {
        display: inline-flex;
        gap: 15px;
    }

    main {
        padding: 0px 10px;
    }
}
</style>
