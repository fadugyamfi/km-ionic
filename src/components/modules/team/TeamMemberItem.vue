<template>
  <IonItem :button="true">
    <ProfileAvatar
      :image="member?.photo"
      :username="member?.name"
      customSize="40px"
    ></ProfileAvatar>
    <IonLabel>
      <p class="ion-no-margin">{{ member.name }}</p>
      <IonText color="medium" class="font-medium ellipsis" style="width: 200px">
        {{ member.teams[0]?.role?.name }}
      </IonText>
    </IonLabel>

    <IonButton @click.stop="openMenu($event)" fill="clear" color="dark">
      <ion-icon color="medium" :icon="ellipsisHorizontal"></ion-icon>
    </IonButton>

    <slot name="popover"></slot>
  </IonItem>
</template>
<script setup lang="ts">
import { IonText, IonItem, IonIcon, IonLabel, IonButton } from "@ionic/vue";
import { ellipsisHorizontal } from "ionicons/icons";
import ProfileAvatar from "../../ProfileAvatar.vue";
import { PropType } from "vue";
import Agent from "@/models/Agent";

const props = defineProps({
  member: {
    type: Object as PropType<Agent>,
    default: () => ({}),
  },
});

const emit = defineEmits(["openMenu"]);

const openMenu = (event: CustomEvent) => {
  emit("openMenu", event);
};
</script>
<style lang="scss" scoped>
ion-item {
  --background: #ffffff;
  border: solid 1px #f4f4f4;
  border-radius: 12px;
  margin-bottom: 0.5em;
  box-shadow: 0px 4px 12px 0px #696f821a;

  ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
    p {
      font-weight: 500;
      color: #111;
    }
  }
}
</style>
