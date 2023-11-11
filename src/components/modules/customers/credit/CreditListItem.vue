<template>
  <IonItem class="ion-align-items-start ion-margin-bottom">
    <ProfileAvatar slot="start" :image="credit.business?.logo" :username="credit.business?.name" custom-size="40px"></ProfileAvatar>

    <IonLabel>
      <p class="ion-no-margin">
        {{ credit.business?.name }}
      </p>
      <IonText
        style="margin-bottom: 5px !important"
        color="medium"
        class="font-medium"
      >
        Payment made on {{ credit.payment_date.split(" ")[0] }}
      </IonText>
      <IonText color="medium" class="font-medium d-flex">
        paid via {{ credit.payment_mode.name }}
        <Image class="momo" src="/images/momo.svg"></Image>
      </IonText>
      <IonText class="fw-bold">GHS {{ credit.amount }}</IonText></IonLabel
    >
    <IonButton
      slot="end"
      fill="clear"
      color="dark"
      class="ion-align-self-start ion-margin-top"
      @click.stop="openMenu($event)"
    >
      <IonIcon :icon="ellipsisHorizontal"></IonIcon>
    </IonButton>
    <slot name="popover"></slot>
  </IonItem>
</template>
<script lang="ts" setup>
import {
  IonList,
  IonAvatar,
  IonText,
  IonItem,
  IonChip,
  IonIcon,
  IonLabel,
  IonButton
} from "@ionic/vue";
import { ellipsisHorizontal} from "ionicons/icons"
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";
import ProfileAvatar from "../../../ProfileAvatar.vue";

const props = defineProps({
  credit: {
    type: Object,
    default: () => [],
  },
});

const emit = defineEmits(["openMenu"]);
const router = useRouter();

const openMenu = (event: CustomEvent) => {
  emit("openMenu", event);
};
</script>

<style lang="scss" scoped>
.profile-home-section {
  margin-bottom: 10px;
  margin-top: 10px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;

    h6 {
      font-weight: bold;
      font-size: 1em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
}
.customers-select-list {
  ion-list-header {
    padding-left: 0px;
    font-size: 0.9em;
  }

  ion-item {
    --padding-start: 0px;
  }

  ion-item ion-chip {
    --background: #eaecf5;
    --color: #304296;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
    margin-top: 0px;

    ion-text {
      margin-bottom: 5px !important;
      font-size: 12px;
    }
  }

  ion-text {
    font-size: 14px;
    color: #787486 !important;
  }

  ion-item ion-label p {
    font-weight: bold;
    color: #111;
    margin-bottom: 5px;
  }
}
.momo {
  max-width: 20px;
  margin-left: 5px;
}
ion-item::part(native).item-inner {
  padding-right: 0px;
  --padding-end: 0px;
}
</style>
