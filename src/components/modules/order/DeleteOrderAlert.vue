<template>
  <ion-card class="alert-card">
    <ion-card-header class="alert-header">
      <ion-icon :icon="alertCircleOutline" class="alert-icon"></ion-icon>
      <ion-card-subtitle>Delete from List</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      You can't undo this action
    </ion-card-content>

    <ion-button @click="deleteItem" color="danger">Delete</ion-button>
    <ion-button @click="cancelDelete" color="primary">Cancel</ion-button>
  </ion-card>
</template>

<script lang="ts">
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonCardContent } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonCardContent },

  data() {
    return {
      alertCircleOutline
    }
  },

  methods: {
    deleteItem() {
      // Handle the delete action here
      // For example, you can show a confirmation dialog before deleting.
    },
    cancelDelete() {
      // Handle the cancel action here
      // For example, close the alert card.
    },
    getIconName() {
      // Return the name of the ion-icon for an alert icon, e.g., 'alert' or 'alert-circle'
      return 'alert'; // You can change this to 'alert-circle' or another suitable alert icon
    },
  },
});
</script>

<style scoped>
.alert-card {
  background-color: #fff;
  /* Set the alert card background color */
  border: 2px solid yellow;
  /* Add a border to mimic an alert */
  border-radius: 10px;
  /* Adjust border-radius for rounded corners */
}

.alert-header {
  background-color: yellow;
  /* Set the header background color for the alert */
}

.alert-icon {
  font-size: 2rem;
  /* Adjust the size of the alert icon as needed */
  color: red;
  /* Set the icon color to red or your preferred color */
}
</style>
