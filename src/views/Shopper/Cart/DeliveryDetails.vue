<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <DeliveryDetailsHeader />
    </section>

    <!-- Main Content -->
    <ion-content class="ion-padding">
      <form>
        <h6 style="margin-top: 0px" class="fw-semibold ">Add Delivery Address</h6>
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
        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.delivery_phone_number,
          }"
          type="number"
          label="Phone Number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_phone_number"
          name="phone-number"
          @ion-input="form.validate($event)"
          required
        >
        </IonInput>
        <h6 class="fw-semibold font-medium">Delivery Date</h6>
        <IonInput
          class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_date }"
          label="DD/MM/YY"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.delivery_date"
          name="delivery-date"
          @ion-input="form.validate && form.validate($event)"
          readonly
        ></IonInput>
        <section class="d-flex flex-column">
          <IonText class="fw-semibold font-medium" style="margin-bottom: 6px">Delivery</IonText>
          <IonText color="medium" class="font-medium">
            Select delivery method
          </IonText>
        </section>
          <DeliveryMethod
            :location="form.fields.delivery_location"
            :delivery-date="form.fields.delivery_date"
            @onSelectDeliveryMethod="selectDeliveryMethod"
          />
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton :disabled="!formValid" @click="storeDeliveryDetails">
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
  IonSpinner,
  onIonViewDidEnter,
} from "@ionic/vue";
import { navigateOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import DeliveryDetailsHeader from "@/components/header/DeliveryDetailsHeader.vue";
import { useCartStore } from "@/stores/CartStore";
import { useForm } from "@/composables/form";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { Order } from "@/models/Order";
import { useUserStore } from "@/stores/UserStore";
import LocationInput from "@/components/forms/LocationInput.vue";
import DeliveryMethod from "@/components/modules/deliveryDetails/DeliveryMethod.vue";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const userStore = useUserStore();
const form = useForm({
  delivery_location: "",
  delivery_nearest_landmark: "",
  delivery_phone_number: "",
  delivery_date: "",
  delivery_method: "",
  payment_option_id: 1,
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

const storeDeliveryDetails = () => {
  try {
    const cartStore = useCartStore();
    const index = cartStore.orders.findIndex(
      (b) => b.businesses_id == Number(route.params.id)
    );

    if (index !== -1) {
      cartStore.orders[index] = {
        ...cartStore.orders[index],
        ...form.fields,
      };
      cartStore.persist();
      // router.push(`/shopper/cart/business/${route.params.id}/item-review`);
      router.push(`/shopper/cart/business/${route.params.id}/payment-options`);
    } else {
      console.error("Business ID not found in cartStore.orders");
    }
  } catch (error) {
    console.error("An error occurred in storeDeliveryDetails:", error);
  }
};

const formValid = computed(() => {
  const fields = form.fields;

  return fields.delivery_nearest_landmark || fields.delivery_nearest_landmark;
});

onIonViewDidEnter(async () => {
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
