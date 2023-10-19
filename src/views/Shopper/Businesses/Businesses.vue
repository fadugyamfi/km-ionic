<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"><b>Suppliers</b></IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <ion-content>
      <SupplierList :suppliers="suppliers"></SupplierList>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import Business from '@/models/Business';
import { useBusinessStore } from '@/stores/BusinessStore';
import SupplierList from '@/components/lists/SuppliersList.vue';
import NotificationButton from '../../../components/notifications/NotificationButton.vue';
import { useRoute } from 'vue-router';

const businessStore = useBusinessStore();
const route = useRoute();
const suppliers = ref<Business[]>([]);
const params = route.params;
console.log(params);

async function fetchSuppliers() {
  suppliers.value = await businessStore.getSuppliers();
}

onMounted(() => fetchSuppliers());
</script>
