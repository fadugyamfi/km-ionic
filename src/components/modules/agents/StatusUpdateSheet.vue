<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5]">
    <IonContent>
      <header class="fw-semibold ion-padding ion-text-center">
        {{ title }}
      </header>
      <main class="ion-padding">
        <section
          v-if="statusId == RequestStatus.PLACED"
          class="sales-select-list"
          style="margin-bottom: 24px"
        >
          <h6>Set Estimated Delivery Date</h6>
          <DateTimeButton
            v-model="form.fields.est_delivery_at"
            :min="currentDate"
          ></DateTimeButton>
        </section>
        <section
          v-if="title.includes('Delivered')"
          class="sales-select-list"
          style="margin-bottom: 20px"
        >
          <h6>Set Actual Delivery Date</h6>
          <DateTimeButton
            v-model="form.fields.actual_delivery_at"
            :max="currentDate"
          ></DateTimeButton>
        </section>
        <IonTextarea
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.comment,
          }"
          :label="$t('Comment')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.comment"
          name="Enter a comment(optional)"
          @ion-input="form.validate($event)"
        ></IonTextarea>
      </main>
      <footer class="ion-padding">
        <KolaYellowButton @click="confirm()">
          {{ $t("Confirm") }}
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonInput,
  IonLabel,
  IonModal,
  IonTextarea,
  IonRow,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useForm } from "@/composables/form";
import DateTimeButton from "@/components/buttons/DateTimeButton.vue";
import { formatMySQLDateTime } from "@/utilities";
import AgentRequest from "@/models/AgentRequest";
import { RequestStatus } from "@/stores/AgentsStore";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    DateTimeButton,
    IonTextarea,
  },

  data() {
    return {
      form: useForm({
        est_delivery_at: new Date().toISOString(),
        actual_delivery_at: new Date().toISOString(),
        comment: "",
      }),
      RequestStatus,
    };
  },

  emits: ["confirm"],

  props: {
    title: {
      type: String,
      default: "",
    },
    request: {
      type: Object as PropType<AgentRequest | null>,
      default: () => ({}),
    },
  },

  computed: {
    currentDate() {
      return formatMySQLDateTime(new Date().toISOString());
    },

    statusId() {
      return this.request?.agent_request_status?.id;
    },
  },

  methods: {
    formatMySQLDateTime,
    confirm() {
      this.$el.dismiss();
      this.$emit("confirm", this.form.fields);
    },
  },
});
</script>

<style scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}

ion-input {
  --padding-start: 0.4em;
  --padding-end: 0.4em;
}

h6 {
  font-size: 14px;
}
</style>
