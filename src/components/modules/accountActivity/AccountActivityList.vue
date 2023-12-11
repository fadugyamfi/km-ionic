<template>
  <IonItem :button="true" lines="none" class="profile-item ion-margin-top d-flex flex-column ion-align-items-start">
    <ProfileAvatar
      slot="start"
      class="ion-align-self-start ion-margin-top"
      :image="activity.causer?.photo"
      :username="activity.causer?.name"
    ></ProfileAvatar>

    <IonLabel>
      <p>
        <IonText color="dark">{{ activity?.description }}</IonText>
      </p>
      <p class="font-medium">
        <IonText color="medium">{{ activity?.log_name }}</IonText>
      </p>
    </IonLabel>
  </IonItem>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonText } from "@ionic/vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue"; 

export default {
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonItem,
    IonLabel,
    IonText,
    ProfileAvatar,
  },
};
</script>

<style scoped>

</style>
