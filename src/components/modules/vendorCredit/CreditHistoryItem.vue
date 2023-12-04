<template>
  <IonItem
    :button="true"
    lines="none"
    @click="router.push(`/vendor/credits/${credit?.id}/credit-details`)"
  >
    <ProfileAvatar
      slot="start"
      :image="credit?.business?.logo"
      :username="credit?.business?.name"
      custom-size="40px"
      class="ion-align-self-start ion-margin-top"
    ></ProfileAvatar>
    <IonLabel>
      <p>
        <IonText color="dark">{{ credit?.business?.name }}- </IonText>
        <IonText color="medium">GHS {{ credit?.total_sales_price }}</IonText>
      </p>
      <p class="font-medium">
        <IonText color="medium"> Frytol Oil 24kg/21pieces </IonText>
      </p>
      <p class="font-medium">
        <IonText color="medium">
          Order date: {{ Filters.date(credit?.created_at as string, "short") }}
        </IonText>
      </p>

      <p>
        <IonChip color="danger" class="font-medium"> Due: 22/09/2023 </IonChip>
      </p>
    </IonLabel>
    <IonButton
      v-if="popover"
      @click="openMenu"
      fill="clear"
      color="dark"
      slot="end"
      class="ion-align-self-start"
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
  IonButton,
  IonPopover,
  IonContent,
} from "@ionic/vue";
import {
  ellipsisHorizontal,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Filters from "@/utilities/Filters";
import Credit from "@/models/Credit";
import { useToastStore } from "@/stores/ToastStore";

const toastStore = useToastStore();

const props = defineProps({
  credit: {
    type: Credit,
    default: () => {},
  },
  popover: {
    type: Boolean,
    default: false,
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
ion-label {
  padding-inline-start: 0px;
}
.due-date {
  margin-left: 8px;
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
