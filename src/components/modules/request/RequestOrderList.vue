<template>
  <IonList lines="full">
    <RequestOrderListItem
      v-for="request in agentRequests"
      :key="request?.id"
      :request="request"
      @click="viewDetails(request)"
    >
    </RequestOrderListItem>
  </IonList>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  IonAvatar,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonContent,
  IonSkeletonText,
  IonButton,
  IonChip,
  IonText,
} from "@ionic/vue";
import {
  chatbubbleOutline,
  checkmark,
  closeCircleOutline,
  ellipsisHorizontal,
  trashOutline,
} from "ionicons/icons";
import { useRequestStore } from "@/stores/RequestStore";
import { Order } from "@/models/Order";
import { mapStores } from "pinia";
import filters from "@/utilities/Filters";
import Image from "@/components/Image.vue";
import RequestOrderListItem from "@/components/modules/request/RequestOrderListItem.vue";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";

export default defineComponent({
  props: {
    agentRequests: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },

  components: {
    IonAvatar,
    IonBadge,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPopover,
    IonContent,
    IonSkeletonText,
    IonButton,
    IonChip,
    IonText,
    Image,
    RequestOrderListItem,
  },

  computed: {
    ...mapStores(useRequestStore, useToastStore),
  },

  data() {
    return {
      chatbubbleOutline,
      closeCircleOutline,
      ellipsisHorizontal,
      trashOutline,
      checkmark,
      openPopover: -1,
      selectedOrder: null as Order | null,
      showConfirmDeleteModal: false,
      showConfirm: false,

      actionOrder: null as Order | null,
      filters,
    };
  },

  methods: {
    viewDetails(request: { id: number }) {
      this.$router.push(`/agent/request/${request.id}`);
    },
  },
});
</script>
<style scoped lang="scss">
.order-list {
  --padding: 10px;
  --border-radius: 20px;
  --background: #fff;
  justify-content: center;
}

.item {
  --align-content: center;
  --justify-content: center;
  --align-items: center;
}

.badge {
  align-content: center;
  justify-content: center;
}

ion-popover {
  ion-item {
    font-size: 0.9em;
  }
}
</style>
