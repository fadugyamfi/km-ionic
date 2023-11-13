<template>
  <section class="chips">
    <IonChip
      class="chip"
      :class="{ active: selectedCategory?.id == category.id }"
    >
      <IonLabel class="label">
        {{ category.name }}
      </IonLabel>
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
  selectedCategory: {
    required: false,
    type: Object,
  },
});
</script>
<style lang="scss" scoped>
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
.active {
  background: #eff8ff;
  .label {
    color: #003366;
  }
}
</style>
