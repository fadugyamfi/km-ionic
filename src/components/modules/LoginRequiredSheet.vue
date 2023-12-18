<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]">
    <IonContent class="ion-padding">
      <header class="ion-padding ion-text-center" style="margin-top: 80px;">
        <!-- {{ $t("profile.stock.updateStock") }} -->
        This action requires you to sign up or sign in
      </header>
      <main class="ion-padding-vertical">
        <KolaYellowButton @click="login()" class="ion-margin-bottom"> Sign in </KolaYellowButton>
        <KolaWhiteButton @click="signUp()"> Sign up </KolaWhiteButton>
      </main>
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
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import Stock from "@/models/Stock";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
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
