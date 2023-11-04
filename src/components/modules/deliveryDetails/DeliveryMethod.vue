<template>
  <section class="wrapper ion-padding ion-margin-bottom">
    <ion-radio-group v-model="selectedDelivery">
      <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
        <IonText class="fw-semibold">Standard Delivery</IonText>
        <section class="d-flex ion-align-items-center">
          <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
          <ion-radio value="standard"></ion-radio>
        </section>
      </section>
      <section class="d-flex flex-column">
        <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
          <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon>{{ location || "Not available" }}
        </IonText>
        <IonText color="medium" class="font-medium" style="margin-bottom: 8px">
          <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon>{{ deliveryDate || "Not available" }}
        </IonText>
      </section>
    </ion-radio-group>
  </section>
  <section class="wrapper ion-padding">
    <ion-radio-group v-model="selectedDelivery">
      <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
        <IonText class="fw-semibold">Express Delivery</IonText>
        <section class="d-flex ion-align-items-center">
          <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
          <ion-radio value="express"></ion-radio>
        </section>
      </section>
      <section class="d-flex flex-column">
        <IonText color="medium" class="font-medium" style="margin-bottom: 8px">Want to speed up delivery and receive your
          order today? We can do
          that for you
        </IonText>
      </section>
    </ion-radio-group>
  </section>
</template>

<script setup>
import { locationOutline, timeOutline } from "ionicons/icons";
import { IonIcon, IonText, IonRadio, IonRadioGroup } from "@ionic/vue";
import { ref }  from "vue";
const selectedDelivery = ref("standard");

const props = defineProps(['location', 'deliveryDate',]);

</script>

<style scoped>
.wrapper {
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 24px 0px rgba(105, 111, 130, 0.1);
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
