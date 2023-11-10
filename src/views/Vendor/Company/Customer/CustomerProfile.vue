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
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <CustomerProfileHeader :customer="customer" />
        <ProfileSubHeader :customer="customer" />
        <CustomerOrderHistory />
        <CustomerCredit />
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
import { ref, onMounted } from "vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import { useUserStore } from "@/stores/UserStore";
import Business from "@/models/Business";
import Customer from "@/models/Customer";
import { useRoute } from "vue-router";

const order = ref([]);
const customer = ref<Customer>();

const route = useRoute();

const fetching = ref(false);

const fetchCustomer = async () => {
  fetching.value = true;
  const userStore = useUserStore();
  const customerStore = useCustomerStore();

  customer.value = await customerStore.getCustomer(
    userStore.activeBusiness as Business,
    route.params.id
  );
  fetching.value = false;
};

onMounted(() => {
  fetchCustomer();
});
</script>
<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
</style>
