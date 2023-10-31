<template>
  <ion-popover>
    <ion-list>
      <ion-item @click="handleOptionClick('reorder')">
        ReOrder
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-item>
      <ion-item @click="handleOptionClick('message')">
        Message Supplier
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-item>
      <ion-item @click="handleOptionClick('editorder')">
        Edit Order
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-item>
      <ion-item @click="handleOptionClick('delete')">
        Delete
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-item>
    </ion-list>
  </ion-popover>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import AlertCard from './AlertCard.vue';

const showAlert = ref(false);
const alertIcon = ref('');
const alertTitle = ref('');
const alertMessage = ref('');
const actionText = ref('');
const performAction = ref(null);
const cancelAction = ref(null);

const handleOptionClick = (option) => {
  showAlert.value = true;
  switch (option) {
    case 'reorder':
      alertIcon.value = 'sync';
      alertTitle.value = 'Re-order';
      alertMessage.value = 'Do you want to re-order this item?';
      actionText.value = 'Re-order';
      performAction.value = reorderItem;
      break;
    case 'message':
      alertIcon.value = 'chatbubbleOutline';
      alertTitle.value = 'Message Supplier';
      alertMessage.value = 'Send a message to the supplier.';
      actionText.value = 'Send Message';
      performAction.value = sendMessage;
      break;
    case 'editorder':
      alertIcon.value = 'createOutline';
      alertTitle.value = 'Edit Order';
      alertMessage.value = 'Edit the order details.';
      actionText.value = 'Edit Order';
      performAction.value = editOrder;
      break;
    case 'delete':
      alertIcon.value = 'trashOutline';
      alertTitle.value = 'Delete Order';
      alertMessage.value = 'Are you sure you want to delete this order?';
      actionText.value = 'Delete';
      performAction.value = deleteOrder;
      break;
  }
};

const closeAlert = () => {
  showAlert.value = false;
};

</script>
