<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/profile/company/sale-agents"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("profile.agent.agentRequest") }}
          </IonTitle>
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
                :image="request?.sale_agent?.photo"
                :username="request?.sale_agent?.name"
                size="s"
              ></ProfileAvatar>
              <IonText>
                <IonLabel
                  class="font-medium ion-align-self-start"
                  style="color: #787486"
                >
                  Request made by
                  <span class="fw-semibold">{{
                    request?.sale_agent?.name
                  }}</span>
                  on {{ Filters.date(request?.created_at as string, "short") }}
                </IonLabel>
              </IonText>
            </IonItem>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel slot="start" class="fw-normal font-medium">
              {{ $t("general.totalCost") }}</IonLabel
            >
            <IonLabel slot="end" class="fw-semibold font-medium">{{
              Filters.currency((request?.total_sales_price as number) || 0)
            }}</IonLabel>
          </IonItem>
        </IonCard>
        <RecycleScroller
          class="scroller"
          :items="request?.agent_request_items"
          :grid-items="2"
          :item-size="210"
          :item-secondary-size="cardWidth"
          :item-class="'product-card-item'"
          key-field="id"
          v-slot="{ item }"
        >
          <ProductCard
            :product="item.product"
            :showDescription="false"
            :showAddToCart="false"
            :showAddToFavorites="false"
            :showAddToSelected="false"
            :action="'toggleSelect'"
          ></ProductCard>
        </RecycleScroller>
      </section>
      <ConfirmModal
        :isOpen="showConfirm"
        description="Are you sure you want to approve this request?"
        @confirm="doConfirmApproval()"
        @dismiss="showConfirm = false"
      ></ConfirmModal>
    </ion-content>
    <ion-footer class="ion-no-border ion-padding">
      <KolaYellowButton @click="confirmApproval()">Approve</KolaYellowButton>
      <KolaWhiteButton @click="doConfirmDecline()">Decline</KolaWhiteButton>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
import {
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
  IonCard,
  IonCardHeader,
  IonFooter,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useRequestStore } from "@/stores/RequestStore";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import { RecycleScroller } from "vue-virtual-scroller";
import Filters from "@/utilities/Filters";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import AgentRequest from "@/models/AgentRequest";

export default defineComponent({
  data() {
    return {
      loading: false,
      request: null as AgentRequest | null,
      showConfirm: false,
      Filters,
    };
  },
  components: {
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    ProductCard,
    ProfileAvatar,
    RecycleScroller,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    ConfirmModal,
  },

  computed: {
    ...mapStores(useRequestStore, useUserStore, useToastStore),
    cardWidth() {
      return window.document.documentElement.clientWidth / 2;
    },
  },

  methods: {
    async fetchAgentRequest() {
      try {
        this.loading = true;
        const request_id = +this.$route.params.id;

        const request = await this.requestStore.fetchAgentRequest(request_id);
        if (request) {
          this.request = request;
        }
        console.log(this.request);
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.loading = false;
      }
    },
    confirmApproval() {
      this.showConfirm = true;
    },
    async doConfirmApproval() {
      this.showConfirm = false;
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.approveRequest(request_id);
      if (response !== null) {
        this.$router.replace("profile/company/sale-agents");
      }
    },
    async doConfirmDecline() {
      this.showConfirm = false;
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.declineRequest(request_id);
      if (response !== null) {
        this.$router.replace("profile/company/sale-agents");
      }
    },
  },
  ionViewDidEnter() {
    this.fetchAgentRequest();
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
