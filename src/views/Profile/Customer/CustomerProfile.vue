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
              defaultHref="/profile/company/customers"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel>{{ customer?.name }}</IonLabel>
            </section></IonTitle
          >
          <ion-buttons slot="end">
            <ion-button color="dark">
              <IonIcon :icon="chatbubbleOutline"></IonIcon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent>
      <CustomerProfileHeader :customer="customer" />
      <ProfileSubHeader :customer="customer" />

      <div class="ion-padding ion-text-center" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-else>
        <CustomerOrderHistory :orders="orders" />
        <CustomerCredit :credits="credits" />
      </section>
    </IonContent>
  </ion-page>
</template>
<script lang="ts" setup>
import CustomerProfileHeader from "@/components/modules/customers/CustomerProfileHeader.vue";
import ProfileSubHeader from "@/components/modules/customers/ProfileSubHeader.vue";
import CustomerOrderHistory from "@/components/modules/customers/CustomerOrderHistory.vue";
import CustomerCredit from "@/components/modules/customers/CustomerCredit.vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonLabel,
  IonTitle,
  IonIcon,
  IonContent,
  IonText,
  IonSpinner,
} from "@ionic/vue";
import { chatbubbleOutline, arrowBackOutline } from "ionicons/icons";
import { ref, onMounted, computed } from "vue";
import { handleAxiosRequestError } from "@/utilities";
import { useCustomerStore } from "@/stores/CustomerStore";
import { useUserStore } from "@/stores/UserStore";
import { Order } from "@/models/Order";
import Business from "@/models/Business";
import Customer from "@/models/Customer";
import { useRoute } from "vue-router";

const order = ref([]);
const customer = ref<Customer>();
const userStore = useUserStore();
const customerStore = useCustomerStore();

const route = useRoute();

const fetching = ref(false);

const orders = ref();
const credits = computed(() => customerStore.creditPayments.slice(0, 3));

const fetchCustomer = async () => {
  try {
    fetching.value = true;
    if (customerStore.selectedCustomer) {
      customer.value = customerStore.selectedCustomer;
    } else {
      customer.value = (await customerStore.getCustomer(
        userStore.activeBusiness as Business,
        route.params.id
      )) as Customer;
    }
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};

const fetchCustomerOrders = async () => {
  try {
    fetching.value = true;
    const customer_id = route.params.id;
    const data = await customerStore.receivedOrders(customer_id);
    orders.value = data?.slice(0, 3);
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};

const fetchCustomerCredits = async () => {
  try {
    fetching.value = true;
    const customer_id = route.params.id;
    await customerStore.fetchCustomerCredits(customer_id);
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    fetching.value = false;
  }
};

onMounted(async () => {
  await fetchCustomer();
  fetchCustomerOrders();
  fetchCustomerCredits();
});
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
</style>
