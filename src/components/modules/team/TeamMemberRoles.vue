<template>
  <section style="margin-top: 24px">
    <section class="role-section">
      <header>
        <h6>{{ $t("profile.team.role") }}</h6>
        <IonText
          color="tertiary"
          :router-link="`/profile/company/team/${route.params.id}/assign-role`"
          >{{ $t("profile.team.assignNewRole") }}</IonText
        >
      </header>
    </section>
    <IonItem lines="none">
      <IonLabel slot="start"> Sales agent </IonLabel>
      <IonButton fill="clear" slot="end" color="dark" @click="removeRole">
        <IonIcon :icon="closeCircleOutline"></IonIcon>
      </IonButton>
    </IonItem>
    <IonItem lines="none">
      <IonLabel slot="start">Business analyst</IonLabel>
      <IonButton fill="clear" slot="end" color="dark">
        <IonIcon :icon="closeCircleOutline"></IonIcon>
      </IonButton>
    </IonItem>
  </section>
  <RemoveRoleModal
    :isOpen="showConfirmRemoveModal"
    :member="selectedRole"
    @dismiss="showConfirmRemoveModal = false"
    @confirm="onConfirmDelete()"
  />
</template>
<script setup lang="ts">
import { IonText, IonItem, IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
import { useToastStore } from "@/stores/ToastStore";
import { ref } from "vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import RemoveRoleModal from "./RemoveRoleModal.vue";
import { useRoute } from "vue-router";

const route = useRoute()

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const showConfirmRemoveModal = ref(false);

const selectedRole = ref(null);

const removeRole = (role: any) => {
  selectedRole.value = role;
  showConfirmRemoveModal.value = true;
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
