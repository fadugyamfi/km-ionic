<template>
  <IonButton
    expand="block"
    class="kola-default-button"
    :class="{ 'light-blue': color == 'light-blue' }"
    :type="type"
  >
    <slot></slot>
  </IonButton>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: ["type", "color"],

  components: {
    IonButton,
  },
});
</script>

<style scoped lang="scss">
.kola-default-button {
  --background: #007af5 !important;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --color: #fff;
  --border-radius: 0.8em;
  --box-shadow: 0px -2px 2px 0px #0052a3 inset;

  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;

  &.light-blue {
    --background: #e0f0ff !important;
    --color: #003366;
    --box-shadow: 0px -2px 2px 0px #007af53d inset;
  }
}
</style>
