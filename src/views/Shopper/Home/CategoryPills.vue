<template>
    <section class="ion-no-border">
        <section v-if="categories.length == 0">
            <IonGrid>
                <IonRow>
                    <IonCol v-for="pill in tempPills" :key="pill">
                        <IonSkeletonText :animated="true" class="skeleton-pill"></IonSkeletonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </section>

        <Swiper v-else :slides-per-view="4">
            <SwiperSlide v-for="category of categories" :key="category.id">
                <CategoryPill :category="category" @click="viewCategory(category)"></CategoryPill>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script lang="ts">
import 'swiper/scss';
import '@ionic/vue/css/ionic-swiper.css';

import { IonCol, IonGrid, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/vue';
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
        SwiperSlide,
        IonGrid,
        IonRow,
        IonCol,
        IonSkeletonText
    },

    data() {
        return {
            backOff: 1,
            tempPills: ["Loading", "Loading", "Loading", "Loading"],
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
.skeleton-pill {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0px auto;
}
</style>
