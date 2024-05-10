<template>
  <ion-page>
    <section class="ion-padding">
      <AddressHeader />
    </section>
    <IonContent class="ion-padding-horizontal">
      <IonButton
        fill="clear"
        style="text-transform: none"
        class="ion-text-start add-new-item"
        router-link="/profile/address/add-address"
      >
        <IonIcon :icon="addCircleOutline"></IonIcon>
        Add new address
      </IonButton>
      <section
        v-if="fetching"
        class="ion-text-center d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <section v-else>
        <IonItem
          v-for="address in businessLocations"
          :key="address.id"
          lines="none"
          :button="true"
          class="profile-item d-flex flex-column ion-align-items-start"
          :router-link="`/profile/address/business/${address?.business_id}/location/${address?.id}/edit-address`"
        >
          <IonLabel>
            <h6>{{ address?.business?.name }}</h6>
            <p>{{ address?.address }}</p>
            <p>{{ address?.city }}</p>
          </IonLabel>
          <IonIcon slot="end" :icon="createOutline"></IonIcon>
        </IonItem>
      </section>
    </IonContent>
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
  IonButton,
  IonContent,
  IonSpinner,
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
} from "ionicons/icons";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import AddressHeader from "@/components/header/AddressHeader.vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import Address from "@/models/Address";
import { handleAxiosRequestError } from "@/utilities";

export default defineComponent({
  components: {
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    ProfileAvatar,
    IonText,
    IonButton,
    IonPage,
    AddressHeader,
    IonContent,
    IonSpinner,
  },

  computed: {
    ...mapStores(useUserStore, useBusinessStore),
  },

  data() {
    return {
      createOutline,
      powerOutline,
      search,
      settingsOutline,
      addCircleOutline,
      businessLocations: [] as Address[] | null,
      fetching: false,
    };
  },

  methods: {
    async getBusinessLocations() {
      try {
        this.fetching = true;
        this.businessLocations = await this.businessStore.getBusinessLocations(
          Number(this.userStore.activeBusiness?.id)
        );
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },
  },
  mounted() {
    this.getBusinessLocations();
  },
});
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

ion-item {
  box-shadow: 0px 4px 12px 0px #696f821a;

  ion-label {
    p {
      font-size: 12px;
    }
  }

  ion-icon {
    color: #003366;
  }
}
.add-new-item {
  --color: #666eed;

  ion-icon {
    color: #667085;
    margin-right: 5px;
    font-size: 20px;
  }
}
</style>
