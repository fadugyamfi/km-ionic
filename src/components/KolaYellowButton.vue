<template>
  <IonButton expand="block" class="kola-yellow-button" :type="type">
    <slot></slot>
  </IonButton>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: ["type"],

  components: {
    IonButton,
  },
});
</script>

<style scoped lang="css">
.kola-yellow-button {
  --background: #f5aa29 !important;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --color: #101828;
  --border-radius: 0.8em;
  --box-shadow: none;
  text-transform: none;
  font-weight: 600;
  font-size: 0.75em;
}
</style>
