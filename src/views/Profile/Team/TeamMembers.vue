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
              defaultHref="/vendor/profile"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel>{{ $t("profile.team.team") }}</IonLabel>
              <ion-badge class="badge"></ion-badge>
            </section>
          </IonTitle>
          <ion-buttons slot="end">
            <IonButton
              color="dark"
              router-link="/profile/company/team/add-member"
            >
              <IonIcon :icon="personAddOutline" color="dark"></IonIcon>
            </IonButton>
            <IonButton @click="searchEnabled = !searchEnabled" color="dark">
              <IonIcon :icon="search"></IonIcon>
            </IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <IonToolbar v-if="searchEnabled || searchTerm?.length > 0">
        <IonSearchbar
          :placeholder="$t('profile.team.searchTeamMember') + '...'"
          class="search-input"
          v-model="searchTerm"
          @keyup.enter="onSearch($event)"
          @ion-change="onSearch($event)"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <TeamMembersList :teamMembers="teamMembers" />
      <!-- <NoTeamMember /> -->
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
  IonLabel,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonContent,
} from "@ionic/vue";
import { ref } from "vue";
import { arrowBackOutline, personAddOutline, search } from "ionicons/icons";
import NoTeamMember from "@/components/modules/team/NoTeamMember.vue";
import TeamMembersList from "@/components/modules/team/TeamMembersList.vue";

const searchTerm = ref("");
const searchEnabled = ref(false);

const onSearch = async (event: any) => {};
const addTeamMember = () => {};

const teamMembers = ref([
  {
    id: 1,
    name: "Gifty Johnson",
    profile_photo: "",
    role: "Sales agent & business analyst",
  },
  {
    id: 2,
    name: "Gifty Johnson",
    profile_photo: "",
    role: "Sales agent & business analyst",
  },
  {
    id: 3,
    name: "Gifty Johnson",
    profile_photo: "",
    role: "Sales agent & business analyst",
  },
]);
</script>
