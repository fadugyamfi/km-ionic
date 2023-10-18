<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home/suppliers"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ supplier?.name }}
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
      <section v-else>
        <SupplierCard :supplier="Business"></SupplierCard>
        <IonGrid>
          <IonRow>
            <IonCol size="6" v-for="product in products" :key="product.id">
              <ProductCard :product="product"></ProductCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonSpinner,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import { ref, onMounted } from 'vue';
import { useSupplierStore } from '@/stores/SupplierStore';
import SupplierCard from '@/components/cards/SupplierCard.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import { useRoute } from 'vue-router';
import Business from '@/models/Business';
import Product from '@/models/Product';

const SupplierStore = useSupplierStore();
const route = useRoute();
const supplierId = +route.params.id;
const supplier = ref<Business | null>(null);
const products = ref<Product[]>([]);
const fetching = ref(false);

onMounted(async () => {
  fetching.value = true;
  await SupplierStore.getSupplier(supplierId);
  await SupplierStore.fetchSupplierProducts(supplierId);
  supplier.value = SupplierStore.supplier;
  products.value = SupplierStore.products;
  fetching.value = false;
});
</script>
