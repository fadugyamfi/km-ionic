<template>
  <section style="margin-top: 10px">
    <ion-radio-group v-model="selectedDelivery">
      <section style="margin-left: 16px; margin-top: 24px">
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold">Standard Delivery</IonText>
          <section
            class="d-flex ion-justify-content-between ion-align-items-center"
          >
            <IonText
              class="fw-semibold d-flex ion-justify-content-between ion-align-items-center"
              style="margin-right: 16px"
            >
              {{ Filters.currency(0, "GHS") }}
            </IonText>
            <ion-radio value="standard"> </ion-radio>
          </section>
        </section>
        <section class="d-flex flex-column">
          <IonText
            color="medium"
            class="font-medium d-flex ion-align-items-center"
            style="margin-bottom: 8px"
          >
            <IonIcon :icon="locationOutline" style="margin-right: 6px"></IonIcon
            >{{ location || "Not available" }}
          </IonText>
          <IonText
            color="medium"
            class="font-medium d-flex ion-align-items-center"
            style="margin-bottom: 8px"
          >
            <IonIcon :icon="timeOutline" style="margin-right: 6px"></IonIcon>
            {{ deliveryDate || "Not available" }}
          </IonText>
        </section>
      </section>
      <section style="margin-left: 16px; margin-top: 24px">
        <section
          class="d-flex ion-justify-content-between ion-align-items-center"
          style="margin-bottom: 8px"
        >
          <IonText class="fw-semibold" style="margin-right: 5px"
            >Express Delivery</IonText
          >
          <section
            class="d-flex ion-justify-content-between ion-align-items-center"
          >
            <IonText class="fw-semibold" style="margin-right: 16px">
              {{ Filters.currency(0, "GHS") }}
            </IonText>
            <ion-radio value="express"> </ion-radio>
          </section>
        </section>
        <section>
          <IonText color="medium" class="font-medium" style="margin-bottom: 8px"
            >Want to speed up delivery and receive <br />
            your order today? We can do that for you
          </IonText>
        </section>
      </section>
    </ion-radio-group>
  </section>
</template>

<script setup lang="ts">
import { locationOutline, timeOutline } from "ionicons/icons";
import { IonIcon, IonText, IonRadio, IonRadioGroup } from "@ionic/vue";
import { ref, watch } from "vue";
import Filters from "@/utilities/Filters";

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
  margin-bottom: 4px;
  box-shadow: 0px 4px 24px 0px rgba(105, 111, 130, 0.1);
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
