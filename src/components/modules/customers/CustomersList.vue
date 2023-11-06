<template>
  <IonItem>
    <IonAvatar slot="start">
      <Image :src="customer.logo"></Image>
    </IonAvatar>
    <IonLabel>
      <p class="ion-no-margin">{{ customer.name }}</p>
      <IonText color="medium" class="font-medium">
        {{ customer.location || $t("profile.customers.locationUnknown") }}
      </IonText>
      <IonText><IonChip>new</IonChip></IonText>
    </IonLabel>
    <ion-icon
      :id="`popover-button-${customer.id}`"
      color="medium"
      :icon="ellipsisHorizontal"
    ></ion-icon>
    <IonPopover
      :trigger="`popover-button-${customer.id}`"
      :dismiss-on-select="true"
    >
      <IonContent scroll-y="false">
        <IonList>
          <IonItem lines="full" :button="true" :detail="false">
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

  <RemoveCustomerModal
    :isOpen="showConfirmDeleteModal"
    :customer="selectedCustomer"
    @dismiss="showConfirmDeleteModal = false"
    @confirm="onConfirmDelete()"
  ></RemoveCustomerModal>
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
} from "@ionic/vue";
import {
  ellipsisHorizontal,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import { PropType, ref } from "vue";

import Image from "@/components/Image.vue";
import RemoveCustomerModal from "@/components/modules/customers/RemoveCustomerModal.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";

const props = defineProps({
  customer: {
    type: Object as PropType<Customer>,
    default: () => ({}),
  },
});
const selectedCustomer = ref<Customer>();
const showConfirmDeleteModal = ref(false);
const customerStore = useCustomerStore();

const deleteCustomer = (customer: Customer) => {
  selectedCustomer.value = customer;
  showConfirmDeleteModal.value = true;
};

const onConfirmDelete = async () => {
  showConfirmDeleteModal.value = false;
  await customerStore.deleteCustomer(selectedCustomer.value as Customer);
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
