<template>
  <ion-page>
    <section class="ion-padding">
      <EditAddressHeader />
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
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
        <IonIcon class="success" :icon="addCircleOutline"></IonIcon>
        <IonText class="new-bussiness" color="medium"> Add New Address </IonText>
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
import { useRouter } from "vue-router";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import EditAddressHeader from "@/components/header/EditAddressHeader.vue";

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
    EditAddressHeader
    
  },

  computed: {
    ...mapStores(useUserStore),
  },

  data() {
    const router = useRouter();

    return {
      createOutline,
      powerOutline,
      search,
      router,
      settingsOutline,
      addCircleOutline,
    };
  },

  methods: {},
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
