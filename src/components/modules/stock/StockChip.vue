<template>
  <section class="chips">
    <IonChip class="chip">
      <IonLabel class="label"> {{ category.name }} </IonLabel>
    </IonChip>
  </section>
</template>
<script setup lang="ts">
import { IonChip, IonLabel } from "@ionic/vue";
import ProductCategory from "@/models/ProductCategory";

const props = defineProps({
  category: {
    required: true,
    type: Object,
  },
});
</script>
<style scoped>
.chip {
  border-radius: 16px;
  background: var(--gray-100, #f2f4f7);
}
.label {
  color: rgba(52, 64, 84, 1);
  text-align: center;
  font-weight: 500;
  line-height: 20px;
}
</style>
