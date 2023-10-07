<template>
    <section class="ion-no-border">
        <Swiper :slides-per-view="4">
            <SwiperSlide v-for="category of categories" :key="category.id">
                <CategoryPill :category="category" @click="viewCategory(category)"></CategoryPill>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script lang="ts">
import 'swiper/scss';
import '@ionic/vue/css/ionic-swiper.css';

import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CategoryPill from './CategoryPill.vue';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import ProductCategory from '@/models/ProductCategory';
import { mapStores } from 'pinia';

export default defineComponent({

    components: {
        IonSearchbar,
        CategoryPill,
        Swiper,
        SwiperSlide
    },

    data() {
        return {
            backOff: 1,
            categories: [] as ProductCategory[]
        }
    },

    computed: {
        ...mapStores( useProductCategoryStore ),
    },

    methods: {
        async fetchCategories() {
            this.categories = await this.productCategoryStore.getCategories();
        },

        viewCategory(category: ProductCategory) {
            this.$router.push(`/shopper/home/categories/${category.id}`);
        }
    },

    mounted() {
        setTimeout(() => this.fetchCategories(), 300);
    }
})
</script>

<style lang="scss" scoped>

</style>
