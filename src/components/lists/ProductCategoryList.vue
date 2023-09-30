<template>
    <section class="product-category-list d-flex">
        <section v-if="leftColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
          <ProductCategoryCard
                v-for="(category, index) of leftColumnItems"
                :key="category.id"
                :category="category"
                :tall="index % 2 == 0"
                @click="onCategorySelected(category)"
            ></ProductCategoryCard>
        </section>

        <section v-if="rightColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
           <ProductCategoryCard
                v-for="(category, index) of rightColumnItems"
                :key="category.id"
                :category="category"
                :tall="index % 2 != 0"
                @click="onCategorySelected(category)"
            ></ProductCategoryCard>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ProductCategory from '@/models/ProductCategory';
import ProductCategoryCard from '@/components/cards/ProductCategoryCard.vue';
import { logIn } from 'ionicons/icons';

export default defineComponent({

    props: {
        categories: {
            default: [],
            type: Array as PropType<Array<ProductCategory>>
        }
    },

    data() {
        return {
            leftColumnItems: [] as Array<ProductCategory>,
            rightColumnItems: [] as Array<ProductCategory>
        };
    },

    components: { ProductCategoryCard },

    methods: {
        fillColumns() {
            this.leftColumnItems = this.categories.filter((category, index) => {
                return index % 2 == 0;
            });

            this.rightColumnItems = this.categories.filter((category, index) => {
                return index % 2 != 0;
            });
        },

        onCategorySelected(category: ProductCategory) {
            this.$router.push(`/shopper/home/categories/${category.id}`)
        }
    },

    mounted() {
        setTimeout(() => {
            this.fillColumns();
        }, 200);
    }
})
</script>

<style lang="scss">
.product-category-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-left: 10px;
    padding-right: 10px;

    .flex-column {
        width: 48%;
    }
}
</style>
