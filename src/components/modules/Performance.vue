<template>
  <IonRow>
    <IonCol size="12">
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
                <IonText color="medium">{{
                  $t("general.performance")
                }}</IonText>
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
    </IonCol>
  </IonRow>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonText,
  IonItem,
  IonProgressBar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import ProfileAvatar from "../ProfileAvatar.vue";
import Agent from "@/models/Agent";

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonProgressBar,
    ProfileAvatar,
    IonText,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    agent: {
      type: Object as PropType<Agent | null>,
      default: () => {},
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
