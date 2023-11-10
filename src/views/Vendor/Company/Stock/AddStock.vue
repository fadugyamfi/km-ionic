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
            {{ $t("profile.stock.addStock") }}
          </IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <ion-content class="ion-padding">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <IonText style="font-size: 14px" color="medium" size="small">
        {{ $t("profile.stock.addProductImage") }}
      </IonText>
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
          :label="$t('profile.stock.category')"
          :class="{
            'ion-invalid ion-touched': form.errors.category,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.category"
          required
          name="category"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            >{{ category.name }}</IonSelectOption
          >
        </IonSelect>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.product_name }"
          :label="$t('profile.stock.productName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_name"
          name="name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.stock.variation')"
          :class="{
            'ion-invalid ion-touched': form.errors.size,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.size"
          required
          name="variation"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption> </IonSelectOption>
        </IonSelect>
        <IonTextarea
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.description }"
          :label="$t('profile.stock.itemDescription')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.description"
          name="description"
          @ion-input="form.validate($event)"
          required
        ></IonTextarea>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.quantity_available }"
          :label="$t('profile.stock.quantityAvailable')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.quantity_available"
          name="quantity_available"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <section class="radio-wrapper ion-margin-bottom">
          <h6>Quantity Type</h6>
          <ion-radio-group
            :class="{
              'ion-invalid ion-touched': form.errors.quantity_available,
            }"
            v-model="form.fields.quantity_type"
          >
            <div v-for="quantityT in quantityTypes" :key="quantityT.id">
              <ion-radio :value="quantityT.name" label-placement="end"
                >{{ quantityT.name }}
              </ion-radio>
            </div>
          </ion-radio-group>
        </section>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.price }"
          :label="$t('profile.stock.price')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.price"
          name="price"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <ion-input
          label="Select a date"
          label-placement="stacked"
          class="kola-input"
          type="date"
          v-model="form.fields.date"
        ></ion-input>

        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createMember"
            >{{ $t("profile.stock.save") }}</KolaYellowButton
          >
          <KolaWhiteButton style="margin-top: 8px" @click="cancel()">{{
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
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonSpinner,
  IonImg,
  IonCardContent,
  IonCard,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { arrowBackOutline, chevronDownOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useCustomerStore } from "@/stores/CustomerStore";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useForm } from "@/composables/form";
import Business from "@/models/Business";
import User from "@/models/User";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const businessStore = useBusinessStore();

const route = useRoute();
const router = useRouter();

const fetching = ref(false);
const salesAgents = ref<User[]>([]);
const photo = ref();

const form = useForm({
  product_image: "",
  category: "",
  product_name: "",
  size: "",
  description: "",
  quantity_available: "",
  quantity_type: "",
  price: "",
  date: "",
});

const categories = computed(() => useProductCategoryStore().categories);
const quantityTypes = ref([
  {
    id: 1,
    name: "Pieces",
  },
  {
    id: 2,
    name: "Boxes",
  },
  {
    id: 3,
    name: "Cases",
  },
  {
    id: 4,
    name: "Cartons",
  },
]);

const formValid = computed(() => {
  const fields = form.fields;
  return (
    fields.product_name.length > 0 &&
    fields.description.length > 0 &&
    fields.date.length > 0 &&
    isNaN(Number(fields.size)) == false &&
    isNaN(Number(fields.price)) == false &&
    fields.category &&
    fields.quantity_available &&
    fields.quantity_type
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

const getProductCategories = async () => {
  try {
    fetching.value = true;
    const productCategoryStore = useProductCategoryStore();
    const response = await productCategoryStore.fetchCategories();
    if (response) {
      fetching.value = false;
    }
  } catch (error) {}
};

// const fetchBusinessSalesAgent = async () => {
//   fetching.value = true;
//   const userStore = useUserStore();
//   const businessStore = useBusinessStore();
//   salesAgents.value = await businessStore.getBusinessSaleAgents(
//     userStore.activeBusiness as Business,
//     50
//   );
//   fetching.value = false;
// };

const pickImages = async () => {
  const { takePhoto, photos, pickImages } = usePhotoGallery();
  try {
    await pickImages();

    photo.value = photos.value ? photos.value[0] : null;
    if (photo.value) {
      form.fields.product_image = photo.value.base64Data as string;
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getProductCategories();
  // fetchBusinessSalesAgent();
});

const cancel = () => {
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
ion-card {
  margin: 20px 0px;
  border-color: #b4b4b4;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
}
ion-radio {
  --border-radius: 4px;
  --inner-border-radius: 4px;

  --color: #ddd;
  --color-checked: #6815ec;
}

ion-radio.ios::part(container) {
  width: 20px;
  height: 20px;

  border: 2px solid #ddd;
  border-radius: 4px;
}

.radio-checked.ios::part(container) {
  border-color: #6815ec;
}
.radio-wrapper {
  background: #f6f6f6;
  padding: 5px 10px;
  border-color: #b4b4b4;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;

  div {
    padding: 10px;
    color: #344054;
  }
}
.date-wrapper {
  background: #f6f6f6;
  ion-input {
  }
}
</style>
