<template>
  <section style="margin-top: 24px">
    <section class="role-section">
      <header>
        <h6>{{ $t("profile.team.role") }}</h6>
        <IonButton
          fill="clear"
          style="text-transform: none"
          class="ion-text-start add-new-item"
          @click="showAssignRoleSheet = true"
        >
          {{ $t("profile.team.assignNewRole") }}
        </IonButton>
      </header>
    </section>
    <IonItem lines="none">
      <IonLabel slot="start">{{ role?.name }}</IonLabel>
      <!-- <IonButton fill="clear" slot="end" color="dark" @click="removeRole">
        <IonIcon :icon="closeCircleOutline"></IonIcon>
      </IonButton> -->
    </IonItem>
  </section>
  <RemoveRoleModal
    :isOpen="showConfirmRemoveModal"
    :member="selectedRole"
    @dismiss="showConfirmRemoveModal = false"
    @confirm="onConfirmDelete()"
  />
  <AssignRoleSheet
    :assignedRole="role"
    :roles="roles"
    :isOpen="showAssignRoleSheet"
    @didDismiss="showAssignRoleSheet = false"
    @onAssignRole="assignRole"
  />
</template>
<script setup lang="ts">
import { IonText, IonItem, IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
import { useToastStore } from "@/stores/ToastStore";
import { ref } from "vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import AssignRoleSheet from "@/components/modules/team/AssignRoleSheet.vue";
import RemoveRoleModal from "./RemoveRoleModal.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  role: {
    type: Object,
    default: () => ({}),
  },
  roles: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();
const emit = defineEmits(["onAssignRole"]);

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const showConfirmRemoveModal = ref(false);
const showAssignRoleSheet = ref(false);

const selectedRole = ref(null);

const removeRole = (role: any) => {
  selectedRole.value = role;
  showConfirmRemoveModal.value = true;
};

const assignRole = () => {
  emit("onAssignRole");
};

const onConfirmDelete = async () => {
  try {
    showConfirmRemoveModal.value = false;
    await customerStore.deleteCustomer(selectedRole.value as any);
    toastStore.showSuccess("Role has been removed", "", "bottom");
  } catch (error) {
    toastStore.showError(
      "Failed to remove role. Please try again",
      "",
      "bottom",
      "footer"
    );
  }
};
</script>
<style lang="scss" scoped>
.role-section {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;

    h6 {
      font-weight: 500;
      font-size: 1em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
  .add-new-item {
    --color: #5260ff;
    font-weight: 400;
  }
}
ion-item {
  border-radius: 8px;
  box-shadow: 0px 2px 12px #68686f14;
  margin-bottom: 5px;
  --inner-padding-end: 5px;
  &::part(native) {
    color: #000;
    border-radius: 8px;
    border-width: 1px;
    border-color: #f4f4f4;
  }
  ion-label {
    font-size: 14px !important;
  }
  ion-button {
    ion-icon {
      color: #9e9e9e;
      font-size: 20px;
    }
  }
}
</style>
