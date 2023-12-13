<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonBackButton slot="start"></IonBackButton>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h3>{{ $t("auth.validateOtp.verifyNumber") }}</h3>

      <p style="font-size: 0.9em">
        {{
          $t("auth.validateOtp.codeSent", {
            number: userStore.verification.response?.phone_number,
          })
        }}.
        {{ $t("auth.validateOtp.pleaseEnterCode") }}
      </p>

      <div
        class="ion-justify-content-center"
        style="display: flex; margin-top: 50px"
      >
        <v-otp-input
          ref="otpInput"
          v-model:value="otp"
          :conditionalClass="['one', 'two', 'three', 'four']"
          :num-inputs="6"
          :placeholder="['*', '*', '*', '*', '*', '*', '*', '*']"
          :should-auto-focus="true"
          input-classes="otp-input-field"
          input-type="number"
          required
          separator="&nbsp; &nbsp; "
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        ></v-otp-input>
      </div>

      <div class="ion-margin-top d-flex ion-justify-content-center">
        <IonText class="font-medium ion-margin-top ion-padding-vertical ion-text-center" @click="resendOTP()">
          If you did not receive the code, <b>click here to Resend</b>
        </IonText>
      </div>
    </IonContent>

    <IonFooter class="ion-padding">
      <KolaYellowButton :disabled="!otpEntered" @click="onContinue()">
        <IonSpinner v-if="validating" name="crescent"></IonSpinner>
        <IonText v-else>{{ $t("general.continue") }}</IonText>
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from "vue";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  IonFooter,
  IonSpinner,
  IonText,
} from "@ionic/vue";
import KolaInputField from "@/components/KolaInputField.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";

let validating = ref(false);
const router = useRouter();
const otp = ref("");
const otpEntered = computed(() => otp.value && otp.value.length == 6);

const handleOnChange = () => {};
const handleOnComplete = () => {};

const userStore = useUserStore();
const toastStore = useToastStore();

const resendOTP = async () => {
  toastStore.blockUI("Resending OTP. Please wait...");
  userStore.verifyPhoneNumber({
      phone_number: userStore.verification.phone_number as string
  }).then(() => {
    toastStore.unblockUI();
  })
}

const onContinue = async () => {
  validating.value = true;
  userStore
    .verifyOtp({
      phone_number: userStore.verification.phone_number as string,
      code: otp.value,
    })
    .then((response) => {
      if (userStore.resettingPIN) {
        return router.push("/auth/reset-pin");
      }
      if (userStore.updatingProfile) {
        updateUserInfo();
        return;
      }

      if (userStore.registering) {
        if (userStore.registrationFlow == "buy") {
          return router.push("/signup/shopper");
        } else {
          return router.push("/signup/vendor/summary");
        }
      }

      return router.push("/shopper/home");
    })
    .finally(() => {
      validating.value = false;
    });
};

const updateUserInfo = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Your Profile");
    const user = await userStore.updateUserInfo();
    if (user) {
      toastStore.unblockUI();
      toastStore.showSuccess("Profile has been updated successfully");
      router.push("/profile/personal/edit-profile");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to update Profile. Please try again",
        "",
        "bottom",
        "footer"
      );
    }
  } catch (error) {
  } finally {
    toastStore.unblockUI();
  }
};
</script>

<style lang="scss">
.otp-input-field {
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  border-radius: 10px;
  border: solid 1px #d7d7d7;
  vertical-align: middle;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 0px;
  padding-right: 0px;
  width: 3em;
}
</style>
