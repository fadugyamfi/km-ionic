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
          @keyup.enter="onEnterSearch"
        ></IonSearchbar>
      </IonToolbar>
    </section>

    <ion-content>
      <ion-list >
        
        <BusinessList :businesses="businesses"></BusinessList>
      </ion-list>

      <ion-text class="no-result" v-if="businesses.length === 0">
        <p> No results available </p>
        <span class="info">
        - Check your spelling for typing errors
       <br>
        - Try searching with short and simple keywords
       <br>
        - Try searching more general terms 
    </span>
      </ion-text>
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
const onEnterSearch = () => {
  // This function is called when the user presses "Enter" in the search bar
  fetchBusinesses();
};
onMounted(() => {
  if( meta.businessType == 'supplier' ) {
    fetchSuppliers()
  } else {
    fetchBusinesses()
  }
});
</script>
<style scoped>
.no-result {
  font-weight: bold;
  text-align: center; 
  font-size: 16px;
  padding: 50px; 
}
.info {
  font-weight: normal;
  text-align: center;
  color: #666EED;
  justify-content: center;
  display: flex;
  align-items: center; 
  font-size: 15px;
  padding: 52px;
}
</style>