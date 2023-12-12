<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small"
            ><b>{{ meta.title || $t("general.businesses") }}</b></IonTitle
          >

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonToolbar style="margin-top: 5px">
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          v-model="search.term"
          @ion-change="fetchBusinesses()"
          @keyup.enter="fetchBusinesses()"
        >
        </IonSearchbar>
      </IonToolbar>
    </section>

    <IonContent>
      <div class="ion-text-center" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <!-- Display your list of businesses here -->
      <BusinessList :businesses="businesses"></BusinessList>

      <NoResults
        v-if="!fetching && businesses.length == 0"
        :title="$t('shopper.businesses.noResultsAvailable')"
        :description="$t('shopper.businesses.pleaseTryYourSearchAgain')"
      ></NoResults>
    </IonContent>
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
  IonSearchbar,
  IonText,
  IonSpinner,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import Business from "@/models/Business";
import { useBusinessStore } from "@/stores/BusinessStore";
import BusinessList from "@/components/modules/business/BusinessList.vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { useRoute, useRouter } from "vue-router"; // Import 'useRouter'
import NoResults from "../../../components/layout/NoResults.vue";

const businessStore = useBusinessStore();
const route = useRoute();
const businesses = ref<Business[]>([]);
const meta = route.meta;
const fetching = ref(false);

const search = { term: "" };

async function fetchBusinesses() {
  if (fetching.value == true) return;

  fetching.value = true;

  if (meta.businessType == "supplier") {
    businesses.value = await businessStore.getSuppliers(search.term);
  } else {
    businesses.value = await businessStore.getBusinesses(search.term);
  }

  fetching.value = false;
}

onMounted(() => fetchBusinesses());
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
  color: #666eed;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 52px;
}
</style>
