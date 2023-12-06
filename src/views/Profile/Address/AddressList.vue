<template>
  <ion-page>
    <section class="ion-padding">
      <AddressHeader />
    </section>
    <IonContent class="ion-padding-horizontal">
      <IonItem v-for="address in businessLocations" :key="address.id" lines="none"
               class="profile-item ion-margin-top d-flex flex-column ion-align-items-start"
               :router-link="`/profile/address/business/${address.business_id}/location/${address.id}/edit-address`">
        <!-- {{ address }} -->
        <div class="d-flex flex-column">
          <IonLabel>{{ address?.business?.name }}</IonLabel>
          <IonText class="success">{{ address?.address }}</IonText>
          <IonText class="success">{{ address?.city }}</IonText>
        </div>
        <IonIcon slot="end" :icon="createOutline"></IonIcon>
      </IonItem>

      <IonItem lines="none" router-link="/profile/address/add-address">
        <IonIcon class="success" :icon="addCircleOutline"></IonIcon>
        <IonText class="new-bussiness" color="medium">
          Add New Address
        </IonText>
      </IonItem>
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
IonContent,
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
    AddressHeader,
    IonContent
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
    };
  },

  methods: {
    async getBusinessLocations() {
      this.businessLocations = await this.businessStore.getBusinessLocations(
        Number(this.userStore.activeBusiness?.id)
      );
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
