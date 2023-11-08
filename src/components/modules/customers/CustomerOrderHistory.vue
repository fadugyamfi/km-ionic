<template>
  <section v-for="order in orders" :key="order.id" class="ion-margin-bottom">
    <section class="profile-home-section ion-padding-top">
      <header class="ion-padding-horizontal">
        <h6>Order history</h6>
        <IonText
          color="primary"
          :router-link="`/profile/company/customers/${route.params.id}/orders`"
        >
          View all
        </IonText>
      </header>
    </section>
    <IonList
      lines="none"
      class="ion-padding-horizontal customers-select-list simple"
    >
      <IonItem class="ion-align-items-start">
        <IonAvatar slot="start">
          <Image :src="order.customer?.logo"></Image>
        </IonAvatar>
        <IonLabel>
          <p class="ion-no-margin">
            Frytol Oil + 3<span style="color: #787486; font-weight: 400"
              >-#388903</span
            >
          </p>
          <IonText
            ><IonChip>{{ order.order_status?.name }}</IonChip></IonText
          >
        </IonLabel>
        <IonText>22/07/2023</IonText>
      </IonItem>
    </IonList>
  </section>
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
import { useRoute, useRouter } from "vue-router";
import Image from "@/components/Image.vue";
import Customer from "@/models/Customer";
import { useCustomerStore } from "@/stores/CustomerStore";
import { Order } from "@/models/Order";

// const props = defineProps({
//   orders: {
//     type: Object as PropType<Order[]>,
//     default: () => [],
//   },
// });

const route = useRoute();

const orders = ref([
  {
    id: 1,
    customer: {
      logo: "",
    },
    order_status: {
      name: "Completed",
    },
  },
]);
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
    --background: #ecfdf3;
    --color: #027a48;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  ion-item ion-label {
    line-height: 1em;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
  }

  ion-text {
    font-size: 14px;
    color: #9b9ea0;
  }

  ion-item ion-label p {
    font-weight: bold;
    color: #111;
  }
}
</style>
