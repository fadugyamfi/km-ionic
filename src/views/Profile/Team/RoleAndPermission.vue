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
      <IonCard class="team-member-detail-card">
        <IonCardContent>
          <IonItem lines="none">
            <ProfileAvatar
              :image="member?.logo"
              :username="member?.name"
              customSize="48px"
              slot="start"
            />
            <IonLabel class="ion-no-margin">
              <h4>Gifty Johnson</h4>
              <IonText color="medium">giftyjohnson@gmail.com</IonText>
              <IonChip>Sales agent</IonChip>
              <IonChip>Business analyst</IonChip>
            </IonLabel>
            <IonButton
              slot="end"
              fill="clear"
              color="dark"
              @click="editDetails"
            >
              <IonIcon :icon="createOutline" style="font-size: 20px"></IonIcon>
            </IonButton>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <TeamMemberRoles></TeamMemberRoles>
      <TeamMemberPermissions></TeamMemberPermissions>
      
      <TeamMemberDetailsSheet
        :isOpen="showTeamMemberDetailSheet"
        @didDismiss="showTeamMemberDetailSheet = false"
        @update="onSaveUpdate($event)"
      />
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
  IonFooter,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/vue";
import {
  arrowBackOutline,
  chevronDownOutline,
  createOutline,
} from "ionicons/icons";
import { ref } from "vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import TeamMemberRoles from "@/components/modules/team/TeamMemberRoles.vue";
import TeamMemberPermissions from "@/components/modules/team/TeamMemberPermissions.vue";
import TeamMemberDetailsSheet from "@/components/modules/team/TeamMemberDetailsSheet.vue";

const showTeamMemberDetailSheet = ref(false);

const member = ref({
  name: "Gifty Johnson",
  email: "giftyjohnson@gmail.com",
  roles: [
    {
      id: 1,
      name: "Sales agent",
    },
    {
      id: 2,
      name: "Business analyst",
    },
  ],
});
const editDetails = () => {
  showTeamMemberDetailSheet.value = true;
};
const onSaveUpdate = () => {};
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
      ion-text {
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
