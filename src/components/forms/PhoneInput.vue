<template>
  <input
    type="tel"
    ref="phone-input"
    class="form-control phone-input kola-input"
    :class="classes"
    placeholder="020 000 0000"
    :value="modelValue"
    @change="onChange()"
  />
</template>

<script lang="ts">
// global intlTelInputUtils

import { defineComponent } from "vue";
import intlTelInput from "intl-tel-input";

let intlInput: any = null;

export default defineComponent({
  props: {
    modelValue: { required: false },
    output: { required: false, default: "intl" },
    classes: { required: false },
  },

  emits: ["update:modelValue"],

  methods: {
    onChange() {
      const intlNumber = intlInput.getNumber();
      const nationalNumber = intlInput.getNumber(
        intlTelInputUtils.numberFormat.NATIONAL
      );
      const country = intlInput.getSelectedCountryData();
      const loginNumber = country.dialCode + nationalNumber.replaceAll(" ", "");

      if (this.output === "login") {
        this.$emit("update:modelValue", loginNumber);
        return;
      }

      if (this.output === "national") {
        this.$emit("update:modelValue", nationalNumber);
        return;
      }

      this.$emit("update:modelValue", intlNumber);
    },
  },

  mounted() {
    intlInput = intlTelInput(this.$el, {
      initialCountry: "GH",
      preferredCountries: ["GH", "NG"],
      separateDialCode: false,
      utilsScript: "vendor/intl-tel-input/build/js/utils.js",
    });
  },
});
</script>

<style lang="scss">
.iti {
  color: #000;
  width: 100%;

  .phone-input {
    background: #f6f6f6;
    color: #74787c;
    border: solid 1px #e7e6e6;
    border-radius: 4px;
    padding: 10px 30px;
    padding-left: 60px;
    width: 100%;
    min-height: 56px;
    border: solid 1px #ccc;
    border-radius: 8px;
  }

  &:focus {
    border-color: #74787c;
  }
}
.iti-mobile .iti--container {
  top: 50px;
  /* bottom: 50%; */
  left: 0;
  right: 0;
  position: absolute;
  max-width: 358px;
  margin: 0 auto;
  width: 100%;
}
</style>
