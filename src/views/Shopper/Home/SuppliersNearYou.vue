<template>
    <section class="suppliers-near-you shopper-home-section">
        <header class="ion-padding-horizontal">
            <h6>Suppliers Near You</h6>

            <router-link to="/shopper/home/suppliers">
                View all
        </router-link>
        </header>

        <main>
        
            <Swiper>
                <SwiperSlide v-for="(slide, index) of slides" :key="slide">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <SupplierCard :supplier="slide[0]"></SupplierCard>
                            </IonCol>
                            <IonCol size="6" v-if="slide[1]">
                                <SupplierCard :supplier="slide[1]"></SupplierCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

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
import { IonCol, IonGrid, IonRow } from '@ionic/vue';

export default defineComponent({

    components: {
        Swiper,
        SwiperSlide,
        SupplierCard,
        IonGrid,
        IonRow,
        IonCol
    },

    data() {
        return {
            backOff: 1,
            suppliers: [] as Business[],
            slides: [] as any
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

                this.suppliers = suppliers.map((element: any) => new Business(element));

                this.slides = [];

                for(let i = 0; i < this.suppliers.length; i += 2) {
                    if( this.suppliers[i + 1] ) {
                        this.slides.push([ this.suppliers[i], this.suppliers[i + 1] ]);
                    } else {
                        this.slides.push([ this.suppliers[i] ]);
                    }
                }
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
