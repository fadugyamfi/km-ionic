<template>
  <IonList
    lines="none"
    class="ion-padding-horizontal customers-select-list simple"
  >
    <IonItem v-for="customer in customers" :key="customer.id" :button="true">
      <ProfileAvatar :image="customer?.logo" :username="customer?.name" customSize="40px"></ProfileAvatar>
      <IonLabel
        @click="
          $router.push(`/profile/company/customers/${customer.id}/profile`)
        "
      >
        <p class="ion-no-margin">{{ customer.name }}</p>
        <IonText color="medium" class="font-medium">
          {{ customer.location || $t("profile.customers.locationUnknown") }}
        </IonText>
        <IonText v-if="isNewCustomer(customer.created_at)"
          ><IonChip>{{ $t("profile.customers.new") }}</IonChip></IonText
        >
      </IonLabel>

      <IonButton
        :id="`popover-button-${customer.id}`"
        fill="clear"
        color="dark"
      >
        <ion-icon color="medium" :icon="ellipsisHorizontal"></ion-icon>
      </IonButton>
      <IonPopover
        :trigger="`popover-button-${customer.id}`"
        :dismiss-on-select="true"
      >
        <IonContent :scroll-y="false">
          <IonList>
            <IonItem
              @click="updateCustomer(customer)"
              lines="full"
              :button="true"
              :detail="false"
            >
              <IonIcon :icon="createOutline"></IonIcon>
              {{ $t("profile.customers.updateCustomer") }}
            </IonItem>
            <IonItem
              lines="none"
              :button="true"
              :detail="false"
              @click="deleteCustomer(customer)"
            >
              <IonIcon :icon="trashOutline"></IonIcon>
              {{ $t("profile.customers.removeCustomer") }}</IonItem
            >
          </IonList>
        </IonContent>
      </IonPopover>
    </IonItem>
  </IonList>
  <DeleteCustomerModal
    :isOpen="showConfirmDeleteModal"
    :customer="selectedCustomer"
    @dismiss="showConfirmDeleteModal = false"
    @confirm="onConfirmDelete()"
  />
</template>
<script lang="ts" setup>
import {
  IonList,
  IonAvatar,
  IonText,
  IonItem,
  IonChip,
  IonIcon,
  IonContent,
  IonPopover,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import {
  ellipsisHorizontal,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import DeleteCustomerModal from "@/components/modules/customers/DeleteCustomerModal.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";
import { getDateFromNow } from "@/utilities";
import { useToastStore } from "@/stores/ToastStore";
import ProfileAvatar from "../../ProfileAvatar.vue";

const toastStore = useToastStore();

const props = defineProps({
  customers: {
    type: Object as PropType<Customer[]>,
    default: () => [],
  },
});

const router = useRouter();
const customerStore = useCustomerStore();

const selectedCustomer = ref<Customer>();
const showConfirmDeleteModal = ref(false);

const isNewCustomer = (date: any) => getDateFromNow(7) < date;

const deleteCustomer = (customer: Customer) => {
  selectedCustomer.value = customer;
  showConfirmDeleteModal.value = true;
};
const onConfirmDelete = async () => {
  try {
    showConfirmDeleteModal.value = false;
    await customerStore.deleteCustomer(selectedCustomer.value as Customer);
    toastStore.showSuccess(
      "Customer has been removed successfully",
      "",
      "bottom"
    );
  } catch (error) {
    toastStore.showError(
      "Failed to remove Customer. Please try again",
      "",
      "bottom",
      "footer"
    );
  }
};

const updateCustomer = (customer: Customer) => {
  router.push(`/profile/company/customers/${customer.id}/update-customer`);
};
</script>

<style lang="scss" scoped>
.customers-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    --background: #ffffff;
    border: solid 1px #f4f4f4;
    border-radius: 12px;
    margin-bottom: 0.5em;
    box-shadow: 0px 4px 12px 0px #696f821a;
  }
  ion-item ion-chip {
    --background: #eaecf5;
    --color: #304296;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
  }

  ion-item ion-label p {
    font-weight: bold;
    color: #111;
  }

  &.simple {
    ion-item {
      border: solid 1px #f4f4f4;
      border-radius: 12px;
      margin-bottom: 0.5em;
      box-shadow: none;
      --background: none;
    }
  }
}
ion-popover {
  --width: 220px;
}

ion-icon {
  margin-right: 10px;
}
</style>
