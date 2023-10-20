<template>
  <ion-page>

    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home/businesses"></IonBackButton>
          </IonButtons>

          <IonTitle size="small" class="fw-bold">
            {{ business?.name }} Products
          </IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <ion-content :fullscreen="true">
      <section v-if="fetching" class="ion-text-center d-flex ion-justify-content-center ion-padding">
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <IonGrid v-if="!fetching">
        <IonRow>
          <IonCol size="6" v-for="product in products" :key="product.id">
            <ProductCard :product="product"></ProductCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import Business from '@/models/Business';
import Product from '@/models/Product';
import { ref, onMounted } from 'vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';

const businessStore = useBusinessStore();
const route = useRoute();
const business = ref<Business|null>();
const products = ref<Product[]>([]);
const fetching = ref(false);

const businessId = route.params.id;

onMounted(async () => {
  fetching.value = true;
  business.value = await businessStore.getBusiness(+route.params.id);
  products.value = await businessStore.getBusinessProducts(Business.value);
  fetching.value = false;
});
</script>
