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
              >{{ request?.agent_request_items_count }}
              {{ $t("profile.agent.items") }}
            </IonLabel>

            <IonChip
              v-if="request?.approved_by"
              color="success"
              class="font-medium"
            >
              {{ $t("profile.agent.approved") }}

            </IonChip>
            <IonChip
              v-if="!request?.approved_by"
              color="danger"
              class="font-medium"
            >
              {{ $t("profile.agent.unapproved") }}

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
