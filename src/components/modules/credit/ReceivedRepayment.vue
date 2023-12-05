<template>
  <IonItem :button="true" lines="none">
    <ProfileAvatar
      slot="start"
      :image="receivedRepayment?.business?.logo"
      :username="receivedRepayment?.business?.name"
      custom-size="40px"
      class="ion-align-self-start ion-margin-top"
    ></ProfileAvatar>
    <IonLabel>
      <p>
        <IonText color="dark"
          >{{ receivedRepayment?.business?.name }}
          {{ receivedRepayment.isPaid() ? "paid" : "" }} -
        </IonText>
        <IonText color="medium"
          >{{
            Filters.currency(
              receivedRepayment?.amount as number,
              receivedRepayment.currency?.symbol as string
            )
          }}
        </IonText>
      </p>
      <p>
        <IonText color="medium" class="font-medium">
          Payment made on
          {{ Filters.date(receivedRepayment?.payment_date as string, "short") }}
        </IonText>
      </p>

      <p>
        <IonText color="medium" class="font-medium d-flex">
          paid via {{ receivedRepayment.payment_mode?.name }}
        </IonText>
      </p>
    </IonLabel>
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
} from "@ionic/vue";
import { PropType, ref } from "vue";
import Image from "@/components/Image.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Filters from "@/utilities/Filters";
import { SalePayment } from "@/models/SalePayment";

const props = defineProps({
  receivedRepayment: {
    type: SalePayment as PropType<SalePayment>,
    default: () => {},
  },
});
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
