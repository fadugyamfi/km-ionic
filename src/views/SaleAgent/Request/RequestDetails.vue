<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/agent/request"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("profile.agent.agentRequest") }}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton v-if="false">
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content>
      <section
        v-if="loading"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <section v-else>
        <IonCard>
          <IonCardHeader class="ion-no-padding d-flex">
            <IonItem lines="none">
              <ProfileAvatar
                slot="start"
                class="ion-align-self-start ion-margin-top"
                :image="agentRequest?.sale_agent?.photo"
                :username="agentRequest?.sale_agent?.name"
                size="s"
              ></ProfileAvatar>
              <IonText>
                <IonLabel
                  class="font-medium ion-align-self-start"
                  style="color: #787486"
                >
                  Request made by Angel Bator
                </IonLabel>
                <IonLabel class="font-medium ion-align-self-start">
                  on 23/08/2023
                  <!-- on 23/08/2023 {{ Filters.date(request?.created_at, "short") }} -->
                </IonLabel>
              </IonText>
            </IonItem>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel slot="start" class="fw-bold">
              {{ $t("general.totalCost") }}</IonLabel
            >
            <IonLabel slot="end" class="fw-bold">GHS 3600.00</IonLabel>
          </IonItem>
        </IonCard>
        <IonCard w="25">
          <IonItem>
            <Image
              :src="agentRequest?.sale_agent?.photo"
              style="height: 150px"
              w="150"
            ></Image>
          </IonItem>
          <Ion-card-header>
            <ion-card-title
              size="small"
              class="product-title fw-semibold line-clamp"
              >Frytol cooking oil
            </ion-card-title>
          </Ion-card-header>
          <ion-card-content>
            GHS 3000.00 <span style="color: #787486"> 300 ml</span>

            <p>25<span style="color: #787486">kg/24pcs</span></p>
          </ion-card-content>
        </IonCard>
      </section>
    </ion-content>
    <footer class="ion-padding">
      <KolaYellowButton> {{ $t("profile.agent.approve") }} </KolaYellowButton>
      <KolaWhiteButton> {{ $t("profile.agent.decline") }}</KolaWhiteButton>
    </footer>
  </IonPage>
</template>

<script lang="ts">
import {
  IonIcon,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonSpinner,
  IonText,
  IonLabel,
  IonItem,
  IonCardContent,
} from "@ionic/vue";
import {
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useRequestStore } from "@/stores/RequestStore";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { useUserStore } from "@/stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Image from "@/components/Image.vue";

import Filters from "@/utilities/Filters";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonContent,
    IonButton,
    IonLabel,
    IonSpinner,
    KolaYellowButton,
    KolaWhiteButton,
    IonText,
    ConfirmModal,
    ProfileAvatar,
    IonItem,
    IonCardContent,
    Image,
  },

  name: "OrderDetails",

  data() {
    return {
      loading: false,
      approving: false,
      cancelling: false,
      showConfirm: false,
      confirmAction: "",
      confirmDescription: "",
      chatbubbleOutline,
      agentRequest: null as Request | null,
    };
  },

  computed: {
    ...mapStores(useRequestStore, useUserStore, useToastStore),
  },

  methods: {
    async fetchSingleAgentRequest() {
      try {
        this.loading = true;
        const request_id = +this.$route.params.id;

        this.agentRequest = await this.requestStore.fetchAgentRequests(
          request_id
        );
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

.update-button-section {
  margin-top: 2em;
  margin-bottom: 3em;
}
</style>
