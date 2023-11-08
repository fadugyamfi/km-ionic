<template>
  <section>
    <ion-card>
      <ion-radio-group v-model="selectedOptionPayNow">
        <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
          <IonText class="fw-semibold">Pay Now</IonText>
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold ion-margin-end"></IonText>
            <ion-radio value="payNow"></ion-radio>
          </section>
        </section>
        <section class="d-flex flex-column">
          <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
            <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>1% Discount Per Box
          </IonText>
          <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
            <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon>Guaranteed 3-Day Delivery
          </IonText>
        </section>
      </ion-radio-group>
    </ion-card>

    <ion-card>
      <ion-radio-group v-model="selectedOptionPayOnDelivery">
        <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
          <IonText class="fw-semibold">Pay on Delivery</IonText>
          <section class="d-flex ion-align-items-center">
            <ion-radio value="payOnDelivery"></ion-radio>
          </section>
        </section>
        <section class="d-flex flex-column">
          <IonText color="medium" class="font-medium" style="margin-bottom: 8px">Standard Pricing</IonText>
        </section>
      </ion-radio-group>
    </ion-card>
  </section>
</template>

<script setup lang="ts">
import { locationOutline, timeOutline } from "ionicons/icons";
import { IonText, IonRadioGroup } from "@ionic/vue";
import { ref, watch } from "vue";

const selectedOptionPayNow = ref(null);
const selectedOptionPayOnDelivery = ref(null);

watch(selectedOptionPayNow, (newValue) => {
  if (newValue === "payNow") {
    selectedOptionPayOnDelivery.value = null;
  }
});

watch(selectedOptionPayOnDelivery, (newValue) => {
  if (newValue === "payOnDelivery") {
    selectedOptionPayNow.value = null;
  }
});
</script>

<style scoped>
ion-card {
  margin: 6px;
  padding: 9px;
}

ion-radio::part(container) {
  width: 18px;
  height: 18px;

  border-radius: 20px;
  border: 1.5px solid #e7eaec;
}

ion-radio::part(mark) {
  background: none;
  transition: none;
  transform: none;
  border-radius: 0;
}

ion-radio.radio-checked::part(container) {
  background: #21d187;
  border-color: transparent;
}

ion-radio.radio-checked::part(mark) {
  width: 6px;
  height: 9px;

  border-width: 0px 2px 2px 0px;
  border-style: solid;
  border-color: #fff;

  transform: rotate(45deg);
}
</style>
