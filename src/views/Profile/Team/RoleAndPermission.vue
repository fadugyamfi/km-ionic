<template>
  <IonPage>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/profile/company/team"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("profile.team.rolesAndPermissions") }}
          </IonTitle>
          <ion-buttons slot="end">
            <IonButton disabled></IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent class="ion-padding-horizontal">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-show="!fetching">
        <IonCard class="team-member-detail-card">
          <IonCardContent>
            <IonItem lines="none">
              <ProfileAvatar
                :image="member?.photo"
                :username="member?.name"
                customSize="48px"
                slot="start"
              />
              <IonLabel class="ion-no-margin">
                <h4>{{ member?.name }}</h4>
                <p color="medium">{{ member?.email }}</p>
                <IonChip>{{ role?.name }}</IonChip>
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                color="dark"
                @click="editDetails"
              >
                <IonIcon
                  :icon="createOutline"
                  style="font-size: 20px"
                ></IonIcon>
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <TeamMemberRoles
          :role="role"
          :roles="roles"
          @onAssignRole="getMember(true)"
        ></TeamMemberRoles>
        <TeamMemberPermissions
          :groupedPermissions="groupedPermissions"
        ></TeamMemberPermissions>

        <TeamMemberDetailsSheet
          :member="member"
          :isOpen="showTeamMemberDetailSheet"
          @didDismiss="showTeamMemberDetailSheet = false"
          @update="getMember(true)"
        />
      </section>
    </IonContent>
  </IonPage>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/vue";
import { arrowBackOutline, createOutline } from "ionicons/icons";
import { computed, onMounted, ref } from "vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import TeamMemberRoles from "@/components/modules/team/TeamMemberRoles.vue";
import TeamMemberPermissions from "@/components/modules/team/TeamMemberPermissions.vue";
import TeamMemberDetailsSheet from "@/components/modules/team/TeamMemberDetailsSheet.vue";
import { useRoleAndPermissionStore } from "@/stores/RoleAndPermissionStore";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import Business from "@/models/Business";
import { useTeamStore } from "@/stores/TeamStore";
import Agent from "@/models/Agent";
import Role from "@/models/Role";
import { GroupedPermission } from "@/models/Permission";

const route = useRoute();

const roleAndPermissionStore = useRoleAndPermissionStore();
const teamStore = useTeamStore();
const userStore = useUserStore();

const fetching = ref(true);
const showTeamMemberDetailSheet = ref(false);

const member = ref<Agent | null>();

const role = computed(() => member.value?.teams[0]?.role as Role);
const roles = computed(() => roleAndPermissionStore.roles as Role[]);
const groupedPermissions = ref<GroupedPermission[] | null>([]);

const editDetails = () => {
  showTeamMemberDetailSheet.value = true;
};

const fetchRolePermissions = async () => {
  try {
    fetching.value = true;
    const roleId = role.value.id;
    const res = await roleAndPermissionStore.fetchRolePermissions(
      roleId as number,
      {
        grouped: true,
      }
    );
    groupedPermissions.value = res;
  } catch (error) {
  } finally {
    fetching.value = false;
  }
};
const getMember = async (refresh = false) => {
  try {
    fetching.value = true;
    const memberId = +route.params.id;
    const res = await teamStore.getTeamMember(
      userStore.activeBusiness as Business,
      memberId,
      {},
      refresh
    );
    member.value = res;
  } catch (error) {
  } finally {
    fetching.value = false;
  }
};

const fetchRoles = async () => {
  try {
    fetching.value = true;
    const res = await roleAndPermissionStore.fetchRoles(
      userStore.activeBusiness?.id as number
    );
  } catch (error) {
  } finally {
    fetching.value = false;
  }
};

onMounted(async () => {
  await getMember();
  fetchRolePermissions();
  fetchRoles();
});
</script>

<style lang="scss" scoped>
ion-card {
  margin: 0px;

  ion-card-content {
    ion-item {
      --padding-start: 0px;
      --inner-padding-end: 0px !important;
      display: flex;
      align-items: flex-start;
      h4 {
        font-size: 14px;
        font-weight: 400;
      }

      p {
        font-size: 12px;
      }
      ion-chip {
        --background: #eaecf5;
        --color: #304296;
        padding-top: 0px;
        padding-bottom: 0px;
        font-size: 10px;
        min-height: 22px !important;
        margin-left: 0px;
        margin-bottom: 0px;
      }
    }
  }
}
</style>
