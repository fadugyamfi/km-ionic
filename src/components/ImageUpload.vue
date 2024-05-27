<template>
  <section>
    <IonCard color="light">
      <IonImg
        v-if="selectedPhoto"
        :src="selectedPhoto.webviewPath"
        @click="pickImages($event, selectedPhoto)"
        style="height: 100%; width: 100%"
      ></IonImg>

      <IonCardContent
        v-if="!selectedPhoto"
        @click="pickImages"
        class="d-flex ion-justify-content-center ion-align-items-center flex-column"
        style="height: 200px"
      >
        <IonImg
          src="/images/vendor/featured-image.svg"
          style="width: 64px; margin-bottom: 15px"
        ></IonImg>
        <p class="font-medium">Tap to upload</p>
        <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p>
      </IonCardContent>
    </IonCard>
    <Swiper
      ref="swiper"
      :slides-per-view="6"
      :modules="modules"
      v-if="productImages.length > 0 && multiple"
    >
      <SwiperSlide>
        <IonButton
          fill="clear"
          color="medium"
          class="add-product-button"
          @click="pickImages"
        >
          <IonIcon :icon="addCircleOutline"></IonIcon>
        </IonButton>
      </SwiperSlide>
      <SwiperSlide v-for="(i, index) in productImages" :key="index">
        <IonThumbnail
          style="width: 48px; height: 48px"
          :class="{
            selected: selectedPhoto?.webviewPath == i?.webviewPath,
          }"
          @click="selectPhoto(i, index)"
        >
          <IonIcon style="display: none" :icon="trashOutline"></IonIcon>
          <img :src="i.webviewPath" alt="" style="width: 100%; height: 100%" />
        </IonThumbnail>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
<script setup lang="ts">
import {
  IonImg,
  IonCardContent,
  IonCard,
  IonButton,
  IonThumbnail,
  IonIcon,
} from "@ionic/vue";
import { addCircleOutline, trashOutline } from "ionicons/icons";
import { UserPhoto, usePhotoGallery } from "@/composables/usePhotoGallery";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["image", "images"]);

const modules = ref([Navigation, Pagination, Scrollbar, A11y]);

const swiperOptions = ref({
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
});

const productImages = ref<UserPhoto[]>([]);
const selectedPhoto = ref<UserPhoto>();

const selectPhoto = (photo: UserPhoto, index: number) => {
  if (selectedPhoto.value?.uuid == photo.uuid) {
    productImages.value.splice(index, 1);
    selectedPhoto.value = productImages.value[0];
    emit(
      "images",
      productImages.value.map((item) => item.base64Data as string)
    );
    return;
  }
  selectedPhoto.value = photo;
};

const pickImages = async (event: any, productImage: UserPhoto) => {
  const { takePhoto, photos, pickImages } = usePhotoGallery();
  try {
    await pickImages();
    console.log(productImage);

    if (productImage) {
      const index = productImages.value?.findIndex(
        (item) => item.uuid == productImage.uuid
      );
      if (index > -1) {
        productImages.value.splice(index, 1, photos.value[0]);
        selectedPhoto.value = photos.value[0];
      }
    } else {
      productImages.value = [...productImages.value, ...photos.value];
      selectedPhoto.value = productImages.value[0];
    }

    if (productImages.value.length) {
      if (!props.multiple) {
        emit(
          "image",
          productImages.value.map((item) => item.base64Data as string)[0]
        );
        return;
      }
      emit(
        "images",
        productImages.value.map((item) => item.base64Data as string)
      );
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<style scoped lang="scss">
ion-card {
  margin: 0px 0px 16px;
  border-color: #b4b4b4;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  height: 200px;
}

.swiper {
  margin-bottom: 16px;
  .swiper-wrapper {
    .swiper-slide {
      .add-product-button {
        width: 40px;
        height: 40px;
        --padding-start: 4px;
        --padding-end: 4px;
        ion-icon {
          font-size: 26px;
        }
      }
      .selected {
        position: relative;
        border: 2px solid #3880ff;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.7);
        }
        ion-icon {
          display: block !important;
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 22px;
        }
      }
    }
  }
}
</style>
