<template>
  <ion-radio-group v-model="selectedDelivery">
    <ion-radio value="standard" class="wrapper ion-padding ion-margin-bottom">
      <section style="width: 100%">
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold" style="margin-right: 70px"
            >Standard Delivery</IonText
          >
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold ion-margin-end">GHS 10.00</IonText>
          </section>
        </section>
        <section class="d-flex flex-column">
          <IonText
            color="medium"
            class="font-medium"
            style="margin-bottom: 8px"
          >
            <IonIcon :icon="locationOutline" style="margin-right: 3px"></IonIcon
            >{{ location || "Not available" }}
          </IonText>
          <IonText
            color="medium"
            class="font-medium"
            style="margin-bottom: 8px"
          >
            <IonIcon :icon="timeOutline" style="margin-right: 3px"></IonIcon
            >{{ deliveryDate || "Not available" }}
          </IonText>
        </section>
      </section>
    </ion-radio>
    <ion-radio value="express" class="wrapper ion-padding ion-margin-bottom">
      <section>
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold" style="margin-right: 85px"
            >Express Delivery</IonText
          >
          <section class="d-flex ion-align-items-center">
            <IonText class="fw-semibold">GHS 10.00</IonText>
          </section>
        </section>
        <section>
          <IonText color="medium" class="font-medium" style="margin-bottom: 8px"
            >Want to speed up delivery and receive <br />
            your order today? We can do that for you
          </IonText>
        </section>
      </section>
    </ion-radio>
  </ion-radio-group>
</template>

<script setup>
import { locationOutline, timeOutline } from "ionicons/icons";
import { IonIcon, IonText, IonRadio, IonRadioGroup } from "@ionic/vue";
import { ref, watch } from "vue";

const emit = defineEmits();
const selectedDelivery = ref("standard");

const props = defineProps(["location", "deliveryDate"]);

watch(selectedDelivery, (newValue) => {
  if (newValue) {
    emit("onSelectDeliveryMethod", newValue);
  }
});
</script>

<style scoped>
.wrapper {
  background: #ffffff;
  border: solid 1px #f4f4f4;
  border-radius: 12px;
  margin-bottom: 0.5em;
  box-shadow: 0px 4px 12px 0px #696f821a;
  width: 100%;
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
