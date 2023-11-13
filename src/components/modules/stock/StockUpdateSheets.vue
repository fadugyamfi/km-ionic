<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5]">
    <IonContent>
      <header class="fw-semibold ion-padding ion-text-center">
        Update Stock
      </header>
      <main class="ion-padding-vertical">
        <!-- <IonRow>
              <IonCol size="6">
                <IonLabel>Date From</IonLabel>
                <IonInput
                  class="kola-input"
                  type="date"
                  v-model="form.start_dt"
                ></IonInput>
              </IonCol>
              <IonCol size="6">
                <IonLabel>Date To</IonLabel>
                <IonInput
                  class="kola-input"
                  type="date"
                  v-model="form.end_dt"
                ></IonInput>
              </IonCol>
            </IonRow> -->

            <IonSelect
            class="kola-input ion-margin-bottom"
            :label="$t('profile.stock.category') "
            :class="{
              'ion-invalid ion-touched': form.errors.product_categories_id,
            }"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.product_categories_id"
            required
            name="category"
            :toggle-icon="chevronDownOutline"
            @ion-change="form.validateSelectInput($event)"
          >
            <IonSelectOption
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</IonSelectOption
            >
          </IonSelect>
          <IonSelect>

          </IonSelect>
           
      </main>
      <footer class="ion-padding">
        <KolaYellowButton @click="update()"> Save changes </KolaYellowButton>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import {  chevronDownOutline } from "ionicons/icons";


export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonFooter,
    KolaYellowButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    
    
  },

  data() {
    return {
      form: {
        start_dt: "",
        end_dt: "",
      },
    };
  },

  emits: ["update"],

  methods: {
    update() {
      this.$el.dismiss();
      this.$emit("update", this.form);
    },
  },
});
</script>

<style scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}

ion-input {
  --padding-start: 0.4em;
  --padding-end: 0.4em;
}
</style>
