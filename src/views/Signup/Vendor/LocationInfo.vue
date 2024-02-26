<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/signup/vendor/brand-info"
          ></IonBackButton>
        </IonButtons>
        <IonTitle></IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <HeaderArea
        :title="$t('signup.vendor.yourLocation')"
        :subtext="$t('signup.vendor.summary.weWantToGetToKnowYourBusiness')"
      ></HeaderArea>

      <main>
        <IonInput
          class="kola-input"
          :class="{ 'ion-invalid ion-touched': form.errors.location }"
          :label="$t('signup.vendor.businessHeadquarters')"
          labelPlacement="stacked"
          fill="solid"
          name="location"
          v-model="businessStore.registration.location"
          @ionChange="form.validate($event)"
          @ionBlur="form.validate($event)"
          required
        ></IonInput>

        <IonButton
          fill="clear"
          color="primary"
          style="text-transform: none"
          class="ion-margin-bottom"
          @click="getCurrentLocation()"
        >
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
          <IonSpinner
            class="spinner"
            name="crescent"
            v-if="userStore.locationLoading"
          ></IonSpinner>
        </IonButton>

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('signup.vendor.region')"
          :class="{ 'ion-invalid ion-touched': form.errors.region_id }"
          labelPlacement="stacked"
          fill="solid"
          v-model="businessStore.registration.region_id"
          required
          name="region_id"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.name }}
          </IonSelectOption>
        </IonSelect>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.city }"
          :label="$t('signup.vendor.city')"
          labelPlacement="stacked"
          fill="solid"
          name="city"
          v-model="businessStore.registration.city"
          @ionBlur="form.validate($event)"
          @ionChange="form.validate($event)"
          required
        ></IonInput>

        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.tax_number }"
          :label="$t('signup.vendor.tinNumber')"
          labelPlacement="stacked"
          fill="solid"
          name="tax_number"
          v-model="businessStore.registration.tax_number"
          @ionBlur="form.validate($event)"
          @ionChange="form.validate($event)"
          required
        ></IonInput>
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
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import FooterNavigation from "./FooterNavigation.vue";
import { useForm } from "@/composables/form";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
import { location, navigateOutline } from "ionicons/icons";
import Region from "@/models/Region";
import { useLocationStore } from "@/stores/LocationStore";
import { useToastStore } from "@/stores/ToastStore";
import HeaderArea from "./HeaderArea.vue";
import { useGeolocation } from "@/composables/useGeolocation";
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
    IonLabel,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonButton,
    HeaderArea,
    IonSpinner,
  },

  data() {
    return {
      // icons
      location,
      navigateOutline,

      regions: [] as Region[],
      form: useForm({}),
    };
  },

  computed: {
    ...mapStores(useBusinessStore, useLocationStore, useUserStore),
  },

  methods: {
    async loadRegions() {
      this.regions = await this.locationStore.fetchRegions(
        this.businessStore.registration.country_id
      );
    },

    async getCurrentLocation() {
      const toastStore = useToastStore();
      const { getCurrentLocation, getDisplayName } = useGeolocation();

      try {
        const coordinates = await getCurrentLocation();
        const displayName = await getDisplayName(coordinates);

        if (displayName) {
          this.businessStore.registration.location = displayName;
          this.businessStore.registration.gps = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
        } else {
          this.businessStore.registration.location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
          this.businessStore.registration.gps = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
        }
      } catch (error) {
        toastStore.showError("Cannot retrieve location info");
        console.log(error);
      }
    },

    onContinue() {
      if (this.form.hasErrors()) {
        return;
      }

      this.businessStore.cacheRegistrationInfo();
      if (this.userStore.appMode !== "guest") {
        this.$router.push("/profile/company/stock-info");
        return;
      }
      this.$router.push("/signup/vendor/stock-info");
    },
  },

  mounted() {
    this.loadRegions();
    this.businessStore.loadCachedRegistrationInfo();
  },
});
</script>
<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
