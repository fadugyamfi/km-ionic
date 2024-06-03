<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/agent/orders/place-order/configure-items"
            ></IonBackButton>
          </IonButtons>
          <IonTitle v-if="$route.fullPath.includes('record')" size="small"
            ><b>Record New Order</b></IonTitle
          >
          <IonTitle v-else size="small"
            ><b>{{ $t("shopper.cart.placeNewOrder") }}</b></IonTitle
          >
          <IonButtons slot="end" style="margin-right: 10px"> </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <!-- Main Content -->
    <ion-content class="ion-padding">
      <form>
        <h6 style="margin-top: 0px">Order Date</h6>
        <IonInput
          type="datetime-local"
          class="kola-input delivery-details-input"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_location }"
          label="Order Date & Time"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.ordered_at"
          name="ordered_at"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <h6>Add Delivery Address</h6>
        <LocationInput
          v-model="form.fields.delivery_location"
          label="Town/Locality"
        ></LocationInput>

        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.delivery_nearest_landmark,
          }"
          label="Nearest Landmark"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_nearest_landmark"
          name="landmark"
          @ion-input="form.validate($event)"
          required
        >
        </IonInput>
        <h6>Delivery Date</h6>
        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_date }"
          label="DD/MM/YY"
          labelPlacement="stacked"
          fill="solid"
          type="date"
          v-model="form.fields.delivery_date"
          name="delivery-date"
          @ion-input="form.validate && form.validate($event)"
        ></IonInput>
        <!-- <section>
            <h6 class="fw-semibold" style="margin-bottom: 6px">Delivery</h6>
            <IonText color="medium" class="font-medium">
              Select delivery method
            </IonText>
            <DeliveryMethod
              :location="form.fields.location"
              :delivery-date="form.fields.delivery_date"
              @onSelectDeliveryMethod="selectDeliveryMethod"
            />
          </section> -->
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton :disabled="!formValid" @click="recordOrder">
        {{ $t("shopper.cart.placeOrder") }}
      </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
  IonInput,
  onIonViewDidEnter,
  IonSpinner,
} from "@ionic/vue";
import { navigateOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import LocationInput from "@/components/forms/LocationInput.vue";
import DeliveryDetailsHeader from "@/components/header/DeliveryDetailsHeader.vue";
import { useCartStore } from "@/stores/CartStore";
import { useForm } from "@/composables/form";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { Order } from "@/models/Order";
import { formatMySQLDateTime,formatDateTimeForInput, handleAxiosRequestError } from "@/utilities";
import { useOrderStore } from "@/stores/OrderStore";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const form = useForm({
  delivery_location: "",
  delivery_nearest_landmark: "",
  delivery_date: "",
  delivery_method: "",
  payment_option_id: "2",
  ordered_at: "",
});

const selectDeliveryMethod = (method: string) => {
  form.fields.delivery_method = method;

  // Define the number of days to add based on the method
  let daysToAdd = method === "standard" ? 3 : method === "express" ? 2 : 0;

  if (daysToAdd > 0) {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    // Format the date as DD/MM/YY
    const dd = deliveryDate.getDate().toString().padStart(2, "0");
    const mm = (deliveryDate.getMonth() + 1).toString().padStart(2, "0");
    const yy = deliveryDate.getFullYear().toString().slice(-2);

    form.fields.delivery_date = `${dd}/${mm}/${yy}`;
  }
};

const userStore = useUserStore();
const recordOrder = async () => {
  const orderStore = useOrderStore();

  orderStore.newOrder = {
    ...orderStore.newOrder,
    ...form.fields,
  };

  toastStore.blockUI();
  try {
    const order = await orderStore.recordOrder();

    if (!order) {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to record order",
        "Error",
        "bottom",
        "configure-continue"
      );
      return;
    }
    if (userStore.activeRole?.isSalesAssociate()) {
      router.push("/agent/orders/place-order/order-confirmation");
    } else {
      router.push("/vendor/orders/record-order/order-confirmation");
    }
  } catch (error) {
    console.log(error);
    handleAxiosRequestError(error);
  } finally {
    toastStore.unblockUI();
  }
};

const formValid = computed(() => {
  const fields = form.fields;

  return fields.delivery_nearest_landmark || fields.delivery_nearest_landmark;
});

onIonViewDidEnter(async () => {
  const orderStore = useOrderStore();
  // await orderStore.loadFromStorage();
  Object.assign(form.fields, {
    ...orderStore.newOrder,
    ordered_at: formatMySQLDateTime(new Date().toISOString()),
  });
  // Set the delivery method here based on your requirement
  // For example, setting it to 'standard' when the component is mounted
  const initialDeliveryMethod = "standard";
  selectDeliveryMethod(initialDeliveryMethod);
});
</script>

<style scoped lang="scss">
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.delivery-details-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}

.use-location {
  --color: #666eed;
  --padding-start: 0px;
}

ion-footer {
  background-color: #fefefe;
}
h6 {
  font-size: 14px;
  margin-top: 24px;
}
</style>
