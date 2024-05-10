<template>
  <IonModal
    ref="modal"
    :initial-breakpoint="0.5"
    :breakpoints="[0, 0.5, 0.75]"
  >
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        {{ $t("profile.team.teamMemberDetails") }}
      </header>
      <main class="ion-padding-vertical">
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.team.name')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.email }"
          :label="$t('profile.team.emailAddress')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.email"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.phone_number }"
          :label="$t('profile.team.preferredContact')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.phone_number"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
      </main>
      <footer>
        <KolaYellowButton @click="update()">
          {{ $t("general.saveChanges") }}
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import { IonContent, IonFooter, IonInput, IonModal } from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { useForm } from "@/composables/form";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonInput,
  },

  data() {
    return {
      form: useForm({
        name: "",
        email: "",
        phone_number: "",
      }),
    };
  },

  emits: ["update"],

  methods: {
    update() {
      this.$el.dismiss();
      this.$emit("update", this.form.fields);
    },
  }
});
</script>

<style lang="scss" scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}
</style>
