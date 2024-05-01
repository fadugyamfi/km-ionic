<template>
  <section v-if="!hideProductUnitSelector">
    <ion-segment :value="initialProductUnitId" mode="ios" @ion-change="selectProductUnit">
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
      @ion-input="updateQuantity()"
      @ion-blur="updateQuantity()"
    ></IonInput>

    <IonButton fill="clear" size="small" @click="increaseQuantity()">
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
      quantity: 0,
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
      default: false
    }
  },

  emits: ["change", "onselectProductUnit"],

  mounted() {
    this.quantity = this.initialQuantity;
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
      console.log(this.quantity);
      this.$emit("change", this.quantity);
    },

    updateQuantity() {
      this.$emit("change", +this.quantity);
    },
    selectProductUnit(event: CustomEvent) {
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
  margin-top: 10px;
  ion-segment-button {
    padding: 0px;
  }
}

.quantity-selector {
  background-color: #f5f5f5;
  border: none;
  border-radius: 12px;
  margin: 10px 0px;
  padding: 5px 10px;

  ion-input {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    width: 30%;
    min-height: 32px !important;
    height: 32px;
    border-radius: 8px;
    margin: 0px 15px;
  }
}
</style>
