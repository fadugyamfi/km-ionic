<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <DeliveryDetailsHeader />
    </section>

    <!-- Main Content -->
    <ion-content class="ion-padding">
      <h6 class="fw-semibold" style="margin-top: 0px">Add Delivery Address</h6>
      <form>
        <IonInput
          class="kola-input delivery-details-input"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_location }"
          label="Town/Locality"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_location"
          name="location"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <IonButton
          fill="clear"
          size="small"
          style="text-transform: none"
          class="ion-margin-bottom use-location ion-text-start"
          @click="getLocation()"
        >
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
        </IonButton>

        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_nearest_landmark}"
          label="Nearest Landmark"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_nearest_landmark"
          name="landmark"
          @ion-input="form.validate($event)"
          required
        >
        </IonInput>
        <h6 class="fw-semibold">Delivery Date</h6>
        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_date }"
          label="DD/MM/YY"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_date"
          name="delivery-date"
          @ion-input="form.validate($event)"
          readonly
        ></IonInput>
        <section>
          <section class="d-flex flex-column ion-margin-bottom">
            <IonText class="fw-semibold">Delivery</IonText>
            <IonText color="medium" class="font-medium">
              Select delivery method
            </IonText>
          </section>
          <DeliveryMethod
            :location="form.fields.location"
            :delivery-date="form.fields.delivery_date"
            @onSelectDeliveryMethod="selectDeliveryMethod"
          />
        </section>
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="storeDeliveryDetails">
        {{ $t("general.continue") }}
      </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
  IonInput,
} from "@ionic/vue";
import { navigateOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import DeliveryDetailsHeader from "@/components/header/DeliveryDetailsHeader.vue";
import DeliveryMethod from "@/components/modules/deliveryDetails/DeliveryMethod.vue";
import { useCartStore } from "@/stores/CartStore";
import { useForm } from "@/composables/form";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const form = useForm({
  delivery_location: "",
  delivery_nearest_landmark: "",
  delivery_date: "",
  delivery_method: "",
});
const selectDeliveryMethod = (method: string) => {
  form.fields.delivery_method = method;

  // Define the number of days to add based on the method
  let daysToAdd = method === "standard" ? 5 : method === "express" ? 2 : 0;

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

const storeDeliveryDetails = () => {
  const cartStore = useCartStore();
  const index = cartStore.orders.findIndex(
    (b) => b.businesses_id == Number(route.params.id)
  );
  cartStore.orders[index] = {
    ...cartStore.orders[index],
    ...form.fields,
  };
  cartStore.persist()
  router.push(`/shopper/cart/business/${route.params.id}/payment-options`);
};

const getLocation = async () => {
  const toastStore = useToastStore();

  try {
    const { getCurrentLocation } = useGeolocation();
    const coordinates = await getCurrentLocation();

    if (coordinates) {
      form.fields.delivery_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
    console.log(error);
  }
};

onMounted(async () => {
  const cartStore = useCartStore();
  if (cartStore.orders.length == 0) {
    await cartStore.loadFromStorage();
  }
  // Set the delivery method here based on your requirement
  // For example, setting it to 'standard' when the component is mounted
  const initialDeliveryMethod = "standard";
  selectDeliveryMethod(initialDeliveryMethod);
});
</script>

<style scoped lang="scss">
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
</style>
