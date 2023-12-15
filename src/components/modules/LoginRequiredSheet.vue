<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]">
    <IonContent class="ion-padding">
      <!-- <header class="fw-semibold ion-padding ion-text-center">
          {{ $t("profile.stock.updateStock") }}
        </header> -->
      <main class="ion-padding-vertical">
        <!-- <KolaYellowButton class="ion-margin-bottom">
          Sign up with Google
        </KolaYellowButton> -->
        <KolaGreenButton @click="signUp()"> Sign up </KolaGreenButton>
      </main>
      <footer>
        <IonButton
          class="ion-margin-top login-prompt"
          fill="clear"
          expand="block"
          @click="login()"
          color="medium"
        >
          Already have an account? &nbsp;<IonText
            color="warning"
            class="fw-bold"
            >Log in</IonText
          >
        </IonButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonInput,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonList,
  IonItem,
  IonIcon,
  IonSelectOption,
  IonButton,
  IonText,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaGreenButton from "@/components/KolaGreenButton.vue";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import Stock from "@/models/Stock";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    KolaGreenButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonIcon,
    IonText,
    IonButton,
  },

  data() {
    return {
      chevronDownOutline,
      chevronUpOutline,
      showQuantitySelector: true,
    };
  },

  emits: ["update"],

  methods: {
    signUp() {
      this.$router.push("/signup");
      this.$el.dismiss();
    },
    login() {
      this.$router.push("/auth/login");
      this.$el.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}

ion-input {
  // --padding-start: 0.4em;
  --padding-end: 0.4em;
}
.stock-input {
  --border-radius: 8px;
  --border-color: #d0d5dd;
  &.select-fill-outline {
    color: #74787c;
  }
}
ion-item {
  --border-radius: 8px;
  --border-color: #d0d5dd;
  --border-style: solid;
  --border-width: 1px;
  --color: #74787c;
  margin-bottom: 5px;
}
.login-prompt {
  font-size: 0.8em;
  text-transform: none;

  font-weight: normal;
}
</style>
