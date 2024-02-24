<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/signup/vendor/location-info"
          ></IonBackButton>
        </IonButtons>
        <IonTitle></IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <HeaderArea
        :title="$t('signup.vendor.letsGetToKnowYourBusiness')"
        :subtext="$t('signup.vendor.helpUsUnderstandYourBusiness')"
      ></HeaderArea>

      <main>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.number_of_unique_products,
          }"
          :label="$t('signup.vendor.howManyUniqueProductsDoYouSell')"
          labelPlacement="stacked"
          fill="solid"
          v-model="
            businessStore.registration.attributes.number_of_unique_products
          "
          required
          name="number_of_unique_products"
          type="number"
          min="0"
          @ion-input="form.validate($event)"
        ></IonInput>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.catalog_update_frequency,
          }"
          :label="$t('signup.vendor.howOftenDoYouAddNewProductsToYourCatalog')"
          labelPlacement="stacked"
          fill="solid"
          v-model="
            businessStore.registration.attributes.catalog_update_frequency
          "
          required
          name="catalog_update_frequency"
          @ion-input="form.validate($event)"
        ></IonInput>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.number_of_small_retailers,
          }"
          :label="$t('signup.vendor.howManySmallRetailersSellYourProducts')"
          labelPlacement="stacked"
          fill="solid"
          v-model="
            businessStore.registration.attributes.number_of_small_retailers
          "
          required
          name="number_of_small_retailers"
          type="number"
          min="0"
          @ion-input="form.validate($event)"
        ></IonInput>

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('signup.vendor.isYourBrandInAnyLargeRetailChains')"
          :class="{
            'ion-invalid ion-touched':
              form.errors.brand_is_in_large_retail_chain,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="
            businessStore.registration.attributes.brand_is_in_large_retail_chain
          "
          required
          name="brand_is_in_large_retail_chain"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption :value="$t('general.no')">{{
            $t("general.no")
          }}</IonSelectOption>
          <IonSelectOption :value="$t('general.yes')">{{
            $t("general.yes")
          }}</IonSelectOption>
        </IonSelect>
      </main>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <FooterNavigation @continue="onContinue()"></FooterNavigation>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
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
import HeaderArea from "./HeaderArea.vue";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useForm } from "@/composables/form";
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
    HeaderArea,
    IonInput,
    IonSelect,
    IonSelectOption,
  },

  data() {
    return {
      form: useForm({}),
    };
  },

  computed: {
    ...mapStores(useBusinessStore, useUserStore),
  },

  mounted() {
    this.businessStore.loadCachedRegistrationInfo();
  },

  methods: {
    onContinue() {
      if (this.form.hasErrors()) {
        return;
      }

      this.businessStore.cacheRegistrationInfo();
      if (this.userStore?.isInShoppingMode()) {
        this.$router.push("/profile/company/upload-photo");
        return;
      }
      this.$router.push("/signup/vendor/upload-photo");
    },
  },
});
</script>
