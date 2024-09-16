<template>
  <IonList lines="none" class="ion-padding-horizontal teams-select-list simple">
    <TeamMemberItem
      v-for="(member, index) in teamMembers"
      :key="member?.id"
      :member="member"
      @openMenu="openMenu($event, index)"
    >
      >
      <template v-slot:popover>
        <IonPopover
          :event="event"
          :isOpen="openPopover == index"
          @didDismiss="openPopover = -1"
          dismiss-on-select
        >
          <IonContent :scroll-y="false">
            <IonList class="pop-over-content">
              <IonItem
                lines="full"
                :button="true"
                :detail="false"
                :router-link="`/profile/company/team/${member?.id}/role-and-permission`"
              >
                <IonIcon :icon="createOutline"></IonIcon>
                {{ $t("profile.team.editRoleAndPermissions") }}
              </IonItem>
              <IonItem
                @click="removeMember(member)"
                lines="none"
                :button="true"
                :detail="false"
              >
                <IonIcon :icon="trashOutline"></IonIcon>
                {{ $t("profile.team.removeMember") }}</IonItem
              >
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </TeamMemberItem>
  </IonList>
  <DeleteTeamMemberModal
    :isOpen="showConfirmRemoveModal"
    @dismiss="showConfirmRemoveModal = false"
    @confirm="onConfirmDelete()"
  />
</template>
<script lang="ts" setup>
import {
  IonList,
  IonText,
  IonItem,
  IonChip,
  IonIcon,
  IonContent,
  IonPopover,
} from "@ionic/vue";
import { createOutline, trashOutline } from "ionicons/icons";
import { PropType, ref } from "vue";
import { useToastStore } from "@/stores/ToastStore";
import TeamMemberItem from "@/components/modules/team/TeamMemberItem.vue";
import DeleteTeamMemberModal from "./DeleteTeamMemberModal.vue";
import { useTeamStore } from "@/stores/TeamStore";
import Agent from "@/models/Agent";

const props = defineProps({
  teamMembers: {
    type: Array as PropType<Agent[]>,
    default: () => [],
  },
});

const toastStore = useToastStore();
const teamStore = useTeamStore();

const selectedMember = ref();
const showConfirmRemoveModal = ref(false);
const event = ref<any>(null);
const openPopover = ref(-1);

const openMenu = (e: Event, index = -1) => {
  event.value = e;
  openPopover.value = index;
};

const removeMember = (member: Agent) => {
  selectedMember.value = member;
  showConfirmRemoveModal.value = true;
};

const onConfirmDelete = async () => {
  try {
    showConfirmRemoveModal.value = false;
    await teamStore.removeTeamMember(selectedMember.value.id);
    toastStore.showSuccess("User and business association removed", "", "bottom");
  } catch (error) {
    toastStore.showError(
      "Failed to remove user and business association. Please try again",
      "",
      "bottom",
      "footer"
    );
  }
};
</script>

<style lang="scss" scoped>
.teams-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    border: solid 1px #f4f4f4;
    border-radius: 12px;
    margin-bottom: 0.5em;
    box-shadow: none;
    --background: none;
  }
}
ion-icon {
  margin-right: 10px;
}
.pop-over-content {
  ion-item {
    font-size: 14px;
  }
}
</style>
