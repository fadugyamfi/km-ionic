<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>

          <IonTitle size="small" class="fw-bold">
            {{ promotion?.name }}
          </IonTitle>

          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
            <ShareButton :title="promotion?.name || ''"></ShareButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <ion-content>
      <IonRefresher
        ref="refresher"
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent pullingIcon="crescent"></IonRefresherContent>
      </IonRefresher>
      <section
        v-if="fetching"
        class="ion-text-center d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <ProductGridList
        :products="products"
        :show-retail-prices="true"
      ></ProductGridList>
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
  RefresherCustomEvent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import Product from "@/models/Product";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Promotion from "@/models/Promotion";
import { usePromotionStore } from "@/stores/PromotionStore";
import PromotionItem from "@/models/PromotionItem";
import ProductGridList from "@/components/modules/products/ProductGridList.vue";
import { computed } from "vue";
import AppStorage from "@/stores/AppStorage";
import ShareButton from "@/components/buttons/ShareButton.vue";

const promotionStore = usePromotionStore();
const route = useRoute();
const promotion = ref<Promotion | null>();
const promotionItems = ref<PromotionItem[] | null>();
const fetching = ref(false);
const refreshing = ref(false);

const products = computed(() => {
  return promotionItems.value
    ?.filter((item: PromotionItem) => item.product != null)
    .map((item: PromotionItem) => item.product as Product);
});

const loadPromotionAndItems = async () => {
  fetching.value = true;

  let promotionIdOrSlug: string | string[] = route.params.idOrSlug;

  promotion.value = await promotionStore.getPromotion(
    promotionIdOrSlug as string
  );
  promotionItems.value = promotion.value?.promotion_items;

  if (!promotion.value) {
    fetching.value = false;
    return;
  }

  setTimeout(async () => {
    try {
      promotionItems.value = await promotionStore.getPromotionItems(
        promotion.value?.id as number,
        refreshing.value
      );
    } catch (error) {
      console.log(error);
    } finally {
      fetching.value = false;
      refreshing.value = false;
    }
  }, 100);
};

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  fetching.value = true;
  await loadPromotionAndItems();
  fetching.value = false;
  event.target.complete();
};

onIonViewDidEnter(() => loadPromotionAndItems());
</script>
