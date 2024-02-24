<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/signup/vendor/summary"></IonBackButton>
        </IonButtons>
        <IonTitle></IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <HeaderArea
        :title="$t('signup.vendor.letsGetYouSellingOnKola')"
        :subtext="$t('signup.vendor.summary.weWantToGetToKnowYourBusiness')"
      ></HeaderArea>

      <form method="post" ref="form" @submit.prevent="onContinue()">
        <main>
          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.business_name }"
            :label="$t('signup.vendor.businessName')"
            labelPlacement="stacked"
            fill="solid"
            v-model="businessStore.registration.name"
            required
            name="business_name"
            @ion-input="form.validate($event)"
          ></IonInput>

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.emailAddress }"
            :label="$t('signup.vendor.emailAddress')"
            labelPlacement="stacked"
            fill="solid"
            v-model="businessStore.registration.email"
            type="email"
            name="emailAddress"
            @ion-input="form.validate($event)"
          ></IonInput>

          <IonSelect
            class="kola-input ion-margin-bottom"
            :label="$t('signup.vendor.primaryCategory')"
            :class="{
              'ion-invalid ion-touched':
                form.errors.primary_product_category_id,
            }"
            labelPlacement="stacked"
            fill="solid"
            v-model="
              businessStore.registration.attributes.primary_product_category_id
            "
            required
            name="primary_product_category_id"
            @ion-change="form.validateSelectInput($event)"
          >
            <IonSelectOption
              v-for="category in productCategoryStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </IonSelectOption>
          </IonSelect>

          <IonSelect
            class="kola-input ion-margin-bottom"
            :label="$t('signup.vendor.country')"
            :class="{ 'ion-invalid ion-touched': form.errors.country_id }"
            labelPlacement="stacked"
            fill="solid"
            v-model="businessStore.registration.country_id"
            required
            name="country_id"
            @ion-change="form.validateSelectInput($event)"
          >
            <IonSelectOption
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </IonSelectOption>
          </IonSelect>

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{
              'ion-invalid ion-touched': form.errors.number_of_products,
            }"
            :label="$t('signup.vendor.noOfProductsYouSell')"
            labelPlacement="stacked"
            fill="solid"
            type="number"
            v-model="businessStore.registration.attributes.number_of_products"
            name="number_of_products"
            required
            @ion-input="form.validate($event)"
          ></IonInput>

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.number_of_stores }"
            :label="$t('signup.vendor.noOfStores')"
            labelPlacement="stacked"
            fill="solid"
            type="number"
            v-model="businessStore.registration.attributes.number_of_stores"
            name="number_of_stores"
            required
            @ion-input="form.validate($event)"
          ></IonInput>

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{
              'ion-invalid ion-touched': form.errors.how_you_heard_about_kola,
            }"
            :label="$t('signup.vendor.howDidYouHearAboutUs')"
            labelPlacement="stacked"
            fill="solid"
            v-model="
              businessStore.registration.attributes.how_you_heard_about_kola
            "
            required
            name="how_you_heard_about_kola"
            @ion-input="form.validate($event)"
          ></IonInput>
        </main>
      </form>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <FooterNavigation @continue="onContinue()"></FooterNavigation>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import FooterNavigation from "./FooterNavigation.vue";
import { mapStores } from "pinia";
import { useProductCategoryStore } from "@/stores/ProductCategoryStore";
import { useLocationStore } from "@/stores/LocationStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import Country from "@/models/Country";
import { useForm } from "@/composables/form";
import HeaderArea from "./HeaderArea.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonFooter,
    FooterNavigation,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    HeaderArea,
  },

  data() {
    return {
      countries: [] as Country[],
      form: useForm({}),
    };
  },

  computed: {
    ...mapStores(
      useProductCategoryStore,
      useLocationStore,
      useBusinessStore,
      useUserStore
    ),
  },

  methods: {
    fetchCategories() {
      this.productCategoryStore.fetchCategories();
    },

    async fetchCountries() {
      this.countries = await this.locationStore.fetchCountries();
    },

    onContinue() {
      if (this.form.hasErrors()) {
        return;
      }

      this.businessStore.cacheRegistrationInfo();
      if (this.userStore?.isInShoppingMode()) {
        this.$router.push("/profile/company/brand-info");
        return;
      }
      this.$router.push("/signup/vendor/brand-info");
    },
  },

  mounted() {
    this.businessStore.loadCachedRegistrationInfo();
    this.fetchCategories();
    this.fetchCountries();
  },
});
</script>
