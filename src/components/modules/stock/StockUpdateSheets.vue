<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5]">
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        Update Stock
      </header>
      <main class="ion-padding-vertical">
        <section>
          <IonItem @click="toggleQuantitySelector" lines="none">
            <IonLabel>Select quantity</IonLabel>
            <IonIcon slot="end" size="small" :icon="chevronDownOutline"></IonIcon>
          </IonItem>
          <ProductQuantitySelector v-if="showQuantitySelector" />
        </section>
        <IonSelect
          class="stock-input ion-margin-top"
          label="Select size"
          :class="{
            'ion-invalid ion-touched': form.errors.product_variation,
          }"
          fill="outline"
          v-model="form.fields.product_variation"
          required
          name="select-size"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption></IonSelectOption>
        </IonSelect>
        <IonSelect
          class="stock-input ion-margin-top"
          label="Select color"
          :class="{
            'ion-invalid ion-touched': form.errors.product_color,
          }"
          fill="outline"
          v-model="form.fields.product_color"
          required
          name="select-color"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption></IonSelectOption>
        </IonSelect>
      </main>
      <footer>
        <KolaYellowButton @click="update()"> Save changes </KolaYellowButton>
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
  IonRow,
  IonSelect,
  IonList,
  IonItem,
  IonIcon,
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { chevronDownOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import ProductQuantitySelector from "../products/ProductQuantitySelector.vue";

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
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonIcon,
    ProductQuantitySelector,
  },

  data() {
    return {
      chevronDownOutline,
      showQuantitySelector: false,
      form: useForm({
        group_quantity: "",
        product_variation: "",
        product_color: "",
      }),
    };
  },

  emits: ["update"],

  methods: {
    update() {
      this.$el.dismiss();
      this.$emit("update", this.form);
    },
    toggleQuantitySelector() {
      this.showQuantitySelector = !this.showQuantitySelector;
    },
  }
});
</script>

<style lang="scss" scoped>
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
.stock-input {
  --border-radius: 8px;
  --border-color: #d0d5dd;
  &.select-fill-clear,
  .input-wrapper,
  .textarea-wrapper {
    border-radius: 1px solid #000;
    .label-text-wrapper {
      color: #74787c;
    }
    .native-wrapper {
      color: #000;
    }
  }
  &::part(label) {
    color: #74787c;
  }

  .input-highlight,
  .select-highlight,
  .textarea-highlight {
    display: none !important;
  }

  .input-wrapper,
  .select-wrapper,
  .textarea-wrapper {
    border: solid 1px var(--border-color);
    border-radius: 8px !important;
    overflow: hidden;
  }

  &.select-label-placement-stacked {
    border: solid 1px var(--border-color);
    border-radius: 8px !important;
    overflow: hidden;
    --padding-start: 10px;
    --padding-end: 10px;
  }
}
ion-item {
  --border-radius: 8px;
  --border-color: #d0d5dd;
  --border-style: solid;
  --border-width: 1px;
  --color: #74787c;
  margin-bottom: 5px;
}
</style>
