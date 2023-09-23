<template>
    <section class="ion-no-border">
        <IonSearchbar placeholder="Search..." class=""></IonSearchbar>

        <Swiper :slides-per-view="3">
            <SwiperSlide v-for="category of categories" :key="category.id">
                <CategoryPill :category="category"></CategoryPill>
            </SwiperSlide>
        </Swiper>

        <section>

        </section>
    </section>
</template>

<script lang="ts">
import 'swiper/scss';
import '@ionic/vue/css/ionic-swiper.css';

import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CategoryPill from './CategoryPill.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/UserStore';

export default defineComponent({

    components: {
        IonSearchbar,
        CategoryPill,
        Swiper,
        SwiperSlide,
    },

    data() {
        return {
            backOff: 1,
            categories: []
        }
    },

    methods: {
        async fetchCategories() {
            const userStore = useUserStore();

            try {
                const response = await axios.get("/v2/product-categories");
                this.categories = response.data.data;
            } catch(error) {
                console.log(error);
                setTimeout(() => {
                    this.fetchCategories();
                    this.backOff += 1;
                }, 100 * this.backOff);
            }
        }
    },

    mounted() {
        setTimeout(() => this.fetchCategories(), 300);
    }
})
</script>
