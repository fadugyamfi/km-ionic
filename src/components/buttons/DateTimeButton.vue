<template>
  <ion-datetime-button datetime="datetime"></ion-datetime-button>

  <ion-modal :keep-contents-mounted="true">
    <ion-datetime
      id="datetime"
      :value="modelValue"
      :format-options="formatOptions"
      :min="minDate"
      :max="maxDate"
      @ion-change="handleDateChange"
    ></ion-datetime>
  </ion-modal>
</template>

<script lang="ts">
import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonDatetime, IonDatetimeButton, IonModal },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      formatOptions: {
        date: {
          weekday: "long",
          month: "long",
          day: "2-digit",
        },
        time: {
          hour: "2-digit",
          minute: "2-digit",
        },
      } as any,
    };
  },
  computed: {
    minDate() {
      return this.min ? new Date(this.min).toISOString() : '';
    },
    maxDate() {
      return this.max ? new Date(this.max).toISOString() : '';
    },
  },
  methods: {
    handleDateChange(event: any) {
      this.$emit("update:modelValue", event.detail.value);
    },
  },
});
</script>

<style lang="scss" scoped>
ion-datetime-button {
  display: flex;
  justify-content: start;
}
</style>
