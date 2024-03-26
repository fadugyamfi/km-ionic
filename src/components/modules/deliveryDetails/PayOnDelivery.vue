<template>
  <section style="margin-top: 10px">
    <IonItem lines="none" @click="selectPaymentOption('pay-now')">
      <IonLabel class="ion-no-margin">
        <p class="ion-no-margin" style="margin-bottom: 8px">Pay now</p>
        <IonText
          color="medium"
          class="font-medium location"
          style="margin-bottom: 8px"
        >
          1% Discount Per Box
        </IonText>
        <IonText
          color="medium"
          class="font-medium d-flex ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonIcon :icon="timeOutline" style="margin-right: 6px"></IonIcon>
          Guaranteed 3-Day Delivery
        </IonText>
      </IonLabel>
      <div class="d-flex metadata-end-wrapper" slot="end">
        <IonCheckbox
          aria-label="standard-delivery"
          justify="end"
          mode="ios"
          value="pay-now"
          :checked="selectedPayment == 'pay-now'"
        ></IonCheckbox>
      </div>
    </IonItem>
    <IonItem lines="none" @click="selectPaymentOption('pay-on-delivery')">
      <IonLabel class="ion-no-margin">
        <p class="ion-no-margin" style="margin-bottom: 8px">Pay on Delivery</p>
        <IonText color="medium" class="font-medium"> Standard Pricing </IonText>
      </IonLabel>
      <div class="d-flex metadata-end-wrapper" slot="end">
        <IonCheckbox
          aria-label="express-delivery"
          justify="end"
          mode="ios"
          value="pay-on-delivery"
          :checked="selectedPayment == 'pay-on-delivery'"
        ></IonCheckbox>
      </div>
    </IonItem>
  </section>
</template>

<script setup lang="ts">
import { locationOutline, timeOutline } from "ionicons/icons";
import { IonIcon, IonText, IonItem, IonLabel, IonCheckbox } from "@ionic/vue";
import { ref, watch } from "vue";
import Filters from "@/utilities/Filters";

const emit = defineEmits();
const selectedPayment = ref("pay-now");

const props = defineProps(["location", "deliveryDate"]);

const selectPaymentOption = (method: string) => {
  selectedPayment.value = method;
};

watch(selectedPayment, (newValue) => {
  if (newValue) {
    emit("onSelectDeliveryMethod", newValue);
  }
});
</script>

<style lang="scss" scoped>
ion-item {
  --background: #ffffff;

  border: solid 1px #f4f4f4;
  border-radius: 12px;
  margin-bottom: 0.5em;
  box-shadow: 0px 4px 12px 0px #696f821a;

  &::part(native) {
    padding: 16px;
    --padding-start: 0px;
    --inner-padding-end: 0px;
  }

  ion-label {
    ion-text {
      &.location {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    line-height: 1em;

    p {
      font-weight: 500;
      color: #111;
    }
  }
  .metadata-end-wrapper {
    position: absolute;
    top: 0px;
    inset-inline-end: 10px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    p {
      margin: 0px 10px 0px 0px;
      font-size: 14px;
    }
  }
}
</style>
