<template>
  <IonModal ref="modal" :initial-breakpoint="0.35" :breakpoints="[0, 0.35, 0.5]">
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        {{ $t("profile.stock.addNewBrand") }}
      </header>
      <main class="ion-padding-vertical">
        <section class="ion-margin-bottom">
          <IonItem lines="none">
            <IonInput
              label="Name:"
              placeholder="e.g Unilever"
              v-model="form.fields.name"
            ></IonInput>
          </IonItem>
        </section>
      </main>
      <footer>
        <KolaYellowButton
          @click="addBrand()"
          :disabled="!form.fields.name || loading"
        >
          {{ !loading ? $t("general.save") : "" }}
          <IonSpinner
            class="spinner"
            name="crescent"
            v-if="loading"
          ></IonSpinner>
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonContent,
  IonInput,
  IonModal,
  IonItem,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { mapStores } from "pinia";
import Brand from "@/models/Brand";
import { useBrandStore } from "@/stores/BrandStore";
import { useForm } from "@/composables/form";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  components: {
    IonContent,
    IonInput,
    IonModal,
    IonItem,
    IonSpinner,
    KolaYellowButton,
  },

  data() {
    return {
      form: useForm({
        name: "",
      }),
      loading: false,
    };
  },
  computed: {
    ...mapStores(useBrandStore, useToastStore),
  },

  methods: {
    async addBrand() {
      try {
        this.loading = true;
        const brand = new Brand(this.form.fields);
        await this.brandStore.addBrand(brand);
        this.form.fields.name = "";
        await this.toastStore.showSuccess("Brand Added Successfully");
      } catch (error) {
      } finally {
        this.loading = false;
        this.$el.dismiss();
      }
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
ion-item {
  --border-radius: 8px;
  --border-color: #d0d5dd;
  --border-style: solid;
  --border-width: 1px;
  --color: #74787c;
  margin-bottom: 5px;
}
</style>
