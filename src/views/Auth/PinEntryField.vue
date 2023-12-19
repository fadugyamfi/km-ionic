<template>
  <div class="kola-input-item">
    <IonItem
      lines="none"
      :class="{ 'ion-invalid ion-touched': form.errors[name] }"
    >
      <IonInput
        ref="pin"
        :class="{ 'ion-invalid ion-touched': form.errors[name] }"
        :label="label"
        labelPlacement="stacked"
        v-model="form.fields[name]"
        :type="pinVisible ? 'number' : 'password'"
        :maxlength="4"
        :name="name"
        @ion-input="onInput($event)"
        required
      ></IonInput>
      <IonButton slot="end" fill="clear" class="ion-no-margin" color="medium" @click="pinVisible = !pinVisible">
        <IonIcon slot="icon-only" :icon="pinVisible ? eye : eyeOff"></IonIcon>
      </IonButton>
    </IonItem>
  </div>
</template>

<script lang="ts">
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/vue";
import { eye, eyeOff } from "ionicons/icons";
import { defineComponent } from "vue";
import { useForm } from "@/composables/form";

export default defineComponent({
  props: ["modelValue", "name", "label", "model"],

  components: {
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
  },

  emits: ["update:modelValue"],

  data() {
    return {
      eye,
      eyeOff,
      pinVisible: false,
      form: useForm({
        [this.name]: "",
      }),
    };
  },

  methods: {
    onInput(event: Event) {
      this.form.validate(event);
      this.$emit("update:modelValue", this.form.fields[this.name]);
    },
    clearForm() {
      this.form.fields[this.name] = "";
    },
  },
});
</script>
