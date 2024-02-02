<template>
    <IonPage>
        <IonContent :fullscreen="true">

            <div class="d-flex ion-align-items-center flex-column ion-padding" style="margin-top: 40%;">
                <p>
                    <IonSpinner name="crescent"></IonSpinner>
                </p>
                <h5>
                    <IonText color="dark">
                        {{  $t('onboarding.loadingText') }}
                    </IonText>
                </h5>
            </div>

            <div class="image-loading">
                <div v-for="category in productCategoryStore.categories" class="">
                    <Image :src="category.image" w="150" />
                </div>

                <div v-for="brand in brandStore.brands" class="">
                    <Image :src="brand.logo" w="100" />
                </div>

                <!-- Image preloading -->
                <div>
                    <Image src="http://api.kolamarket.local/uploads/1/2022-03/product-placeholder.png" />
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonPage, IonSpinner, IonText, onIonViewDidEnter } from '@ionic/vue';
import { useUserStore } from '../../stores/UserStore';
import { useProductCategoryStore } from '../../stores/ProductCategoryStore';
import { useBrandStore } from '../../stores/BrandStore';
import { useProductStore } from '../../stores/ProductStore';
import Image from '../../components/Image.vue';
import { useRouter } from 'vue-router';
import { useBusinessStore } from '../../stores/BusinessStore';
import { ref } from 'vue';
import { usePromotionStore } from '../../stores/PromotionStore';

const loaded = ref(false);
const router = useRouter();
const userStore = useUserStore();
const productCategoryStore = useProductCategoryStore();
const brandStore = useBrandStore();
const productStore = useProductStore();
const businessStore = useBusinessStore();
const promotionStore = usePromotionStore();

const fetchGuestContent = async () => {
    await productCategoryStore.fetchGuestCategories();
    productStore.fetchTrendingProducts();
    brandStore.fetchGuestBrands();
    businessStore.getGuestSuppliers()
    promotionStore.fetchGuestPromotions();
}

const fetchUserContent = async () => {
    await productCategoryStore.fetchCategories();
    productStore.fetchTrendingProducts();
    brandStore.fetchBrands();
    businessStore.getSuppliers()
    productStore.fetchRecentlyViewedProducts();
    promotionStore.fetchPromotions();
}

const routeToNext = () => {
    if( userStore.isInGuestMode() ) {
        router.replace('/guest/home');
    } else {
        router.replace('/shopper/home');
    }
}

onIonViewDidEnter(async () => {
    if( loaded.value == true ) {
        routeToNext();
        return;
    }

    await userStore.loadStoredData();

    if( userStore.isInGuestMode() ) {
        await fetchGuestContent();
    } else {
        await fetchUserContent();
    }

    loaded.value = true;
    routeToNext()
})
</script>

<style scoped lang="scss">
.image-loading {
    position: absolute;
    bottom: 10px;
    height: 1px;
    display: flex;
    width: 100%;
    opacity: 0.1;

    image {
        height: 1px;
        width: 1px;
    }
}
</style>
