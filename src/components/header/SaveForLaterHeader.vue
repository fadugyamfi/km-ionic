<template>
  <ion-segment value="default">
    <ion-segment-button value="segment">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/shopper/home"></IonBackButton>
      </IonButtons>
      <ion-label>Shipping Details</ion-label>
    </ion-segment-button>
    <ion-segment-button value="default" class="custom-segment-button">
      <ion-label>Save For Later</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton, IonLabel,IonButtons, IonBackButton} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonSegment, IonSegmentButton, IonLabel, IonButtons,IonBackButton },
});
</script>

<style scoped>
.custom-segment-button {

}
</style>
