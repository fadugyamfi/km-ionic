<template>
  <section>
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
          <IonLabel>
            <IonText class="font-medium ion-align-self-start">{{
              request?.sale_agent?.name
            }}</IonText>
            <IonLabel class="font-medium ion-align-self-end"
              >{{
                request?.agent_request_items_count ||
                request.agent_request_items?.length
              }}
              {{ $t("profile.agent.items") }}
            </IonLabel>

            <IonChip :color="statusColor" class="font-medium">
              {{ statusName }}
            </IonChip>
          </IonLabel>
          <IonText slot="end" class="font-medium">{{
            Filters.date(request?.created_at, "short")
          }}</IonText>
        </IonItem>
      </IonCardHeader>
    </IonCard>
  </section>
</template>

<script lang="ts">
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonText,
  IonButton,
  IonChip,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import { RequestStatus } from "@/stores/AgentsStore";

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    Image,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonText,
    IonButton,
    ProfileAvatar,
    IonChip,
  },

  props: {
    request: {
      type: Object as PropType<any>,
    },
  },
  computed: {
    statusId() {
      return this.request?.agent_request_status?.id;
    },
    statusColor() {
      return this.statusId == RequestStatus.PLACED
        ? "secondary"
        : this.statusId == RequestStatus.APPROVED
        ? "success"
        : this.statusId == RequestStatus.DELIVERED
        ? "tertiary"
        : this.statusId == RequestStatus.REJECTED
        ? "danger"
        : 'medium'
    },
    statusName() {
      return this.request?.agent_request_status?.name;
    },
  },

  data() {
    return {
      Filters,
    };
  },
});
</script>

<style scoped lang="scss">
ion-thumbnail {
  --size: 32px;
}

.product-list ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
ion-chip {
  margin: 5px 0px 0px 0px;
  font-size: 12px !important;
}
</style>
