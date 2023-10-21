<template>
    <section class="shopper-home-section ion-padding-top">
        <header class="ion-padding-horizontal ion-padding-bottom">
            <h6>New Arrivals</h6>

            <IonText color="primary" :router-link="`/shopper/home/businesses/${$route.params.id}/products`">
  Show all
</IonText>

        </header>

        <Swiper :slides-per-view="2">
            <SwiperSlide v-for="product of products" :key="product.id">
                <ProductCard :product="product" :show-description="false"></ProductCard>
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
  import { IonText } from '@ionic/vue';
  import ProductCard from '@/components/cards/ProductCard.vue';
  import AppStorage from '@/stores/AppStorage';
import Business from '../../../models/Business';

  const storage = new AppStorage();

  export default defineComponent({
    props: {
        business: {
            type: Object as PropType<Business | null>
        }
    },
    data() {
        return {
            products: [] as Product[]
        };
    },
    components: { Swiper, SwiperSlide, IonText, ProductCard },
    computed: {
        ...mapStores( useProductStore )
    },
    methods: {
        viewProduct(product: Product) {
            this.$router.push(`/shopper/home/products/${product.id}`);
        },

        async fetchNewArrivals() {
            this.products = await this.productStore.fetchProducts({
                businesses_id: this.business?.id,
                limit: 6,
                sort: 'latest'
            });
        }
    },
    mounted() {
        // this.fetchNewArrivals();
    },
    watch: {
        business: function() {
            this.fetchNewArrivals();
        }
    }
  })
  </script>
