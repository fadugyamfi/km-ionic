<template>
    <ion-page>

        <section class="ion-padding">
            <IonHeader class="inner-header">
                <IonToolbar class="ion-align-items-center">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shopper/home"></IonBackButton>
                    </IonButtons>

                    <IonTitle size="small" class="fw-bold">
                        {{ promotion?.name }}
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
                    <IonCol size="6" v-for="promotionItem in promotionItems" :key="promotionItem.product?.id">
                        <ProductCard :product="(promotionItem.product as Product)" :showDescription="false"></ProductCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import Product from '@/models/Product';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';
import Promotion from '../../../models/Promotion';
import { usePromotionStore } from '../../../stores/PromotionStore';
import PromotionItem from '../../../models/PromotionItem';

const promotionStore = usePromotionStore();
const route = useRoute();
const promotion = ref<Promotion|null>();
const promotionItems = ref<PromotionItem[]|null>();
const products = ref<Product[]>([]);
const fetching = ref(false);

onMounted(async () => {
    fetching.value = true;
    promotion.value = await promotionStore.getPromotion( +route.params.id );
    promotionItems.value = await promotionStore.getPromotionItems(+route.params.id);
    fetching.value = false;
});
</script>
