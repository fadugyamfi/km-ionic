<template>
  <IonList lines="full">
    <EmptyRequest v-if="request?.value?.length < 1"></EmptyRequest>

    <AgentRequestListItem
      v-else
      v-for="request in agentRequests"
      :key="request?.id"
      :request="request"
      @click="viewDetails(request)"
    >
    </AgentRequestListItem>
  </IonList>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonList } from "@ionic/vue";

import { useRequestStore } from "@/stores/RequestStore";
import { mapStores } from "pinia";
import Image from "@/components/Image.vue";
import AgentRequestListItem from "@/components/modules/agents/AgentRequestListItem.vue";
import { useToastStore } from "@/stores/ToastStore";
import AgentRequest from "@/models/AgentRequest";
import EmptyRequest from "@/components/modules/agents/EmptyRequest.vue";

export default defineComponent({
  props: {
    agentRequests: {
      type: Array as PropType<AgentRequest[] | null[]>,
      required: true,
    },
  },

  components: {
    IonList,
    Image,
    AgentRequestListItem,
    EmptyRequest,
  },

  computed: {
    ...mapStores(useRequestStore, useToastStore),
  },

  data() {
    return {
      openPopover: -1,
      showConfirmDeleteModal: false,
      showConfirm: false,
    };
  },

  methods: {
    viewDetails(request: { id: number }) {
      this.$router.push(
        `/profile/company/sale-agents/${request.id}/agent-request`
      );
    },
  },
});
</script>
<style scoped lang="scss"></style>
