<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"><b>{{ meta.title || $t("general.businesses") }}</b></IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonToolbar style="margin-top: 5px;">
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          :debounce="2000"
          v-model="search.term"
          @ion-change="fetchBusinesses()"
          @ion-input="fetchBusinesses()"
        ></IonSearchbar>
      </IonToolbar>
    </section>

    <ion-content>
      <BusinessList :businesses="businesses"></BusinessList>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSearchbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import Business from '@/models/Business';
import { useBusinessStore } from '@/stores/BusinessStore';
import BusinessList from '@/components/modules/business/BusinessList.vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import { useRoute } from 'vue-router';

const businessStore = useBusinessStore();
const route = useRoute();
const businesses = ref<Business[]>([]);
const meta = route.meta;

const search = { term: '' }

async function fetchSuppliers() {
  businesses.value = await businessStore.getSuppliers(search);
}

async function fetchBusinesses() {
  businesses.value = [];
  businesses.value = await businessStore.getBusinesses(search.term);
}

onMounted(() => {
  if( meta.businessType == 'supplier' ) {
    fetchSuppliers()
  } else {
    fetchBusinesses()
  }
});
</script>
