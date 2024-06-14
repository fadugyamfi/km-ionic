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
            <IonButton @click="addNewRole">
              <IonIcon :icon="personAddOutline" color="dark"></IonIcon>
            </IonButton>
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
            'ion-invalid ion-touched': form.errors.role_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.role_id"
          required
          name="role"
          :toggle-icon="chevronDownOutline"
          @ion-change="handleRoleSelect($event)"
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
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.team.addNewRoleNotFoundInOptions')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="name"
          @ion-input="handleNameInput($event)"
          required
        ></IonInput>
      </form>
      <KolaYellowButton @click="save">{{
        $t("general.save")
      }}</KolaYellowButton>
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
  IonIcon,
  modalController,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import {
  addOutline,
  arrowBackOutline,
  business,
  chevronDownOutline,
  personAddOutline,
} from "ionicons/icons";
import { useForm } from "@/composables/form";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useRoleAndPermissionStore } from "@/stores/RoleAndPermissionStore";
import { useUserStore } from "@/stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";
import AddNewRoleModal from "@/components/modules/team/AddNewRoleModal.vue";
import Role from "@/models/Role";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const toastStore = useToastStore();
const roleAndPermissionStore = useRoleAndPermissionStore();

const form = useForm({
  role_id: "",
  name: "",
});

const roles = ref<Role[]>();

const handleNameInput = (event: any) => {
  form.validate(event);
  form.fields.role_id = "";
};
const handleRoleSelect = (event: any) => {
  form.validateSelectInput(event);
  form.fields.name = "";
};

const save = () => {
  if (form.fields.role_id) {
    assignRole();
    return;
  }
  createRole();
};

const assignRole = async () => {
  try {
    // const res = await
  } catch (error) {}
};
const createRole = async () => {
  try {
    const res = await roleAndPermissionStore.createRole({
      name: form.fields.name,
      business_id: userStore.activeBusiness?.id,
      description: "",
      permissions: [],
    });
    await toastStore.showSuccess("Role added successfully");
  } catch (error) {}
};

const cancel = () => {
  router.replace(
    `/profile/company/team/${route.params.id}/role-and-permission`
  );
};

const fetchRoles = async () => {
  try {
    const res = await roleAndPermissionStore.fetchRoles(
      userStore.activeBusiness?.id as number
    );
    roles.value = res;
  } catch (error) {}
};
const addNewRole = async () => {
  const modal = await modalController.create({
    component: AddNewRoleModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === "confirm") {
    // message.value = `Hello, ${data}!`;
  }
};

onMounted(() => {
  fetchRoles();
});
</script>
<style lang="scss" scoped>
h6 {
  font-size: 10px;
  color: #74787c;
  font-weight: 400;
  margin-top: 0px;
}
</style>
