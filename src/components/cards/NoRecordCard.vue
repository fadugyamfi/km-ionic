<template>
  <section class="ion-padding">
    <IonCard class="ion-no-margin">
      <IonCardContent class="ion-no-padding">
        <IonItem lines="none">
          <IonLabel>
            <p>
              <IonText color="dark" class="fw-semibold">{{ title }} </IonText>
            </p>
            <h6>
              <IonText color="medium">{{ description }}</IonText>
            </h6>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  </section>
</template>
<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonText,
  IonItem,
  IonLabel,
} from "@ionic/vue";

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});
</script>
