<template>
  <IonModal ref="modal" :initial-breakpoint="0.75" :breakpoints="[0, 0.5, 0.75]">
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        {{ $t("profile.stock.updateStock") }}
      </header>
      <main class="ion-padding-vertical">
        <section class="ion-margin-bottom">
          <IonItem lines="none">
            <IonInput :label="`Price (${product?.currency?.symbol || 'GHS'})`" placeholder="0.00" v-model="form.fields.product_price"></IonInput>
          </IonItem>
        </section>
        <section>
          <IonItem @click="toggleQuantitySelector" lines="none">
            <IonLabel>Select quantity</IonLabel>
            <IonIcon
              v-if="showQuantitySelector"
              slot="end"
              size="small"
              :icon="chevronUpOutline"
            ></IonIcon>
            <IonIcon
              v-if="!showQuantitySelector"
              slot="end"
              size="small"
              :icon="chevronDownOutline"
            ></IonIcon>
          </IonItem>
          <ProductQuantitySelector
            :initial-quantity="product?.stock_quantity"
            @change="updateProductQuantity($event)"
            v-if="showQuantitySelector"
          />
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
          <IonSelectOption
            v-for="variation in productVariations"
            :key="variation.id"
            :value="variation.id"
            >{{ variation.name }}</IonSelectOption
          >
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
          <IonSelectOption
            v-for="variation in productVariations"
            :key="variation.id"
            :value="variation.id"
            >{{ variation.name }}</IonSelectOption
          >
        </IonSelect>
      </main>
      <footer>
        <KolaYellowButton @click="update()">{{
          $t("profile.stock.saveChanges")
        }}</KolaYellowButton>
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
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import ProductQuantitySelector from "../products/ProductQuantitySelector.vue";
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
      chevronUpOutline,
      showQuantitySelector: true,
      form: useForm({
        product_price: 0,
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
      this.$emit("update", this.form.fields);
    },

    toggleQuantitySelector() {
      this.showQuantitySelector = !this.showQuantitySelector;
    },
    updateProductQuantity(quantity: number) {
      this.form.fields.stock_quantity = quantity;
    },
  },

  mounted() {
    this.form.fields.product_price = this.product?.product_price;
    this.form.fields.stock_quantity = this.product?.stock_quantity;
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
  // --padding-start: 0.4em;
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
  --border-radius: 8px;
  --border-color: #d0d5dd;
  --border-style: solid;
  --border-width: 1px;
  --color: #74787c;
  margin-bottom: 5px;
}
</style>
