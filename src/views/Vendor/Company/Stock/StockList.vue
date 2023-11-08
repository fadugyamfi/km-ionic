<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/vendor/profile"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel>
                <!-- {{ $t("profile.customers.customers") }} -->
                Stock
              </IonLabel>
            </section></IonTitle
          >
        </ion-toolbar>
      </ion-header>
      <IonSegment class="ion-segment">
        <IonSegmentButton value="month">
          <IonLabel>This Month</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="week">
          <ion-label>This Week</ion-label>
        </IonSegmentButton>
        <IonSegmentButton value="today">
          <ion-label>Today</ion-label>
        </IonSegmentButton>
      </IonSegment>
      <IonContent
        class="ion-padding-horizontal d-flex ion-align-items-center ion-justify-content-between"
      >
        <IonCard>
          <p>Total value of stock</p>
          <h5>GHS 3789.00</h5>
        </IonCard>
        <IonCard>
          <p>Total value of stock</p>
          <h5>GHS 3789.00</h5>
        </IonCard>
      </IonContent>
      <ion-searchbar></ion-searchbar>

      <header
        class="ion-padding-horizontal d-flex ion-align-items-center ion-justify-content-between"
      >
        <h4>Available Stock</h4>

        <IonText color="primary" router-link="/shopper/home/categories">
          View all
        </IonText>
      </header>
      <ProductStockList
        v-if="categories.length > 0"
        :categories="categories"
      ></ProductStockList>
    </IonHeader>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonTitle,
  RefresherCustomEvent,
  IonLabel,
  IonIcon,
  InfiniteScrollCustomEvent,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonSearchbar,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Business from "@/models/Business";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/CustomerStore";
import ProductStockList from "@/components/modules/customers/stock/ProductStockList.vue";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";
import ProductCategory from "@/models/ProductCategory";

const fetching = ref(false);
const refreshing = ref(false);
const currentPage = ref(1);
const router = useRouter();
const searchEnabled = ref(false);
const customers = ref<any[]>([]);
const paginatedCustomers = ref<Business[]>([]);

const handleRefresh = async (event: RefresherCustomEvent) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchCustomers();
  refreshing.value = false;
  event.target.complete();
};

const onSearch = async (event: Event) => {
  refreshing.value = true;
  fetching.value = true;
  await fetchCustomers({
    name_like: (event.target as HTMLIonSearchbarElement).value,
  });
  refreshing.value = false;
};

const addStock = () => {
  router.push("/profile/company/stocks/add-stock");
};

const ionInfinite = async (ev: InfiniteScrollCustomEvent) => {
  await fetchCustomers();
  ev.target.complete();
};

const fetchCustomers = async (options = {}) => {
  if (customers.value?.length == 0) {
    fetching.value = true;
  }
  const userStore = useUserStore();
  const customerStore = useCustomerStore();

  customers.value = await customerStore.getBusinessCustomers(
    userStore.activeBusiness as Business,
    100,
    options,
    refreshing.value
  );

  fetching.value = false;
};

onMounted(() => {
  fetchCustomers();
});

const categories = ref([] as Array<ProductCategory>);
const productCategoryStore = useProductCategoryStore();

const fetchTopCategories = async () => {
  const fetchedCategories = await productCategoryStore.getCategories();
  categories.value = fetchedCategories.slice(0, 4);
};

onMounted(() => {
  fetchTopCategories();
});
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

.ion-segment {
  margin-top: 16px;
}
</style>
