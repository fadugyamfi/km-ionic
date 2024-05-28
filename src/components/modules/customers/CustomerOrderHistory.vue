<template>
  <section class="ion-margin-bottom">
    <section class="profile-home-section ion-padding-top">
      <header class="ion-padding-horizontal">
        <h6>Order history</h6>
        <IonText
          v-if="orders.length > 0"
          color="primary"
          :router-link="`/profile/company/customers/${route.params.id}/orders`"
        >
          {{ $t("shopper.home.viewAll") }}
        </IonText>
      </header>
    </section>
    <section
      v-if="orders.length == 0"
      class="no-records ion-padding-horizontal"
    >
      <IonText>{{ $t("profile.customers.noRecords") }}</IonText>
    </section>
    <IonList
      v-else
      lines="none"
      class="ion-padding-horizontal customers-select-list simple"
    >
      <IonItem
        v-for="order in orders"
        :key="order.id"
        class="ion-align-items-start ion-margin-bottom"
        :router-link="`/vendor/orders/${order.id}`"
        button
      >
        <ProfileAvatar
          slot="start"
          :image="order.customer?.logo"
          :username="order.customer?.name"
          custom-size="40px"
        >
        </ProfileAvatar>

        <IonLabel>
          <p class="ion-no-margin">
            <span style="color: #787486; font-weight: 400">
              #{{ order.id }}
            </span>
          </p>
          <IonText class="font-medium">
            <IonChip :color="getStatusInfo(order.order_status_id)?.color">{{
              order.order_status?.name || "Pending"
            }}</IonChip>
          </IonText>
        </IonLabel>
        <IonText> {{ filters.date(order.created_at, "short") }}</IonText>
      </IonItem>
    </IonList>
  </section>
</template>
<script lang="ts" setup>
import { IonList, IonText, IonItem, IonChip, IonLabel } from "@ionic/vue";
import { PropType } from "vue";
import { useRoute } from "vue-router";
import { Order } from "@/models/Order";
import filters from "@/utilities/Filters";
import ProfileAvatar from "../../ProfileAvatar.vue";

const props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
    default: () => [],
  },
});

const route = useRoute();

const getStatusInfo = (orderStatusId?: number) => {
  switch (orderStatusId) {
    case 1:
      return {
        color: "secondary",
        label: "Processing",
      };
    case 2:
    case 4:
    case 5:
    case 6:
      return {
        color: "primary",
        label: "Pending",
      };
    case 3:
    case 7:
      return {
        color: "success",
        label: "Completed",
      };
    case 8:
    case 9:
    case 10:
      return {
        color: "danger",
        label: "Cancelled",
      };
    default:
      return {
        color: "medium",
        label: "Default",
      };
  }
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
    font-weight: 500;
    color: #111;
  }
}
.no-records {
  ion-text {
    font-size: 12px;
    color: #787486 !important;
  }
}
</style>
