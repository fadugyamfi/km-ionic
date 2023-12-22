<template>
    <ion-page>

        <section class="ion-padding">
            <IonHeader class="ion-no-border">
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

                <IonToolbar style="margin-top: 10px;">
                    <IonSearchbar class="search-input" placeholder="Search..." @keyup.enter="onSearch($event)"
                                  @ion-change="onSearch($event)" @ion-clear="onSearch($event)"></IonSearchbar>
                </IonToolbar>
            </IonHeader>

        </section>

        <ion-content>
            <section v-if="fetching" class="ion-text-center d-flex ion-justify-content-center ion-padding">
                <IonSpinner name="crescent"></IonSpinner>
            </section>
            <IonGrid v-else>
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
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow, onIonViewDidEnter, onIonViewWillEnter, IonSearchbar } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import ProductCategory from '@/models/ProductCategory';
import Product from '@/models/Product';
import { ref, onMounted } from 'vue';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';

const productCategoryStore = useProductCategoryStore();
const route = useRoute();
const category = ref<ProductCategory | null>();
const products = ref<Product[]>([]);
const productPrecaches = ref<Product[]>([]);
const fetching = ref(false);

const onSearch = async (event: any) => {
    fetching.value = true;
    productPrecaches.value = await productCategoryStore.fetchCategoryProducts(category.value as ProductCategory, {
        product_name_like: event.target?.value
    });
    fetching.value = false;

    renderProducts();
}

const renderProducts = () => {
    products.value = [];

    let i = 0;
    const int = setInterval(() => {
        if( i >= productPrecaches.value.length) {
            clearInterval(int);
            return;
        }

        products.value.push( productPrecaches.value[i] );
    }, 2)
}

onIonViewWillEnter(async () => {
    category.value = await productCategoryStore.getCategory(+route.params.id);
})

onIonViewDidEnter(async () => {
    if (products.value.length > 0) return;

    fetching.value = true;
    productPrecaches.value = await productCategoryStore.fetchCategoryProducts(category.value as ProductCategory);
    fetching.value = false;

    renderProducts();
});
</script>
