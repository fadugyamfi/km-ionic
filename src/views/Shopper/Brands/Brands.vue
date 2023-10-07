<template>
  <ion-page>

    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"><b>Brands</b></IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>


    <ion-content :fullscreen="true">
      <IonSpinner v-if="!brands" name="crescent"></IonSpinner>

      <IonGrid v-if="brands">
          <IonRow>
              <IonCol size="6" v-for="brand in brands" :key="brand.id">
                  <BrandCard :brand="brand"></BrandCard>
              </IonCol>
          </IonRow>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonLabel, IonTitle, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/vue';
import ProductCategoryList from '@/components/lists/ProductCategoryList.vue';
import { ref, onMounted } from 'vue';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import BrandCard from '@/components/cards/BrandCard.vue';
import Brand from '@/models/Brand';
import { useBrandStore } from '../../../stores/BrandStore';

const brandStore = useBrandStore();
const brands = ref<Brand[]>([]);

async function fetchProductCategories() {
  brands.value = await brandStore.getBrands();
}

onMounted(() => fetchProductCategories())
</script>
@/stores/ProductCategoryStore
