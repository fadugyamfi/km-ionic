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
              :defaultHref="`/profile/company/team/${route.params.id}/role-and-permission`"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold"
            >{{ $t("profile.team.assignRole") }}
          </IonTitle>
          <ion-buttons slot="end">
            <IonButton disabled></IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent class="ion-padding">
      <form>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.team.assignRole')"
          :class="{
            'ion-invalid ion-touched': form.errors.role,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.role"
          required
          name="role"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}</IonSelectOption
          >
        </IonSelect>
        <h6>{{ $t("profile.team.addNewRole") }}</h6>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.new_role }"
          :label="$t('profile.team.addNewRoleNotFoundInOptions')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.new_role"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
      </form>
      <KolaYellowButton>{{ $t("general.save") }}</KolaYellowButton>
      <KolaWhiteButton @click="cancel">{{
        $t("general.cancel")
      }}</KolaWhiteButton>
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
  IonText,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonContent,
} from "@ionic/vue";
import { ref } from "vue";
import { arrowBackOutline, chevronDownOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = useForm({
  role: "",
  new_role: "",
});

const roles = ref([
  {
    id: 1,
    name: "Sales agent",
  },
  {
    id: 2,
    name: "Business analyst",
  },
  {
    id: 3,
    name: "Content editor",
  },
]);

const addTeamMember = () => {};
const cancel = () => {
  router.replace(`/profile/company/team/${route.params.id}/role-and-permission`);
};
</script>
<style lang="scss" scoped>
h6 {
  font-size: 10px;
  color: #74787c;
  font-weight: 400;
  margin-top: 0px;
}
</style>
