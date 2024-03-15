<template>
  <section class="ion-margin-top" v-if="percentage < 100">
    <IonItem lines="none" button router-link="/profile/company/edit-profile">
      <IonLabel class="d-flex flex-column w-100">
        <section class="d-flex" style="margin-bottom: 5px">
          <IonText class="font-medium">Profile Completion</IonText>
          <h3 class="font-medium ion-no-margin">{{ percentage }}%</h3>
        </section>
        <IonProgressBar :value="progressPercentage"></IonProgressBar>
      </IonLabel>
      <IonButton
        fill="clear"
        class="font-medium ion-text-capitalize"
        style="margin-bottom: 5px"
      >
        Edit</IonButton
      >
    </IonItem>
  </section>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore";
import {
  IonProgressBar,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/vue";
import { computed } from "vue";

const userStore = useUserStore();

const businessProfile = computed(() => {
  return {
    name: userStore.activeBusiness?.name,
    email: userStore.activeBusiness?.email,
    phone_number: userStore.activeBusiness?.phone_number,
    location: userStore.activeBusiness?.location,
    country_id: userStore.activeBusiness?.country_id,
    region_id: userStore.activeBusiness?.region_id,
    city: userStore.activeBusiness?.city,
    tax_number: userStore.activeBusiness?.tax_number,
    id_card_image: userStore.activeBusiness?.id_card_image,
    id_card_number: userStore.activeBusiness?.id_card_number,
  };
});

const totalFields = computed(() => Object.keys(businessProfile.value).length);

const totalCompleted = computed(() => {
  let numberOfFilledInputs = 0;
  const values = Object.values(businessProfile.value);
  for (const value of values) {
    if (value) {
      numberOfFilledInputs++;
    }
  }
  return numberOfFilledInputs;
});

const percentage = computed(() => {
  return Math.round((totalCompleted.value / totalFields.value) * 100);
});

const progressPercentage = computed(() => percentage.value / 100);
</script>

<style scoped lang="scss">
ion-item {
  //--min-height: 40px;
  ion-label {
    margin: 0px;
    display: flex !important;

    h3 {
      color: #f5aa29;
      margin-left: 5px;
      font-weight: 600;
    }
  }
  ion-button {
    margin: 0px;
  }
  ion-progress-bar {
    --progress-background: #f5aa29;
    --background: #f4f4f4;
  }
}
</style>
