<template>
  <section style="margin-top: 10px">
    <IonItem lines="none" @click="selectedDeliveryMethod('standard')">
      <IonLabel class="ion-no-margin">
        <p class="ion-no-margin" style="margin-bottom: 8px">
          Standard Delivery
        </p>
        <IonText
          color="medium"
          class="font-medium location"
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
      </IonLabel>
      <div class="d-flex metadata-end-wrapper" slot="end">
        <IonCheckbox
          aria-label="standard-delivery"
          justify="end"
          mode="ios"
          value="standard"
          :checked="selectedDelivery == 'standard'"
        >
          <p class="fw-semibold">
            <!-- {{ Filters.currency(0, "GHS") }} -->
            Price TBD
          </p>
        </IonCheckbox>
      </div>
    </IonItem>
    <IonItem lines="none" @click="selectedDeliveryMethod('express')">
      <IonLabel class="ion-no-margin">
        <p class="ion-no-margin" style="margin-bottom: 8px">Express Delivery</p>
        <IonText color="medium" class="font-medium">
          Want to speed up delivery and receive your order today? We can do that
          for you
        </IonText>
      </IonLabel>
      <div class="d-flex metadata-end-wrapper" slot="end">
        <IonCheckbox
          aria-label="express-delivery"
          justify="end"
          mode="ios"
          value="standard"
          :checked="selectedDelivery == 'express'"
        >
          <p class="fw-semibold">
            <!-- {{ Filters.currency(0, "GHS") }} -->
            Price TBD
          </p></IonCheckbox
        >
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
const selectedDelivery = ref("standard");

const props = defineProps(["location", "deliveryDate"]);

const selectedDeliveryMethod = (method: string) => {
  selectedDelivery.value = method;
};

watch(selectedDelivery, (newValue) => {
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
        width: 90%;
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
      margin: 0px;
      font-size: 14px;
    }
  }
}
</style>
