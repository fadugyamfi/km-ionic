<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton :icon="close"></IonBackButton>
                </IonButtons>

                <IonTitle size="small">Product Details</IonTitle>

                <IonButtons slot="end">
                    <IonButton slot="icon-only">
                        <IonIcon :icon="heartOutline"></IonIcon>
                    </IonButton>
                    <IonButton slot="icon-only">
                        <IonIcon :icon="cartOutline"></IonIcon>
                    </IonButton>
                    <IonButton slot="icon-only">
                        <IonIcon :icon="shareOutline"></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <header>
                <Swiper>
                    <SwiperSlide>
                        <Image :src="product?.image" style="max-height: 200px; border-radius: 10px;"></Image>
                    </SwiperSlide>
                </Swiper>
            </header>

            <main>
                <section class="title-section d-flex ion-align-items-center ion-justify-content-between">
                    <span class="product-name">{{  product?.product_name }}</span>
                    <span class="price">{{ product?.currency?.symbol }} {{  product?.product_price }}</span>
                </section>

                <section class="business-section d-flex ion-align-items-center">
                    <IonAvatar size="small">
                        <img src="/images/no-image.png" />
                    </IonAvatar>
                    Business Name
                </section>

                <section class="review-section"></section>
            </main>
        </IonContent>

        <IonFooter class="ion-padding">
            <KolaYellowButton class="ion-margin-bottom">Buy Now</KolaYellowButton>
            <KolaWhiteButton>Add To Cart</KolaWhiteButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { close, heartOutline, heart, cart, cartOutline, shareOutline } from 'ionicons/icons'
import Product from '@/models/Product';
import { mapStores } from 'pinia';
import { useProductStore } from '@/stores/ProductStore';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';
import Image from '@/components/Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

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
        IonAvatar
    },

    data() {

        return {
            close, heartOutline, cartOutline, shareOutline, cart, heart,
            product: null as Product | null,
            defaultBanner: '/images/vendor/banner.png'
        }
    },

    computed: {
        ...mapStores( useProductStore )
    },

    methods: {
        async fetchProductDetails() {
            const productId = +this.$route.params.id;
            try {
                this.product = await this.productStore.fetchProduct(productId);
            } catch(error) {
                console.log(error)
            }
        },

        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.defaultBanner;
        }
    },

    mounted() {
        this.fetchProductDetails();
    }
})
</script>

<style scoped lang="scss">

ion-content::part(background) {
    background-color: #fefefe;
}

main {
        border-radius: 10px;
        background-color: white;
        margin-top: 15px;
        border: solid #f9f9f9 1px;
        padding: 10px;

        .title-section {
            font-size: 0.8em;
            font-weight: bold;

            .price {
                text-align: right;
                min-width: 80px;
            }
        }
    }
</style>
