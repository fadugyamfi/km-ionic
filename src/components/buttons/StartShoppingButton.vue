<template>
  <section>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button color="yellow">Start Shopping</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButton, IonButtons, IonToolbar } from '@ionic/vue';


export default defineComponent({
  components: {
    IonButton,
    IonButtons,
    IonToolbar,
  },
});
</script>
