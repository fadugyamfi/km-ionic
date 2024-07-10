<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small" class="fw-bold">
            {{ promotion?.name }}
          </IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <ion-content>
      <section v-if="fetching" class="ion-text-center d-flex ion-justify-content-center ion-padding">
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <ProductGridList :products="products"></ProductGridList>
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
  onIonViewDidEnter,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import Product from "@/models/Product";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Promotion from "@/models/Promotion";
import { usePromotionStore } from "@/stores/PromotionStore";
import PromotionItem from "@/models/PromotionItem";
import { computed } from "vue";
import ProductGridList from "@/components/modules/products/ProductGridList.vue";
import AppStorage from "@/stores/AppStorage";

const promotionStore = usePromotionStore();
const route = useRoute();
const promotion = ref<Promotion | null>();
const promotionItems = ref<PromotionItem[] | null>();
const fetching = ref(false);
const storage = new AppStorage();
const cacheKey = "kola.promotion-items";

const products = computed(() => {
  return promotionItems.value?.filter((item: PromotionItem) => item.product != null)
    .map((item: PromotionItem) => item.product as Product);
})

const loadPromotionAndItems = async () => {
  let promotionIdOrSlug = route.params.idOrSlug;

  promotion.value = await promotionStore.getPromotion(promotionIdOrSlug as string);
  promotionItems.value = promotion.value?.promotion_items;

  if( !promotion.value ) {
    return;
  }

  setTimeout(async () => {
    fetching.value = true;
    try {
      promotionItems.value = await promotionStore.getGuestPromotionItems(promotion.value?.id as number);
    } catch (error) {
      console.log(error);
    } finally {
      fetching.value = false;
    }
  }, 100)
};

onIonViewDidEnter(() => loadPromotionAndItems());
</script>
