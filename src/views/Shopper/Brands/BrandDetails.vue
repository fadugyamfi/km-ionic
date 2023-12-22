<template>
    <ion-page>
        <section class="ion-padding">
            <IonHeader class="inner-header">
                <IonToolbar class="ion-align-items-center">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shopper/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle size="small" class="fw-bold">
                        {{ brand?.name }}
                    </IonTitle>
                    <IonButtons slot="end">
                        <NotificationButton></NotificationButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </section>
        <ion-content>
            <section class="banner">
                <img :src="defaultBanner" @error="onLoadError" />
                <aside>
                    <ProfileAvatar :image="brand?.logo"
                           :username="brand?.name"
                           customSize="90px"
                           font-size="40px" textColor="#111" ></ProfileAvatar>
                </aside>
            </section>
            <main>
                <section class="section title-section d-flex ion-align-items-center ion-justify-content-between">
                    <span class="product-name"> {{ brand?.name }} </span>
                    <FollowButton :brand="brand"></FollowButton>
                </section>
                <section class="section">
                    <BrandRatingAndReviews :brand="brand"></BrandRatingAndReviews>
                </section>
                <section class="section arrival-section">
                    <BrandNewArrival :brand="brand"></BrandNewArrival>
                </section>
            </main>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import BrandRatingAndReviews from '@/components/modules/brands/BrandRatingAndReviews.vue';
import BrandNewArrival from '@/components/modules/brands/BrandNewArrival.vue';
import FollowButton from '@/components/modules/brands/FollowButton.vue';
import { useBrandStore } from '@/stores/BrandStore';
import Brand from '@/models/Brand';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonText } from '@ionic/vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import { handleAxiosRequestError } from '@/utilities';
import ProfileAvatar from '../../../components/ProfileAvatar.vue';

export default defineComponent({
    data() {
        return {
            defaultBanner: '/images/vendor/banner.png',
            brand: null as Brand | null,
            brandStore: useBrandStore()
        };
    },

    components: {
    IonAvatar,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    Brand,
    BrandRatingAndReviews,
    BrandNewArrival,
    Swiper,
    SwiperSlide,
    IonText,
    ProductCard,
    NotificationButton,
    FollowButton,
    ProfileAvatar
},

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
    border-radius: 30px;
    background-color: white;
    margin-top: 15px;
    padding: 10px;
    color: #111;

    .section {
        padding: 4px 5px;
        font-size: 0.8em;
    }

    .title-section {
        font-weight: 500;

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
