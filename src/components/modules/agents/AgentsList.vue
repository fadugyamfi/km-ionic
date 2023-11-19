<template>
  <IonList
    lines="none"
    class="ion-padding-horizontal agents-select-list simple"
  >
    <IonItem v-for="agent in agents" :key="agent.id">
      <ProfileAvatar
        :image="agent?.photo"
        :username="agent?.name"
        customSize="40px"
      ></ProfileAvatar>
      <IonLabel
        @click="
          $router.push(`/profile/company/sale-agents/${agent.id}/sale-report`)
        "
      >
        <p class="ion-no-margin">{{ agent.name }}</p>
        <IonText color="medium" class="font-medium">
          {{ agent.role?.name }}
        </IonText>
      </IonLabel>

      <IonButton :id="`popover-button-${agent.id}`" fill="clear" color="dark">
        <ion-icon color="medium" :icon="ellipsisHorizontal"></ion-icon>
      </IonButton>
      <IonPopover
        :trigger="`popover-button-${agent.id}`"
        :dismiss-on-select="true"
      >
        <IonContent :scroll-y="false">
          <IonList>
            <!-- <IonItem
              @click="updateAgent(agent)"
              lines="full"
              :button="true"
              :detail="false"
            >
              <IonIcon :icon="createOutline"></IonIcon>
              Udpate Agent
             
            </IonItem> -->
            <IonItem
              lines="none"
              :button="true"
              :detail="false"
              @click="deleteAgent(agent)"
            >
              <IonIcon :icon="trashOutline"></IonIcon>
              Delete Agent
              <!-- {{ $t("profile.agents.removeCustomer") }} -->
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </IonItem>
  </IonList>
  <DeleteModal
    :isOpen="showConfirmDeleteModal"
    :agent="selectedAgent"
    @dismiss="showConfirmDeleteModal = false"
    title="Are you sure you want to remove this agent?"
    description="This action cannot be undone"
    @confirm="onConfirmDelete()"
  />
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
import { useToastStore } from "@/stores/ToastStore";
import ProfileAvatar from "../../ProfileAvatar.vue";
import User from "@/models/User";

const toastStore = useToastStore();

const props = defineProps({
  agents: {
    type: Object as PropType<User[]>,
    default: () => [],
  },
});

const router = useRouter();
const agentsStore = useAgentsStore();

const selectedAgent = ref<User>();
const showConfirmDeleteModal = ref(false);

const deleteAgent = (agent: User) => {
  selectedAgent.value = agent;
  showConfirmDeleteModal.value = true;
};
const onConfirmDelete = async () => {
  try {
    showConfirmDeleteModal.value = false;
    await agentsStore.deleteAgent(selectedAgent.value as User);
    toastStore.showSuccess("Agent has been removed successfully", "", "bottom");
  } catch (error) {
    toastStore.showError(
      "Failed to remove Agent. Please try again",
      "",
      "bottom",
      "footer"
    );
  }
};

const updateAgent = (agent: User) => {
  //   router.push(`/profile/company/customers/${agent.id}/update-customer`);
};
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
