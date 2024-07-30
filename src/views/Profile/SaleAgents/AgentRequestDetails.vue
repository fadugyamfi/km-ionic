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
          :item-size="240"
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
      <!-- <ConfirmModal
        :isOpen="showConfirm"
        :description="confirmDescription"
        @confirm="doConfirm()"
        @dismiss="showConfirm = false"
      ></ConfirmModal> -->
      <StatusUpdateSheet
        :isOpen="showConfirm"
        :request="request"
        :title="title"
        @didDismiss="showConfirm = false"
        @confirm="doConfirm"
      >
      </StatusUpdateSheet>
    </ion-content>
    <ion-footer class="ion-no-border ion-padding">
      <section
        class="ion-text-center ion-margin-bottom"
        v-if="statusId !== RequestStatus.PLACED && !loading"
      >
        <IonChip :color="statusColor" class="font-medium">
          {{ statusName }}
          {{
            statusId == RequestStatus.APPROVED
              ? `on ${Filters.date(request?.approved_at as string, "short")}`
              : ""
          }}
        </IonChip>
      </section>
      <section v-if="canApprove && !loading">
        <KolaYellowButton
          :disabled="requestStore?.declining"
          @click="confirmApproval()"
        >
          <IonSpinner
            v-if="requestStore?.approving"
            name="crescent"
          ></IonSpinner>
          <IonText v-else>{{ "Approve" }}</IonText></KolaYellowButton
        >
        <KolaWhiteButton
          :disabled="requestStore?.approving"
          @click="confirmDecline()"
        >
          <IonSpinner
            v-if="requestStore?.declining"
            name="crescent"
          ></IonSpinner>
          <IonText v-else>{{ "Decline" }}</IonText></KolaWhiteButton
        >
      </section>
      <KolaYellowButton
        v-if="statusId == RequestStatus.APPROVED"
        @click="confirmSetDelivered()"
      >
        <IonSpinner
          v-if="requestStore?.settingAsDelivered"
          name="crescent"
        ></IonSpinner>
        <IonText v-else>{{ "Set as delivered" }}</IonText></KolaYellowButton
      >
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
  IonChip,
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
import { formatMySQLDateTime } from "@/utilities";
import StatusUpdateSheet from "@/components/modules/agents/StatusUpdateSheet.vue";
import { RequestStatus } from "@/stores/AgentsStore";

export default defineComponent({
  data() {
    return {
      loading: true,
      request: null as AgentRequest | null,
      showConfirm: false,
      confirmAction: "",
      title: "",
      Filters,
      RequestStatus,
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
    IonChip,
    StatusUpdateSheet,
  },

  computed: {
    ...mapStores(useRequestStore, useUserStore, useToastStore),
    cardWidth() {
      return window.document.documentElement.clientWidth / 2;
    },
    statusId() {
      return this.request?.agent_request_status?.id;
    },

    canApprove() {
      return this.statusId == RequestStatus.PLACED;
    },

    statusColor() {
      return this.statusId == RequestStatus.APPROVED
        ? "success"
        : this.statusId == RequestStatus.DELIVERED
        ? "tertiary"
        : this.statusId == RequestStatus.REJECTED
        ? "danger"
        : "meduim";
    },
    statusName() {
      return this.request?.agent_request_status?.name;
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
    confirmDecline() {
      this.title = "Reject Request";
      this.confirmAction = "decline";
      this.showConfirm = true;
    },
    confirmApproval() {
      this.title = "Approve Request";
      this.confirmAction = "approve";
      this.showConfirm = true;
    },
    confirmSetDelivered() {
      this.title = "Set Request As Delivered";
      this.confirmAction = "confirm";
      this.showConfirm = true;
    },

    doConfirm(form: any) {
      this.showConfirm = false;
      if (this.confirmAction == "approve") {
        this.approve(form);
      } else if (this.confirmAction == "decline") {
        this.doConfirmDecline(form);
      } else {
        this.doConfirmDelivered(form);
      }
    },
    async approve(form: any) {
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.approveRequest(request_id, {
        approved_by: this.userStore.user?.id || "",
        approved_at: formatMySQLDateTime(new Date().toISOString()),
        est_delivery_at: form.est_delivery_at,
        comment: form.comment,
      });
      if (response) {
        this.$router.replace("/profile/company/sale-agents");
      }
    },

    async doConfirmDecline(form: any) {
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.declineRequest(request_id, {
        comment: form.comment,
      });
      if (response) {
        this.$router.replace("/profile/company/sale-agents");
      }
    },
    async doConfirmDelivered(form: any) {
      const request_id = +this.$route.params.id;
      const response = await this.requestStore.setDelivered(request_id, {
        approved_by: this.userStore.user?.id || "",
        approved_at: formatMySQLDateTime(new Date().toISOString()),
        status: 2,
        comment: form.comment,
        actual_delivery_at: form.actual_delivery_at,
      });
      if (response) {
        this.$router.replace("/profile/company/sale-agents");
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
