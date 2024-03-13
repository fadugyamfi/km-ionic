<template>
  <IonInput
    class="kola-input"
    :label="label"
    labelPlacement="stacked"
    fill="solid"
    :value="modelValue"
    name="address"
    @ion-input="updateModelValue($event.target.value)"
    required
  ></IonInput>

  <ion-button
    fill="clear"
    size="small"
    style="text-transform: none"
    class="ion-margin-bottom use-location ion-text-start"
    @click="getLocation"
  >
    <ion-icon :icon="navigateOutline" style="margin-right: 5px"></ion-icon>
    {{ $t("signup.vendor.location.useCurrentLocation") }}
    <ion-spinner
      class="spinner"
      name="crescent"
      v-if="userStore.locationLoading"
    ></ion-spinner>
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, IonSpinner, IonInput } from "@ionic/vue";
import { navigateOutline } from "ionicons/icons";
import { useGeolocation } from "@/composables/useGeolocation";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "@/stores/UserStore";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: false },
});

const emit = defineEmits(["update:modelValue"]);

const toastStore = useToastStore();
const userStore = useUserStore();

const getLocation = async () => {
  const { getCurrentLocation, getDisplayName } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();
    const displayName = await getDisplayName(coordinates);

    if (displayName) {
      emit("update:modelValue", displayName);
    } else {
      const location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
      emit("update:modelValue", location);
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
  }
};

const updateModelValue = (value: any) => {
  emit("update:modelValue", value);
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.use-location {
  --color: #666eed;
  --padding-start: 0px;
}
</style>
