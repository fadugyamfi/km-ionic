<template>
  <section class="star">
    <IonImg src="/images/Star2.svg"></IonImg>
    <h6 class="ion-no-margin">{{ position }}</h6>
  </section>
</template>
<script setup lang="ts">
import { IonImg } from "@ionic/vue";

const props = defineProps({
  position: {
    type: Number,
    default: true,
  },
//   src: {
//     type: String,
//     default: true,
//   },
});
</script>
<style lang="scss" scoped>
.star {
  position: relative;

  h6 {
    position: absolute;
    top: 9px;
    left: 9px;
    font-size: 10px;
    font-weight: 700;
    line-height: 12px; /* 120% */
  }
}
</style>
