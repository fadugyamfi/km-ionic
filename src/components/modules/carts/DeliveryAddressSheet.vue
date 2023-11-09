<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5]">
    <IonContent>
      <header class="fw-semibold ion-padding ion-text-center">
        Change Address
      </header>
      <main class="ion-padding-vertical">
        <form>
          <ion-card>
            <IonInput
              class="kola-input delivery-details-input"
              label="Town/Locality"
              labelPlacement="stacked"
              fill="solid"
              v-model="form.fields.location"
              name="location"
              required
            ></IonInput>
          </ion-card>
        </form>
      </main>
      <footer class="ion-padding">
        <KolaYellowButton @click="storeDeliveryAddress">
          Update
        </KolaYellowButton>
      </footer>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonCol,
  IonContent,
  IonCard,
  IonFooter,
  IonGrid,
  IonInput,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/vue";
import { defineComponent, ref, toRefs } from "vue";
import KolaYellowButton from "../../KolaYellowButton.vue";
import { useCartStore } from "@/stores/CartStore";
import { useForm } from "@/composables/form";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

interface FormData {
  fields: {
    location: string;
  };
  errors: Record<string, string | null>;
}

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
    IonCard
  },
  setup() {
    const form = ref<FormData>({
      fields: {
        location: "",
      },
      errors: {},
    });

    const router = useRouter();
    const route = useRoute();
    const cartStore = useCartStore();

    const storeDeliveryAddress = () => {
      const index = cartStore.orders.findIndex(
        (b) => b.businesses_id == Number(route.params.id)
      );
      cartStore.orders[index] = {
        ...cartStore.orders[index],
        ...form.value.fields,
      };
      router.push(`/shopper/cart/business/${route.params.id}/item-review`);
    };

    return {
      form,
      storeDeliveryAddress,
    };
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
