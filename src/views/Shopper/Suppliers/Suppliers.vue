<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"><b>All Suppliers</b></IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <ion-content :fullscreen="true">
      <SupplierList :suppliers="suppliers"></SupplierList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import Business from '@/models/Business';
import { useSupplierStore } from '@/stores/SupplierStore';
import SupplierList from '../../../components/lists/SupplierList.vue';
import NotificationButton from '../../../components/notifications/NotificationButton.vue';

const supplierStore = useSupplierStore();
const suppliers = ref<Business[]>([]);

async function fetchSuppliers() {
  suppliers.value = await supplierStore.getSuppliers();
}

onMounted(() => fetchSuppliers());
</script>
