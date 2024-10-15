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
          <IonTitle size="small" class="fw-bold"
            >{{ $t("profile.team.addMember") }}
          </IonTitle>
          <ion-buttons slot="end">
            <IonButton disabled></IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent class="ion-padding-horizontal">
      <h4 class="header">{{ $t("profile.team.addTeamMember") }}</h4>
      <p class="subtext">
        {{ $t("profile.team.addTeamMemberDescription") }}
      </p>
      <form>
        <IonCard color="light">
          <IonImg
            v-if="photo"
            :src="photo.webviewPath"
            @click="pickImages()"
          ></IonImg>

          <IonCardContent
            v-if="!photo"
            @click="pickImages()"
            class="d-flex ion-justify-content-center ion-align-items-center flex-column"
            style="height: 200px"
          >
            <IonImg
              src="/images/vendor/featured-image.svg"
              style="width: 64px; margin-bottom: 15px"
            ></IonImg>
            <p class="font-medium">Tap to upload</p>
            <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p>
          </IonCardContent>
        </IonCard>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.team.fullName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.email }"
          :label="$t('profile.team.emailAddress')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.email"
          name="email"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.phone_number }"
          :label="$t('profile.team.preferredContact')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.phone_number"
          name="phone_number"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <header
          class="d-flex ion-align-items-center ion-justify-content-between"
        >
          <h6 class="ion-no-margin">{{ $t("profile.team.assignRole") }}</h6>
          <IonButton
            fill="clear"
            style="text-transform: none"
            class="ion-text-start add-new-item"
            @click="addNewRole"
          >
            {{ $t("profile.team.addNewRole") }}
          </IonButton>
        </header>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.team.selectRole')"
          :class="{
            'ion-invalid ion-touched': form.errors.role_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.role_id"
          required
          name="role_id"
          :toggle-icon="chevronDownOutline"
          @ion-change="getRolePermissions($event)"
        >
          <IonSelectOption
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}</IonSelectOption
          >
        </IonSelect>
        <section>
          <div class="ion-padding ion-text-center" v-show="fetching">
            <IonSpinner name="crescent"></IonSpinner>
          </div>
          <TeamMemberPermissions
            v-if="!fetching && groupedPermissions.length > 0"
            :groupedPermissions="groupedPermissions"
          />
        </section>
      </form>
    </IonContent>
    <IonFooter class="ion-no-border ion-padding-horizontal">
      <KolaYellowButton :disabled="!canSave" @click="addMember">{{
        $t("general.save")
      }}</KolaYellowButton>
      <KolaWhiteButton>{{ $t("general.cancel") }}</KolaWhiteButton>
    </IonFooter>
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
  IonContent,
  IonCard,
  IonCardContent,
  IonImg,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonFooter,
  modalController,
  IonSpinner,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import { arrowBackOutline, chevronDownOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import AddNewRoleModal from "@/components/modules/team/AddNewRoleModal.vue";
import TeamMemberPermissions from "@/components/modules/team/TeamMemberPermissions.vue";
import { useRoleAndPermissionStore } from "@/stores/RoleAndPermissionStore";
import { useUserStore } from "@/stores/UserStore";
import { useTeamStore } from "@/stores/TeamStore";
import { useToastStore } from "@/stores/ToastStore";
import { useRouter } from "vue-router";
import { GroupedPermission } from "@/models/Permission";

const router = useRouter();
const fetching = ref(false);
const roleAndPermissionStore = useRoleAndPermissionStore();
const userStore = useUserStore();
const teamStore = useTeamStore();
const toastStore = useToastStore();

const form = useForm({
  photo: "",
  name: "",
  role_id: "",
  phone_number: "",
  description: "New team member",
  email: "",
});
const photo = ref();
const groupedPermissions = ref<GroupedPermission[]>([]);
const roles = computed(() => roleAndPermissionStore.roles);
const canSave = computed(
  () =>
    form.fields.name.length > 0 &&
    form.fields.role_id &&
    form.fields.phone_number.length > 0 &&
    form.fields.email.length > 0
);

const addMember = async () => {
  try {
    toastStore.blockUI("Hold On As We Associate User and Business");
    const newForm = {
      ...form.fields,
      businesses_id: userStore.activeBusiness?.id,
      id_cms_privileges: form.fields.role_id,
      parent_users_id: userStore.user?.parent_users_id,
    };
    const res = await teamStore.addTeamMember(newForm);
    if (res) {
      toastStore.unblockUI();
      await toastStore.showSuccess("User and business associated successfully");
      router.replace("/profile/company/team");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to associate User and business. Please try again!",
        "",
        "bottom",
        "footer"
      );
    }
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

const pickImages = async () => {
  const { takePhoto, photos, pickImages } = usePhotoGallery();
  try {
    await pickImages();

    photo.value = photos.value ? photos.value[0] : null;
    if (photo.value) {
      form.fields.photo = photo.value.base64Data as string;
    }
  } catch (e) {
    console.log(e);
  }
};
const fetchRoles = async () => {
  try {
    // fetching.value = true;
    const res = await roleAndPermissionStore.fetchRoles(
      userStore.activeBusiness?.id as number
    );
  } catch (error) {
  } finally {
    // fetching.value = false;
  }
};
const getRolePermissions = async (event: any) => {
  try {
    form.validateSelectInput(event);
    fetching.value = true;
    const roleId = event.target.value;
    const res = await roleAndPermissionStore.fetchRolePermissions(roleId, {
      grouped: true,
    });
    groupedPermissions.value = res;
  } catch (error) {
  } finally {
    fetching.value = false;
  }
};

onMounted(() => {
  fetchRoles();
});
</script>
<style lang="scss" scoped>
.header {
  font-size: 16px;
  font-weight: 400;
}
.subtext {
  font-size: 12px;
  color: #74787c;
  font-weight: 400;
}

ion-card {
  margin: 0px;
  margin-bottom: 24px;
}
h6 {
  font-size: 10px;
  color: #74787c;
  font-weight: 400;
  margin-top: 0px;
}
.add-new-item {
  --color: #5260ff;
  font-size: 12px;
  font-weight: 400;
}
</style>
