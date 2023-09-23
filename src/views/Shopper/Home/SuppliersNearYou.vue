<template>
    <section class="suppliers-near-you">
        <header class="ion-padding-horizontal">
            <h6>Suppliers Near You</h6>

            <a router-link="/shopper/suppliers">
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

export default defineComponent({

    components: {
        Swiper,
        SwiperSlide,
        SupplierCard
    },

    data() {
        return {
            suppliers: []
        }
    },

    methods: {
        fetchSuppliers() {
            const params = {
                business_types_id: 3,
                limit: 6
            }

            return axios.get('/v2/businesses', { params })
                .then((response) => {
                    this.suppliers = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    mounted() {
        this.fetchSuppliers();
    }
});
</script>

<style lang="scss">
.suppliers-near-you {
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9em;

        h6 {
            font-weight: bold;
            font-size: 0.9em;
            margin: 0px;
        }

        a {
            padding: 3px 10px;
        }
    }
}
</style>
