<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]">
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
        <KolaYellowButton @click="update()" :disabled="!canSave">
          {{ !saving ? $t("general.saveChanges") : "" }}
          <IonSpinner
            class="spinner"
            name="crescent"
            v-if="saving"
          ></IonSpinner>
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonContent,
  IonFooter,
  IonInput,
  IonModal,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { useForm } from "@/composables/form";
import { useTeamStore } from "@/stores/TeamStore";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonInput,
    IonSpinner,
  },

  props: {
    member: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      form: useForm({
        name: "",
        email: "",
        phone_number: "",
      }),
      saving: false,
      teamStore: useTeamStore(),
    };
  },

  emits: ["update"],
  computed: {
    canSave() {
      return (
        this.form.fields.name?.length > 0 &&
        this.form.fields.email?.length > 0 &&
        this.form.fields.phone_number?.length > 0
      );
    },
  },

  methods: {
    async update() {
      try {
        this.saving = true;
        const memberId = +this.$route.params.id;
        const res = await this.teamStore.updateMemberDetails(
          memberId,
          this.form.fields
        );
        this.$emit("update");
        this.$el.dismiss();
      } catch (error) {
      } finally {
        this.saving = false;
      }
    },
  },

  watch: {
    member(newValue, oldValue) {
      this.form.fields = {
        name: newValue.name,
        email: newValue.email,
        phone_number: newValue.phone_number,
      };
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
</style>
