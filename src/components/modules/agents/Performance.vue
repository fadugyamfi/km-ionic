<template>
  <IonCard class="ion-no-margin">
    <IonCardContent class="ion-no-padding">
      <IonItem lines="none">
        <ProfileAvatar
          slot="start"
          :image="agent?.photo"
          :username="agent?.name"
        ></ProfileAvatar>
        <IonLabel>
          <h6>
            <IonText color="medium">Performance</IonText>
          </h6>
          <p>
            <IonText color="dark" class="fw-semibold"
              >You have met
              {{ percentageComplete }}
              % of your target
            </IonText>
          </p>
        </IonLabel>
      </IonItem>
      <section class="ion-margin-horizontal ion-margin-bottom">
        <IonProgressBar
          :value="(percentageComplete as number) / 100"
          color="warning"
        ></IonProgressBar>
      </section>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonItem, IonProgressBar } from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import ProfileAvatar from "../../../components/ProfileAvatar.vue";
import User from "@/models/User";

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonProgressBar,
    ProfileAvatar,
  },
  props: {
    agent: {
      type: Object as PropType<User>,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    percentageComplete() {
      return this.agent?.latest_target_percentage_complete;
    },
  },
});
</script>

<style scoped></style>
