<template>
  <IonModal
    v-show="image"
    class="open-modal"
    :isOpen="isOpen"
    id="photo-modal"
    ref="modal"
  >
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon :icon="closeOutline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="wrapper">
        <img :src="(image as string)" />
      </div>
    </ion-content>
  </IonModal>
</template>
<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      default: false,
    },
    image: {
      type: String as PropType<string | null>,
      default: null,
    },
  },

  emits: ["dismiss"],

  data() {
    return {
      closeOutline,
    };
  },
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonIcon,
  },

  methods: {
    close() {
      this.$emit("dismiss");
      this.$el.dismiss();
    },

    dismiss() {
      this.close();
    },
  },
});
</script>
<style scoped lang="scss">
ion-modal {
  &.open-modal {
    --width: 100%;
    --height: 100%;
    .wrapper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 90%;
        object-fit: contain;
      }
    }
  }
}
</style>
