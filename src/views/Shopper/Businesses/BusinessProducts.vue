<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton
              :defaultHref="`/shopper/home/businesses/${business?.id}`"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">{{ business?.name }}</IonTitle>
          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          @keyup.enter="onSearch($event)"
          @ion-change="onSearch($event)"
        ></IonSearchbar>
      </IonToolbar>
    </section>

    <ion-content>
      <section
        v-if="fetching"
        class="ion-text-center d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <IonGrid v-if="!fetching">
        <IonRow>
          <IonCol size="6" v-for="product in products" :key="product.id">
            <ProductCard
              :show-add-to-cart="!isVendorMode"
              :show-add-to-favorites="!isVendorMode"
              :product="product"
            ></ProductCard>
          </IonCol>
        </IonRow>
      </IonGrid>
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
  IonSearchbar,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import Business from "@/models/Business";
import Product from "@/models/Product";
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useRoute } from "vue-router";
import ProductCard from "@/components/cards/ProductCard.vue";

const businessStore = useBusinessStore();
const userStore = useUserStore();
const route = useRoute();
const business = ref<Business | null>();
const products = ref<Product[]>([]);
const fetching = ref(false);

const isVendorMode = computed(() => userStore.appMode == "vendor");

const onSearch = async (event: any) => {
  fetching.value = true;
  businessStore.searchQuery = event.target?.value;
  // stocks.value = [];
  products.value = await businessStore.getBusinessProducts(
    business.value as Business
  );
  fetching.value = false;
};

onMounted(async () => {
  fetching.value = true;
  business.value = await businessStore.getBusiness(+route.params.id);
  products.value = await businessStore.getBusinessProducts(
    business.value as Business
  );
  fetching.value = false;
});
</script>
