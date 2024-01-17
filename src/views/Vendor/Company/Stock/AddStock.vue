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
    <div class="ion-padding ion-text-center" v-show="fetching">
      <IonSpinner name="crescent"></IonSpinner>
    </div>
    <ion-content class="ion-padding" v-if="!fetching">
      <IonText style="font-size: 14px" color="medium" size="small">
        {{ $t("profile.stock.addProductImage") }}
      </IonText>
      <form v-show="!fetching">
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
            'ion-invalid ion-touched': form.errors.product_categories_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_categories_id"
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
          label="Brand"
          :class="{
            'ion-invalid ion-touched': form.errors.brands_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.brands_id"
          required
          name="brands_id"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="brand in brands"
            :key="brand.id"
            :value="brand.id"
          >
            {{ brand.name }}</IonSelectOption
          >
        </IonSelect>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.stock.variation')"
          :class="{
            'ion-invalid ion-touched': form.errors.product_variation,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_variation"
          required
          name="variation"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="variation in productVariations"
            :key="variation.id"
            :value="variation.id"
          >
            {{ variation.name }}</IonSelectOption
          >
        </IonSelect>
        <IonTextarea
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.product_description,
          }"
          :label="$t('profile.stock.itemDescription')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_description"
          name="description"
          @ion-input="form.validate($event)"
          required
        ></IonTextarea>

        <IonSelect
          class="kola-input ion-margin-bottom"
          label="Product unit"
          :class="{
            'ion-invalid ion-touched': form.errors.product_units_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_units_id"
          required
          name="product_units_id"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="unit in productUnits"
            :key="unit.id"
            :value="unit.id"
          >
            {{ unit.name }}</IonSelectOption
          >
        </IonSelect>
        <section class="radio-wrapper ion-margin-bottom">
          <h6>Quantity Type</h6>
          <ion-radio-group
            :class="{
              'ion-invalid ion-touched': form.errors.product_groups_id,
            }"
            v-model="form.fields.product_groups_id"
          >
            <div v-for="group in productGroups" :key="group.id">
              <ion-radio :value="group.id" label-placement="end"
                >{{ group.name }}
              </ion-radio>
            </div>
          </ion-radio-group>
        </section>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.group_quantity }"
          :label="$t('profile.stock.groupQuantity')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.group_quantity"
          name="quantity_available"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.stock_quantity }"
          :label="$t('profile.stock.stockQuantity')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.stock_quantity"
          name="stock_quantity"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.product_sku }"
          label="Product sku"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_sku"
          name="product_sku"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.product_price }"
          :label="$t('profile.stock.price')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.product_price"
          name="price"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.weight_value }"
          :label="$t('profile.stock.weight')"
          type="number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.weight_value"
          name="weight"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.volume_value }"
          :label="$t('profile.stock.volume')"
          type="number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.volume_value"
          name="volume"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <ion-input
          :label="$t('profile.stock.selectExpiryDate')"
          label-placement="stacked"
          class="kola-input"
          type="date"
          v-model="form.fields.date"
        ></ion-input>

        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createStock"
            >{{ $t("general.save") }}</KolaYellowButton
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
import { useUserStore } from "@/stores/UserStore";
import { useForm } from "@/composables/form";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";
import { useStockStore } from "@/stores/StockStore";
import { useBrandStore } from "@/stores/BrandStore";
import Brand from "@/models/Brand";

const toastStore = useToastStore();
const stockStore = useStockStore();

const route = useRoute();
const router = useRouter();

const fetching = ref(false);
const productGroups = ref<any>([]);
const productVariations = ref<any>([]);
const brands = ref<Brand[]>([]);
const productUnits = ref<any>([]);

const photo = ref();

const form = useForm({
  product_image: "",
  product_categories_id: "",
  product_name: "",
  product_variation: "",
  product_description: "",
  group_quantity: "",
  product_groups_id: "",
  product_price: "",
  product_units_id: "",
  brands_id: "",
  product_sku: "",
  currencies_id: 1,
  stock_quantity: "",
  weight_value: "",
  volume_value: "",
  date: "",
});

const categories = computed(() => useProductCategoryStore().categories);

const formValid = computed(() => {
  const fields = form.fields;
  return (
    fields.product_name.length > 0 &&
    fields.product_description.length > 0 &&
    fields.date.length > 0 &&
    fields.product_sku.length > 0 &&
    isNaN(Number(fields.product_variation)) == false &&
    isNaN(Number(fields.product_price)) == false &&
    fields.product_categories_id &&
    fields.product_groups_id &&
    fields.brands_id &&
    fields.product_units_id &&
    fields.group_quantity &&
    fields.stock_quantity &&
    fields.volume_value &&
    fields.weight_value
  );
});

const createStock = async () => {
  try {
    const userStore = useUserStore();
    toastStore.blockUI("Hold On As We Add Your Stock");
    const stock = await stockStore.addStock({
      ...form.fields,
      businesses_id: userStore.activeBusiness?.id,
    });
    if (stock) {
      toastStore.unblockUI();
      await toastStore.showSuccess("Stock has been added successfully");
      router.push("/profile/company/stocks");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to add Stock. Please try again",
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

const fetchProductGroups = async () => {
  fetching.value = true;
  productGroups.value = await stockStore.fetchProductGroups();
  fetching.value = false;
};
const fetchProductVariations = async () => {
  fetching.value = true;
  productVariations.value = await stockStore.fetchProductVariations();
  fetching.value = false;
};
const fetchBrands = async () => {
  const brandStore = useBrandStore();
  fetching.value = true;
  const response = await brandStore.fetchBrands();
  fetching.value = false;
  brands.value = brandStore.brands;
};
const fetchProductUnits = async () => {
  fetching.value = true;
  productUnits.value = await stockStore.fetchProductUnits();
  fetching.value = false;
};

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
  fetchProductGroups();
  fetchProductVariations();
  fetchBrands();
  fetchProductUnits();
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
