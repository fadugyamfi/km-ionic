<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header ion-no-border">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/profile/company/stocks"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <!-- {{ $t("profile.customers.addCustomer") }} -->
            Add Stock
          </IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>

    <ion-content class="ion-padding">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <div class="ion-text-left ion-margin-bottom">
        <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
          Add Product Image
        </p>
      </div>
      <form v-show="!fetching" @submit.prevent="createMember()">
        <IonCard color="light">
          <IonImg
            v-if="photo"
            :src="photo.webviewPath"
            @click="pickImages()"
          ></IonImg>

          <IonCardContent
            v-if="!photo"
            @click="pickImages()"
            class="d-flex ion-justify-content-center ion-align-items-center flex-column"
            style="height: 200px"
          >
            <IonImg
              src="/images/vendor/featured-image.svg"
              style="width: 64px; margin-bottom: 15px"
            ></IonImg>
            <p class="font-medium">Tap to upload</p>
            <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p>
          </IonCardContent>
        </IonCard>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.stocks.categories')"
          :class="{
            'ion-invalid ion-touched': form.errors.cms_users_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.cms_users_id"
          required
          name="sales-agent"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="agent in salesAgents"
            :key="agent.id"
            :value="agent.id"
          >
            {{ agent.name }}
          </IonSelectOption>
        </IonSelect>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.productName }"
          :label="$t('profile.stocks.productName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.productName"
          name="name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.stocks.variation')"
          :class="{
            'ion-invalid ion-touched': form.errors.cms_users_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.cms_users_id"
          required
          name="sales-agent"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="agent in salesAgents"
            :key="agent.id"
            :value="agent.id"
          >
            {{ agent.name }}
          </IonSelectOption>
        </IonSelect>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.item_description }"
          :label="$t('profile.stocks.itemDescription')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.itemDescription"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.quantity_available }"
          :label="$t('profile.stocks.newPermission')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.quantity_available"
          name="new_permission"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <h6>Quantity Type</h6>
        <ion-list>
          <ion-item>
            <ion-checkbox v-model="featureEnabled"></ion-checkbox>
            <ion-label>Pieces</ion-label>
          </ion-item>
          <ion-item>
            <ion-checkbox v-model="featureEnabled"></ion-checkbox>
            <ion-label>Boxes</ion-label>
          </ion-item>
          <ion-item>
            <ion-checkbox v-model="featureEnabled"></ion-checkbox>
            <ion-label>Cases</ion-label>
          </ion-item>
          <ion-item>
            <ion-checkbox v-model="featureEnabled"></ion-checkbox>
            <ion-label>Cartons</ion-label>
          </ion-item>
        </ion-list>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.price }"
          :label="$t('profile.stocks.newPermission')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.price"
          name="new_permission"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <ion-item>
          <ion-label position="stacked">Select a date</ion-label>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime"></ion-datetime>
          </ion-modal>
        </ion-item>

        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createMember"
            >{{ $t("profile.stocks.save") }}</KolaYellowButton
          >
          <KolaWhiteButton style="margin-top: 8px" @click="dismiss()">{{
            $t("general.cancel")
          }}</KolaWhiteButton>
        </IonFooter>
      </form>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonHeader,
  IonSpinner,
  IonImg,
  IonCardContent,
  IonCard,
  IonDatetimeButton,
  IonModal,
} from "@ionic/vue";
import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
  navigateOutline,
  arrowBackOutline,
  chevronDownOutline,
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useCustomerStore } from "@/stores/CustomerStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useForm } from "@/composables/form";
import Business from "@/models/Business";
import User from "@/models/User";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const businessStore = useBusinessStore();
const fetching = ref(false);
const route = useRoute();
const router = useRouter();
const paymentModes = ref<any>([]);
const salesAgents = ref<User[]>([]);
const emit = defineEmits(["dismiss", "confirm"]);
const photo = ref();
const selectedDate = ref(new Date().toISOString());

const form = useForm({
  name: "",
  location: "",
  business_name: "",
  phone_number: "",
  cms_users_id: "",
  business_types_id: "",
});

const formValid = computed(() => {
  const fields = form.fields;
  return (
    fields.name.length > 0 &&
    fields.business_name.length > 0 &&
    fields.location.length > 0 &&
    isNaN(Number(fields.cms_users_id)) == false &&
    fields.phone_number.length > 0 &&
    fields.business_types_id
  );
});

const createMember = async () => {
  try {
    toastStore.blockUI("Hold On As We Add Your Customer");
    const customer = await customerStore.createBusinessCustomer(form.fields);
    if (customer) {
      toastStore.unblockUI();
      router.push("profile/company/customers");
      toastStore.showSuccess("Customer has been added successfully");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to add Customer. Please try again",
        "",
        "bottom",
        "footer"
      );
    }
  } catch (error) {
  } finally {
    toastStore.unblockUI();
  }
};

const getPaymentModes = async () => {
  try {
    fetching.value = true;
    const response = await axios.get("/v2/payment-modes");
    if (response) {
      fetching.value = false;
      paymentModes.value = response.data.data;
    }
  } catch (error) {}
};

const fetchBusinessSalesAgent = async () => {
  fetching.value = true;
  const userStore = useUserStore();
  const businessStore = useBusinessStore();
  salesAgents.value = await businessStore.getBusinessSaleAgents(
    userStore.activeBusiness as Business,
    50
  );
  fetching.value = false;
};

const getLocation = async () => {
  const toastStore = useToastStore();
  const { getCurrentLocation } = useGeolocation();
  try {
    const coordinates = await getCurrentLocation();

    if (coordinates) {
      form.fields.location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
  }
};

const pickImages = async () => {
  const { takePhoto, photos, pickImages } = usePhotoGallery();
  try {
    await pickImages();

    photo.value = photos.value ? photos.value[0] : null;
    if (photo.value) {
      businessStore.registration.logo_image = photo.value.base64Data as string;
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getPaymentModes();
  fetchBusinessSalesAgent();
});

const dismiss = () => {
  router.push("/profile/company/stocks");
};
</script>

<style scoped lang="scss">
ion-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}
.use-location {
  --color: #666eed;
  --padding-start: 0px;
}
h6 {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #74787c;
}
ion-checkbox {
  --size: 1rem;
  --checkbox-background-checked: #6815ec;
}

ion-checkbox::part(container) {
  border-radius: 0.25rem;
  border: 1px solid var(--Kola-Blue, #036);
}
</style>
