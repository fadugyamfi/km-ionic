<template>
  <section class="ion-no-border ion-padding-top tags" v-if="tags.length > 0">
    <IonText v-for="tag in tags" :key="tag.id" class="tag">
      {{ tag.name }}
    </IonText>
  </section>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue";
import { IonText } from "@ionic/vue";

const props = defineProps({
  tags: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
.tag {
  padding: 6px 8px;
  border-radius: 4px;
  background: #f0f9ff;
  font-size: 10px;
  color: #036;
  margin-right: 6px;
}

.tags {
  border-top: 1px solid #F1F1F1;
}
</style>
