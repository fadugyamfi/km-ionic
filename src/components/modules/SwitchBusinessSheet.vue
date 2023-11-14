<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5]">
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        Switch Business
      </header>
      <main class="ion-padding-vertical">
        <ion-list>
          <ion-item>
            <ion-toggle mode="ios" >Ecotel Distribution</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle  mode="ios" >NKB Enterprise</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle  mode="ios" >Naa Trading Enterprise</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle  mode="ios" >Sterling Ventures</ion-toggle>
          </ion-item>
        </ion-list>
      </main>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonContent,
  IonToggle,
  IonModal,
  IonRow,
  IonSelect,
  IonList,
  IonItem,
  IonIcon,
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import Stock from "@/models/Stock";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Stock | null>,
      default: true,
    },
    productVariations: {
      type: Array as PropType<any>,
      default: true,
    },
  },
  components: {
    IonModal,
    IonContent,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonIcon,
    IonToggle,
  },

  data() {
    return {
      chevronDownOutline,
      chevronUpOutline,
      showQuantitySelector: true,
      form: useForm({
        stock_quantity: "",
        product_variation: "",
        product_color: "",
      }),
    };
  },

  emits: ["update"],

  methods: {
    update() {
      this.$el.dismiss();
      console.log(this.form.fields);
      this.$emit("update", this.form.fields);
    },

    toggleQuantitySelector() {
      this.showQuantitySelector = !this.showQuantitySelector;
    },
    updateProductQuantity(quantity: number) {
      this.form.fields.stock_quantity = quantity;
    },
  },
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
  &.select-fill-outline {
    color: #74787c;
  }
}
ion-item {
  --color: #74787c;
  margin-bottom: 5px;
}

ion-toggle {
  --track-background-checked: #f5aa29;
  --handle-background-checked: #fff;
  
}
</style>
