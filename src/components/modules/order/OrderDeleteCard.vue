<template>
  <ion-card>
    <ion-card-header>
      <ion-icon :icon="alert-circle-outline" class="icon"></ion-icon>
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
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonIcon },
  methods: {
    deleteItem() {
      // Handle the delete action here
    },
    cancelDelete() {
      // Handle the cancel action here
    },
    getIconName() {
      // Return the name of the ion-icon for a yellow alert icon, e.g., 'warning' or 'alert-circle-outline'
      return 'warning'; // You can change this to 'alert-circle-outline' if you prefer the alert icon
    },
  },
});
</script>

<style scoped>
.icon {
  font-size: 2rem; /* Adjust the size of the icon as needed */
  color: yellow; /* Set the icon color to yellow */
}
</style>

    