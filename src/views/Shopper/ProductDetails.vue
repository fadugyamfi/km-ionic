<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/shopper/home" :icon="close"></IonBackButton>
                </IonButtons>

                <IonTitle size="small">
                    {{ $t("shopper.productDetails.productDetails") }}
                </IonTitle>

                <IonButtons slot="end">
                    <FavoriteButton :product="product || undefined"></FavoriteButton>

                    <CartStatusButton :product="product || undefined"></CartStatusButton>

                    <IonButton slot="icon-only">
                        <IonIcon :icon="shareOutline"></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding" v-if="product">
            <header>
                <Swiper>
                    <SwiperSlide>
                        <Image :src="product?.image" style="max-height: 200px; border-radius: 10px; overflow: hidden;"></Image>
                    </SwiperSlide>
                </Swiper>
            </header>

            <main>
                <section class="section title-section d-flex ion-align-items-start ion-justify-content-between">
                    <span class="product-name">{{  product?.product_name }}</span>
                    <span class="price">{{ product?.currency?.symbol }} {{  product?.product_price }}</span>
                </section>

                <section class="section business-section ">
                    <section class="d-flex ion-align-items-center">
                        <IonAvatar>
                            <img src="/images/no-image.png" />
                        </IonAvatar>
                        <IonLabel>{{ product?.business?.name }}</IonLabel>
                    </section>
                    <BusinessRatingAndReviews :business="product?.business"></BusinessRatingAndReviews>
                </section>

                <section class="section description-section">
                    <IonText color="medium">{{ product?.product_description || 'No Description Available' }}</IonText>
                </section>

                <section class="section min-order-section">
                    <BusinessMinimumOrder :business="product?.business"></BusinessMinimumOrder>
                </section>

                <section class="section product-quantity-selection">
                    <ProductQuantitySelector @change="updateQuantity($event)"></ProductQuantitySelector>
                </section>

                <section class="section tags">
                    <ProductTags :product="product"></ProductTags>
                </section>
            </main>


        </IonContent>

        <IonSkeletonText v-if="!product" style="height: 300px" :animated="true"></IonSkeletonText>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton class="ion-margin-bottom">
                {{ $t("shopper.productDetails.buyNow") }}
            </KolaYellowButton>
            <KolaWhiteButton @click="addToCart()" :disabled="cartHasProduct">
                {{ $t("shopper.productDetails.addToCart") }}
            </KolaWhiteButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonPage,
    IonSkeletonText,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonText
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { close, heartOutline, heart, cart, cartOutline, shareOutline } from 'ionicons/icons'
import Product from '@/models/Product';
import { mapStores } from 'pinia';
import { useProductStore } from '@/stores/ProductStore';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';
import Image from '@/components/Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import BusinessRatingAndReviews from '@/components/modules/business/BusinessRatingAndReviews.vue';
import BusinessMinimumOrder from '@/components/modules/business/BusinessMinimumOrder.vue';
import ProductTags from '@/components/modules/products/ProductTags.vue';
import ProductQuantitySelector from '@/components/modules/products/ProductQuantitySelector.vue';
import FavoriteButton from '@/components/modules/products/FavoriteButton.vue';
import CartStatusButton from '../../components/modules/products/CartStatusButton.vue';
import { useCartStore } from '../../stores/CartStore';
import { handleAxiosRequestError } from '../../utilities';


export default defineComponent({

    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonButton,
        IonIcon,
        IonContent,
        IonFooter,
        KolaYellowButton,
        KolaWhiteButton,
        Image,
        Swiper,
        SwiperSlide,
        IonAvatar,
        IonSkeletonText,
        IonLabel,
        BusinessRatingAndReviews,
        BusinessMinimumOrder,
        IonText,
        ProductTags,
        ProductQuantitySelector,
        FavoriteButton,
        CartStatusButton
    },

    data() {

        return {
            close, heartOutline, cartOutline, shareOutline, cart, heart,
            product: null as Product | null,
            quantity: 0,
            defaultBanner: '/images/vendor/banner.png'
        }
    },

    computed: {
        ...mapStores( useProductStore, useCartStore ),

        cartHasProduct() {
            return this.cartStore.hasProduct(this.product as Product);
        }
    },

    methods: {
        async fetchProductDetails() {
            const productId = +this.$route.params.id;
            try {
                this.product = await this.productStore.fetchProduct(productId);

                if( this.cartHasProduct ) {
                    this.quantity = this.cartStore.getProductItem(this.product as Product)?.quantity as number;
                }
            } catch(error) {
                handleAxiosRequestError(error);
            }
        },

        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.defaultBanner;
        },

        updateQuantity(amount: number) {
            this.quantity = amount;

            this.cartStore.updateQuantity(this.product as Product, this.quantity);
        },

        async addToCart() {
            await this.cartStore.addProductToBusiness(this.product as Product, this.quantity);
        }
    },

    mounted() {
        this.fetchProductDetails();
    }
})
</script>

<style scoped lang="scss">

main {
    border-radius: 10px;
    background-color: white;
    margin-top: 15px;
    padding: 10px;
    color: #111;

    .section {
        padding: 4px 5px;
        font-size: 0.8em;
    }
    .title-section {
        font-weight: bold;

        .price {
            text-align: right;
            min-width: 80px;
        }
    }

    .business-section {
        margin-left: -3px;

        ion-avatar {
            height: 24px;
            width: 24px;
            margin-right: 5px;
        }

        .rating-and-reviews {
            padding: 10px 5px;
        }
    }

    .section.tags {
        border-top: solid 1px #F1F1F1;
        padding-top: 5px;
        padding-left: 0px;
        padding-right: 0px;
    }
}
</style>
