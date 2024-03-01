<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/agent/request"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("profile.agent.requestDetails") }}
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
                  {{ $t("profile.agent.requestMadeBy") }}

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
              Filters.currency((request?.total_price as number) || 0)
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
        description="Are you sure you want to cancel this request?"
        @confirm="doConfirm()"
        @dismiss="showConfirm = false"
      ></ConfirmModal>
    </ion-content>
    <ion-footer class="ion-no-border ion-padding">
      <section class="ion-text-center" v-if="request?.approved_by">
        <IonChip color="success" class="font-medium">
          {{
            `Approved on ${Filters.date(
              request?.approved_at as string,
              "short"
            )}`
          }}
        </IonChip>
      </section>
      <KolaYellowButton
        @click="confirmCancel()"
        v-if="!canCancel(request) && !loading"
      >
        <IonSpinner v-if="requestStore?.cancelling" name="crescent"></IonSpinner
        ><IonText>{{ $t("profile.agent.cancelRequest") }}</IonText>
      </KolaYellowButton>
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
  IonChip,
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
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import AgentRequest from "@/models/AgentRequest";

export default defineComponent({
  data() {
    return {
      loading: true,
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
    ConfirmModal,
    IonChip,
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
    confirmCancel() {
      this.showConfirm = true;
    },
    async doConfirm() {
      this.showConfirm = false;
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.cancelRequest(request_id);
      if (response !== null) {
        this.$router.replace("/agent/request");
      }
    },
    canCancel(request: AgentRequest | null) {
      return request?.approved_by;
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
