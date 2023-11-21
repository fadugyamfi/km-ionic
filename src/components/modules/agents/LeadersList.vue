<template>
  <IonList
    lines="none"
    class="ion-padding-horizontal agents-select-list simple"
  >
    <IonItem v-for="(agent, index) in topPerfomingAgents" :key="index">
      <Star :position="index + 4" />
      <ProfileAvatar
        :image="agent?.photo"
        :username="agent?.name"
        customSize="40px"
      ></ProfileAvatar>
      <IonLabel>
        <p class="ion-no-margin">{{ agent.name }}</p>
      </IonLabel>

      <IonLabel slot="end">
        <p class="ion-no-margin" style="color: #036">
          {{ Filters.currency(agent.total_sales_value || 0) }}
        </p>
      </IonLabel>
    </IonItem>
  </IonList>
</template>
<script lang="ts" setup>
import {
  IonList,
  IonAvatar,
  IonText,
  IonItem,
  IonChip,
  IonIcon,
  IonContent,
  IonPopover,
  IonLabel,
  IonButton,
  IonImg,
} from "@ionic/vue";
import {
  ellipsisHorizontal,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { useAgentsStore } from "@/stores/AgentsStore";
import { getDateFromNow } from "@/utilities";
import ProfileAvatar from "../../ProfileAvatar.vue";
import Star from "./Star.vue";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import Filters from "@/utilities/Filters";

const props = defineProps({
  topPerfomingAgents: {
    type: Array as PropType<TopPerformingAgent[]>,
    default: () => [],
  },
});
const agentsStore = useAgentsStore();
</script>

<style lang="scss" scoped>
.agents-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    --background: #ffffff;
    border: solid 1px #f4f4f4;
    border-radius: 12px;
    margin-bottom: 0.5em;
    box-shadow: 0px 4px 12px 0px #696f821a;
  }
  ion-item ion-chip {
    --background: #eaecf5;
    --color: #304296;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
  }

  ion-item ion-label p {
    font-weight: 400;
    color: #111;
  }

  &.simple {
    ion-item {
      border: solid 1px #f4f4f4;
      border-radius: 12px;
      margin-bottom: 0.5em;
      box-shadow: none;
      --background: none;
    }
  }
}
ion-popover {
  --width: 220px;
}

ion-icon {
  margin-right: 10px;
}
</style>
