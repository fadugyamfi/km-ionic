<template>
    <section class="suppliers-near-you shopper-home-section">
        <header class="ion-padding-horizontal">
            <h6>{{ $t("shopper.home.suppliersNearYou") }}</h6>

            <router-link to="/shopper/home/suppliers">
                {{ $t("shopper.home.viewAll") }}
            </router-link>
        </header>

        <main>

            <Swiper>
                <SwiperSlide v-for="(slide, index) of slides" :key="slide">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <BusinessCard :business="slide[0]"></BusinessCard>
                            </IonCol>
                            <IonCol size="6" v-if="slide[1]">
                                <BusinessCard :business="slide[1]"></BusinessCard>
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
import Business from '@/models/Business';
import { IonCol, IonGrid, IonRow } from '@ionic/vue';
import BusinessCard from '@/components/modules/business/BusinessCard.vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import { mapStores } from 'pinia';

export default defineComponent({

    components: {
        Swiper,
        SwiperSlide,
        IonGrid,
        IonRow,
        IonCol,
        BusinessCard
    },

    data() {
        return {
            backOff: 1,
            suppliers: [] as Business[],
            slides: [] as any
        }
    },

    computed: {
        ...mapStores( useBusinessStore )
    },

    methods: {
        async fetchSuppliers() {
            try {
                this.suppliers = await this.businessStore.getSuppliers();

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
