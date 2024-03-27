<template>
  <IonItem :button="true">
    <ProfileAvatar
      slot="start"
      class="ion-align-self-start ion-margin-top"
      :image="order.business?.logo"
      :username="order.business?.name"
    ></ProfileAvatar>

    <IonLabel>
      <p>
        <IonText color="dark">{{ order.business?.name }}</IonText>
      </p>
      <p class="font-medium">
        <IonText color="medium">
          {{ filters.date(order.created_at as string, "short") }}
        </IonText>
        <!-- <span class="item-divider">|</span>
                <IonText color="medium">
                    {{ $tc('general.products', order.order_items_count as number, { count: order.order_items_count }) }}
                </IonText> -->
        <span class="item-divider">|</span>
        <IonText color="medium">
          {{
            filters.currency(
              order.total_order_amount as number,
              order.currency?.symbol as string
            )
          }}
        </IonText>
      </p>
      <p>
        <IonChip
          :color="getStatusInfo(order.order_status_id)?.color"
          class="font-medium"
        >
          {{ getStatusInfo(order.order_status_id)?.label }}
        </IonChip>
        <span v-if="order?.isPayNow()">
          <IonChip
            v-if="order?.order_status_id == 5"
            color="success"
            class="font-medium"
          >
            {{ "Paid" }}
          </IonChip>
          <IonChip
            v-if="order?.order_status_id == 11"
            color="warning"
            class="font-medium"
          >
            {{ "Payment Processing" }}
          </IonChip>

          <IonChip
            v-if="order?.amountOwed()"
            color="danger"
            class="font-medium"
          >
            {{ "Owing" }}
          </IonChip>
        </span>
      </p>
    </IonLabel>
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

<script lang="ts">
import {
  IonAvatar,
  IonButton,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import Image from "../../Image.vue";
import { Order } from "../../../models/Order";
import { ellipsisHorizontal } from "ionicons/icons";
import filters from "@/utilities/Filters";
import ProfileAvatar from "../../ProfileAvatar.vue";

export default defineComponent({
  props: {
    order: {
      required: true,
      type: Object as PropType<Order>,
    },
  },

  data() {
    return {
      ellipsisHorizontal,
      filters,
    };
  },
  components: {
    IonItem,
    IonAvatar,
    Image,
    IonLabel,
    IonText,
    IonChip,
    IonButton,
    IonIcon,
    ProfileAvatar,
  },

  emits: ["openMenu"],

  methods: {
    openMenu(event: CustomEvent) {
      this.$emit("openMenu", event);
    },

    getStatusInfo(orderStatusId?: number) {
      switch (orderStatusId) {
        case 1:
          return {
            color: "secondary",
            label: "New",
          };
        case 2:
        case 4:
        case 5:
        case 6:
          return {
            color: "primary",
            label: "Processing",
          };
        case 3:
          return {
            color: "success",
            label: "Approved",
          };
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
    },
  },
});
</script>

<style scoped>
.item-divider {
  margin: 0px 8px;
}
</style>
