<template>
  <IonModal
    v-show="imageUrl"
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
      <Swiper :modules="modules" zoom>
        <SwiperSlide>
          <div class="wrapper swiper-zoom-container">
            <img :src="(imageUrl as string)" />
          </div>
        </SwiperSlide>
      </Swiper>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Zoom } from "swiper/modules";

export default defineComponent({
  props: {
    isOpen: {
      default: false,
    },
    imageUrl: {
      type: String as PropType<string | null>,
      default: null,
    },
  },

  emits: ["dismiss"],

  data() {
    return {
      closeOutline,
      modules: [Zoom],
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
    SwiperSlide,
    Swiper,
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
    .swiper {
      height: 100%;
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
}
</style>
