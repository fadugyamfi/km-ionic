<template>
  <IonList lines="full">
    <NoResults v-if="agentRequests?.length == 0"></NoResults>
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
import NoResults from "@/components/layout/NoResults.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  props: {
    agentRequests: {
      type: Array as PropType<AgentRequest[] | null>,
      required: true,
    },
  },

  components: {
    IonList,
    Image,
    AgentRequestListItem,
    NoResults,
  },

  computed: {
    ...mapStores(useRequestStore, useToastStore, useUserStore),
  },

  data() {
    return {
      openPopover: -1,
      showConfirmDeleteModal: false,
      showConfirm: false,
    };
  },

  methods: {
    viewDetails(request: AgentRequest) {
      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.push(`/agent/request/${request.id}/details`);
        return;
      }
      this.$router.push(
        `/profile/company/sale-agents/${request.id}/agent-request`
      );
    },
  },
});
</script>
<style scoped lang="scss"></style>
