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
            <!-- {{ $t("profile.team.addMember") }} -->
            Role and permissions
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
              <IonChip>Sales agent</IonChip>
            </IonLabel>
            <IonButton slot="end" fill="clear" color="dark">
              <IonIcon :icon="createOutline" style="font-size: 20px"></IonIcon>
            </IonButton>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <TeamMemberRoles></TeamMemberRoles>
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
import { ref } from "vue";
import {
  arrowBackOutline,
  chevronDownOutline,
  createOutline,
} from "ionicons/icons";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import TeamMemberRoles from "@/components/modules/team/TeamMemberRoles.vue";

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
