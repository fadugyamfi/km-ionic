<template>
  <section class="profile-home-section ion-padding-top">
    <header class="ion-padding-horizontal">
      <h6>Credit payment</h6>
      <IonText color="primary" router-link=""> View all </IonText>
    </header>
  </section>
  <IonList
    lines="none"
    class="ion-padding-horizontal customers-select-list simple"
  >
    <IonItem class="ion-align-items-start">
      <IonAvatar slot="start">
        <Image :src="customer.logo"></Image>
      </IonAvatar>
      <IonLabel>
        <p class="ion-no-margin">Racy Ventures</p>
        <IonText style="margin-bottom: 5px !important;" color="medium" class="font-medium">
          Payment made on 22/07/2023
        </IonText>
        <IonText color="medium" class="font-medium">
          paid via mobile money
        </IonText>
      </IonLabel>
      <IonText>GHS 500.00</IonText>
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

const props = defineProps({
  customers: {
    type: Object as PropType<Customer[]>,
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
</style>
