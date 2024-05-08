<template>
  <section class="profile-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>Credit payment</h6>
      <IonText
        v-if="credits.length > 0"
        color="primary"
        :router-link="`/profile/company/customers/${$route.params.id}/credit-payments`"
      >
        {{ $t("shopper.home.viewAll") }}
      </IonText>
    </header>
  </section>
  <section v-if="credits.length == 0" class="no-records ion-padding-horizontal">
    <IonText>{{ $t("profile.customers.noRecords") }}</IonText>
  </section>
  <IonList
    v-else
    lines="none"
    class="ion-padding-horizontal customers-select-list simple"
  >
    <IonItem
      v-for="credit in credits"
      :key="credit.id"
      class="ion-align-items-start ion-margin-bottom"
    >
      <ProfileAvatar
        slot="start"
        :src="credit.business?.logo"
        :username="credit?.business?.name"
      ></ProfileAvatar>

      <IonLabel>
        <p class="ion-no-margin">
          {{ credit.business?.name }}
        </p>
        <IonText
          style="margin-bottom: 5px !important"
          color="medium"
          class="font-medium"
        >
          Payment made on {{ credit.payment_date?.split(" ")[0] ?? 'N/A' }}
        </IonText>
        <IonText color="medium" class="font-medium d-flex">
          paid via {{ credit.payment_mode?.name }}
          <Image class="momo" src="/images/momo.svg"></Image> </IonText
      ></IonLabel>

      <IonText>{{ Filters.currency(credit.amount) }}</IonText>
    </IonItem>
  </IonList>
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
} from "@ionic/vue";
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Filters from "@/utilities/Filters";

const props = defineProps({
  credits: {
    type: Object,
    default: () => [],
  },
});

const customer = ref({
  id: 1,
  logo: "",
});

const router = useRouter();
const customerStore = useCustomerStore();
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
      font-weight: 500;
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
    font-weight: 500;
    color: #111;
    margin-bottom: 5px;
  }
}
.no-records {
  ion-text {
    font-size: 12px;
    color: #787486 !important;
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
