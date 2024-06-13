<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]">
    <IonContent class="ion-padding">
      <header
        class="fw-semibold ion-padding ion-text-center d-flex ion-align-items-center ion-justify-content-between"
      >
        <IonButton fill="clear" disabled></IonButton>
        <h6 class="ion-no-margin">
          {{ $t("profile.team.assignNewRole") }}
        </h6>
        <IonButton fill="clear" color="dark" @click="addNewRole">
          <IonIcon :icon="personAddOutline"></IonIcon>
        </IonButton>
      </header>
      <main class="ion-padding-vertical">
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
      </main>
      <footer>
        <KolaYellowButton
          @click="assignRole()"
          :disabled="!form.fields.role_id || saving"
        >
          {{ !saving ? $t("general.save") : "" }}
          <IonSpinner
            class="spinner"
            name="crescent"
            v-if="saving"
          ></IonSpinner>
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonContent,
  IonFooter,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonButton,
  modalController,
  IonSpinner,
  IonIcon,
} from "@ionic/vue";
import { chevronDownOutline, personAddOutline } from "ionicons/icons";
import { defineComponent, PropType } from "vue";
import { useForm } from "@/composables/form";
import KolaYellowButton from "../../KolaYellowButton.vue";
import AddNewRoleModal from "@/components/modules/team/AddNewRoleModal.vue";
import { useRoleAndPermissionStore } from "@/stores/RoleAndPermissionStore";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonSpinner,
  },

  props: {
    assignedRole: {
      type: Object,
      default: () => ({}),
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["onAssignRole"],
  data() {
    return {
      personAddOutline,
      chevronDownOutline,
      saving: false,
      form: useForm({
        role_id: "",
      }),
    };
  },

  computed: {
    ...mapStores(useRoleAndPermissionStore, useUserStore, useToastStore),
  },

  methods: {
    async assignRole() {
      try {
        this.saving = true;
        const form = {
          role_id: this.form.fields.role_id,
          businesses_id: this.userStore.activeBusiness?.id,
          user_id: this.$route.params.id,
        };
        const res = await this.roleAndPermissionStore.assignRole(form);
        this.$el.dismiss();
        this.$emit("onAssignRole");
        await this.toastStore.showSuccess("New role assigned successfully");
      } catch (error) {
      } finally {
        this.saving = false;
      }
    },

    async addNewRole() {
      this.$el.dismiss();
      const modal = await modalController.create({
        component: AddNewRoleModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        // message.value = `Hello, ${data}!`;
      }
    },
  },

  watch: {
    assignedRole(newValue) {
      this.form.fields.role_id = newValue.id;
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  border-bottom: solid #efefef 1px;
  ion-button {
    &:last-child {
      ion-icon {
        font-size: 22px;
      }
    }
  }
}

ion-modal {
  --border-radius: 2em;

  // .add-new-item {
  //   --color: #5260ff;
  //   font-weight: 400;
  // }
}
</style>
