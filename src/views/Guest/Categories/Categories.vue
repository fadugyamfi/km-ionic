<template>
  <ion-page>

    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"><b>Categories</b></IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>


    <ion-content>
      <GuestProductCategoryList :categories="categories"></GuestProductCategoryList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonLabel, IonTitle, onIonViewDidEnter } from '@ionic/vue';
import GuestProductCategoryList from '@/components/lists/GuestProductCategoryList.vue';
import { ref, onMounted } from 'vue';
import ProductCategory from '@/models/ProductCategory';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import NotificationButton from '../../../components/notifications/NotificationButton.vue';

const productCategoryStore = useProductCategoryStore();
const categories = ref<ProductCategory[]>([]);

async function fetchProductCategories() {
  categories.value = await productCategoryStore.getCategories();
}

onIonViewDidEnter(() => fetchProductCategories())
</script>
