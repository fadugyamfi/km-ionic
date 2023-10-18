<template>
    <ion-page>
        <section class="ion-padding">
            <IonHeader class="inner-header">
                <IonToolbar class="ion-align-items-center">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shopper/home/categories"></IonBackButton>
                    </IonButtons>
                    <IonTitle size="small" class="fw-bold">
                        {{ brand.name }}
                    </IonTitle>
                    <IonButtons slot="end">
                        <NotificationButton></NotificationButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </section>
        <ion-content :fullscreen="true">
            <section class="banner">
                <img :src="defaultBanner" />
                <aside>
                    <IonAvatar size="medium">
                        <span class="initials">RV</span>
                    </IonAvatar>
                </aside>
            </section>
            <section class="section title-section d-flex ion-align-items-start ion-justify-content-between">
                <span class="product-name"> {{ brand.name }} </span>
            </section>
            <section>
                <BrandRatingAndReviews :brand="brand"></BrandRatingAndReviews>
            </section>
            <section>
                <BrandLocation :brand=brand></BrandLocation>
            </section>

            <section class="section min-order-section">
                <BrandMinimumOrder :brand="brand"></BrandMinimumOrder>
            </section>
            <section class="section min-order-section">
                <BrandDeliveryTime :brand="brand"></BrandDeliveryTime>
            </section>
            <section class="section tags">
                <BrandTags :brand="brand"></BrandTags>
            </section>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import BrandRatingAndReviews from '@/components/modules/brands/BrandRatingAndReviews.vue';
import BrandMinimumOrder from '@/components/modules/brands/BrandMinimumOrder.vue';
import BrandLocation from '@/components/modules/brands/BrandLocation.vue';
import BrandDeliveryTime from '@/components/modules/brands/BrandDeliveryTime.vue';
import BrandTags from '@/components/modules/brands/BrandTags.vue';
import { useBrandStore } from '@/stores/BrandStore';
import Brand from '@/models/Brand';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';
import { handleAxiosRequestError } from '@/utilities';

export default defineComponent({
    data() {
        return {
            defaultBanner: '/images/vendor/banner.png',
            brand: {} as Brand,
            brandStore: useBrandStore()
        };
    },

    components: { IonAvatar, IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, Brand, BrandRatingAndReviews, BrandLocation, BrandMinimumOrder, BrandTags, BrandDeliveryTime },

    methods: {
        async fetchBrandDetails() {
            const brandId = +this.$route.params.id;
            try {
                this.brand = await this.brandStore.getBrand(brandId);


            } catch (error) {
                handleAxiosRequestError(error);
            }
        },
        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.defaultBanner;
        },
    },

    mounted() {

        this.fetchBrandDetails()
    },
});
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

.banner {
    position: relative;
    margin-bottom: 40px;

    img {
        max-width: 100%;
        width: 100%;
    }

    aside {
        position: absolute;
        bottom: -15%;
        left: 5%;

        ion-avatar {
            border-radius: 50%;
            background-color: #f5f5f5;
            border: solid 1px #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 90px;

            .initials {
                font-size: 48px;
            }
        }
    }
}
</style>
