<template>
  <section v-if="!hideProductUnitSelector" class="w-100">
    <ion-segment
      :value="initialProductUnitId"
      mode="ios"
      @ion-change="selectProductUnit"
    >
      <ion-segment-button :value="1">
        <ion-label>{{ $t("general.units.case") }}</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="2">
        <ion-label>{{ $t("general.units.pieces") }}</ion-label>
      </ion-segment-button>
    </ion-segment>
  </section>
  <section
    class="quantity-selector d-flex ion-align-items-center ion-justify-content-center"
  >
    <IonButton fill="clear" size="small" @click="decreaseQuantity()">
      <IonIcon slot="icon-only" :icon="remove" color="dark"></IonIcon>
    </IonButton>
    <IonInput
      v-model="quantity"
      type="number"
      fill="outline"
      @ion-blur="updateQuantity()"
    ></IonInput>
    <IonButton
      fill="clear"
      size="small"
      @click="increaseQuantity()"
      :disabled="maxReached"
    >
      <IonIcon slot="icon-only" :icon="add" color="dark"></IonIcon>
    </IonButton>
  </section>
</template>

<script lang="ts">
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add, remove } from "ionicons/icons";

export default defineComponent({
  components: {
    IonItem,
    IonButton,
    IonInput,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },

  data() {
    return {
      add,
      remove,
      quantity: 1,
      productUnit: this.initialProductUnitId,
    };
  },

  props: {
    initialQuantity: {
      default: 1,
      type: Number,
    },
    initialProductUnitId: {
      default: 1,
      type: Number,
    },
    hideProductUnitSelector: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 0,
    },
    groupQuantity: {
      type: Number,
      default: 0,
    },
  },

  emits: ["change", "onselectProductUnit"],

  mounted() {
    this.quantity = this.initialQuantity;
  },

  computed: {
    maxReached() {
      if (this.max > 0) {
        if (this.productUnit == 1) {
          return this.quantity >= this.max;
        } else {
          return this.quantity >= this.max * this.groupQuantity;
        }
      }
      return false;
    },
  },

  methods: {
    decreaseQuantity() {
      if (this.quantity == 1) {
        return;
      }

      --this.quantity;
      this.$emit("change", this.quantity);
    },

    increaseQuantity() {
      if (this.quantity >= 1000) {
        return;
      }

      ++this.quantity;
      this.$emit("change", this.quantity);
    },

    updateQuantity() {
      if (this.maxReached) {
        if (this.productUnit == 1) {
          this.quantity = this.max;
        } else {
          this.quantity = this.max * this.groupQuantity;
        }
      }
      this.$emit("change", +this.quantity);
    },
    selectProductUnit(event: CustomEvent) {
      this.productUnit = event.detail.value;
      if (this.maxReached) {
        this.quantity = 1;
        this.$emit("change", this.quantity);
      }
      this.$emit("onselectProductUnit", event.detail.value);
    },
  },
  watch: {
    initialQuantity(newQuantity) {
      this.quantity = newQuantity;
    },
  },
});
</script>

<style scoped lang="scss">
ion-segment {
  width: 100% !important;
  margin-top: 10px;
  ion-segment-button {
    padding: 0px;
  }
}

.quantity-selector {
  width: auto !important;
  min-width: 128px !important;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin: 10px 0px;
  height: 40px !important;

  ion-input {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    // width: 30%;
    width: 48px;
    min-height: 40px !important;
    margin: 0px;
    --border-color: #f1f1f1;
    --border-radius: 0px;
    --highlight-color-focused: #ffd68f;
  }
  ion-button {
    padding: 8px;
  }
}
</style>
