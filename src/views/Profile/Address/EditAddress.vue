<template>
  <ion-page>
    <section class="ion-padding">
      <EditAddressHeader />
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <form>
      <IonItem
        lines="none"
        class="profile-item ion-margin-top d-flex flex-column ion-align-items-start"
        router-link="/profile/personal/edit-profile"
      >
        <div class="d-flex flex-column">
          <IonLabel>{{ userStore.user?.name }}</IonLabel>
          <IonText class="success">Accra, Osu</IonText>
        </div>
      </IonItem>

      <IonItem lines="none">
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
    </IonItem>

    <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.address.region')"
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

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.address.city')"
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
        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createCustomer"
            >{{ $t("profile.address.cancel") }}</KolaYellowButton
          >
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createCustomer"
            >{{ $t("profile.customers.save") }}</KolaYellowButton
          >
        </IonFooter>
  </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonText,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonFooter,
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import {
  search,
  createOutline,
  powerOutline,
  settingsOutline,
  addCircleOutline,
  navigateOutline,
  chevronDownOutline
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import EditAddressHeader from "@/components/header/EditAddressHeader.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useCartStore } from "@/stores/CartStore";
import { useForm } from "@/composables/form";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

export default defineComponent({
  components: {
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    ProfileAvatar,
    IonText,
    IonPage,
    EditAddressHeader,
    IonSelectOption,
    IonSelect,
    IonFooter,
    IonButton,
    KolaYellowButton,
  },
  setup() {
  },

  computed: {
    ...mapStores(useUserStore),
  },

  data() {
    const router = useRouter();
  

  // Define the 'form' property
  const form = {
    fields: {
      region_id: "",
      city_id: "" 
    },
    errors: {}, // Add any error properties if needed
    validate: () => {
      // Add validation logic here if needed
    },
  };

    return {
    createOutline,
    powerOutline,
    search,
    router,
    settingsOutline,
    addCircleOutline,
    navigateOutline,
    form,
    };
  },

  methods: {
    
  },

  setup() {
    const userStore = useUserStore();
    const toastStore = useToastStore();
    const { getCurrentLocation } = useGeolocation();

    const getLocation = async () => {
      try {
        const coordinates = await getCurrentLocation();

        if (coordinates) {
          // Assuming 'form' is defined somewhere, update it accordingly
          // form.fields.delivery_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
        }
      } catch (error) {
        toastStore.showError("Cannot retrieve location info");
        console.log(error);
      }
    };

    return { userStore, getLocation };
  },
});

</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}
.success {
  margin-right: 8px;
}

.new-bussiness {
  color: #666eed;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
