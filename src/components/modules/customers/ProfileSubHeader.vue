<template>
  <section>
    <section class="main-header">
      <p class="ion-no-margin fw-bold">{{ customer?.name }}</p>
      <ion-buttons slot="end">
        <IonButton @click="updateCustomer()" color="dark" fill="clear"
          ><ion-icon :icon="createOutline"></ion-icon
        ></IonButton>
        <IonButton @click="deleteCustomer()" color="dark" fill="clear"
          ><ion-icon :icon="trashOutline"></ion-icon
        ></IonButton>
      </ion-buttons>
    </section>
    <IonItem class="sub-header" lines="none">
      <div class="d-flex" style="margin-right: 10px;">
        <IonIcon
          size="small"
          :icon="locationOutline"
          slot="start"
          class="ion-no-margin"
        ></IonIcon>
        <IonText color="medium" class="font-medium">{{
          customer?.location
        }}</IonText>
      </div>
      <div class="d-flex">
        <IonIcon
          size="small"
          :icon="callOutline"
          slot="start"
          class="ion-no-margin"
        ></IonIcon>
        <IonText color="medium" class="font-medium">{{
          customer?.phone_number
        }}</IonText>
      </div>
    </IonItem>
  </section>
  <DeleteCustomerModal
    :isOpen="showConfirmDeleteModal"
    :customer="customer"
    @dismiss="showConfirmDeleteModal = false"
    @confirm="onConfirmDelete()"
  />
</template>
<script lang="ts" setup>
import {
  IonTitle,
  IonButtons,
  IonIcon,
  IonButton,
  IonLabel,
  IonItem,
  IonText,
  IonList,
} from "@ionic/vue";
import {
  createOutline,
  trashOutline,
  locationOutline,
  callOutline,
} from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import DeleteCustomerModal from "@/components/modules/customers/DeleteCustomerModal.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";
const router = useRouter();

const props = defineProps({
  customer: {
    type: Object,
    default: () => ({}),
  },
});

const showConfirmDeleteModal = ref(false);

const updateCustomer = () => {
  router.push(
    `/profile/company/customers/${props.customer.id}/update-customer`
  );
};

const deleteCustomer = () => {
  showConfirmDeleteModal.value = true;
};
const onConfirmDelete = async () => {
  const customerStore = useCustomerStore();
  showConfirmDeleteModal.value = false;
  await customerStore.deleteCustomer(props.customer as Customer);
};
</script>
<style lang="scss" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 5px;
  border-bottom: 1px solid #f1f1f1;
  ion-icon {
    font-size: 20px;
  }
}
.sub-header {
  ion-icon {
    margin-right: 4px;
    color: #728087;
  }
}
ion-text {
  font-size: 12px !important;
}
</style>
