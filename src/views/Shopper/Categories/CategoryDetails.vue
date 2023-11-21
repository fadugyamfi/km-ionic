<template>
    <ion-page>

        <section class="ion-padding">
            <IonHeader class="inner-header">
                <IonToolbar class="ion-align-items-center">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shopper/home/categories"></IonBackButton>
                    </IonButtons>

                    <IonTitle size="small" class="fw-bold">
                        {{ category?.name }}
                    </IonTitle>

                    <IonButtons slot="end">
                        <NotificationButton></NotificationButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </section>

        <ion-content>
            <section v-if="fetching" class="ion-text-center d-flex ion-justify-content-center ion-padding">
                <IonSpinner name="crescent" ></IonSpinner>
            </section>
            <IonGrid v-if="!fetching">
                <IonRow>
                    <IonCol size="6" v-for="product in products" :key="product.id">
                        <ProductCard :product="product" :showDescription="false"></ProductCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import ProductCategory from '@/models/ProductCategory';
import Product from '@/models/Product';
import { ref, onMounted } from 'vue';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';

const productCategoryStore = useProductCategoryStore();
const route = useRoute();
const category = ref<ProductCategory|null>();
const products = ref<Product[]>([]);
const fetching = ref(false);

onMounted(async () => {
    fetching.value = true;
    category.value = await productCategoryStore.getCategory( +route.params.id );
    products.value = await productCategoryStore.fetchCategoryProducts(category.value);
    fetching.value = false;
});
</script>
