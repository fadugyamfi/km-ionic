<template>
  <div class="products-slider">
    <Swiper :pagination="true" :modules="modules">
      <SwiperSlide v-for="image in product?.product_images" :key="image?.id">
        <section style="height: 100%; border-radius: 10px">
          <Image
            @click="viewImage(image?.image)"
            :src="image?.image"
            :path="image?.image_path"
            w="400"
            h="400"
          ></Image>
        </section>
      </SwiperSlide>
      <SwiperSlide v-if="product?.product_images?.length == 0">
        <section style="height: 100%; border-radius: 10px">
          <Image
            @click="viewImage(product?.image)"
            :src="product?.image"
            style="height: 200px"
            w="400"
            h="400"
          ></Image>
        </section>
      </SwiperSlide>
    </Swiper>
    <ViewPhotoModal
      :isOpen="showPhoto"
      @dismiss="showPhoto = false"
      :imageUrl="imageUrl"
    />
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
import Image from "../../Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import ViewPhotoModal from "@/components/ViewPhotoModal.vue";

// Import Swiper styles
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import Product from "@/models/Product";
import Stock from "@/models/Stock";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product | Stock | null>,
    },
  },

  data() {
    return {
      modules: [Pagination],
      swiperOptions: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
          enabled: true,
        },
      },
      noImage: "/images/product-placeholder.png",
      showPhoto: false,
      imageUrl: null,
    };
  },

  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    Image,
    IonCardContent,
    ViewPhotoModal,
  },
  methods: {
    viewImage(url: any) {
      if (!url || url.includes('placeholder')) return;
      this.imageUrl = url;
      this.showPhoto = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.products-slider {
  height: 250px;
  margin-bottom: 2em;

  ion-card {
    width: 100%;

    ion-img {
      height: 100%;
      object-fit: contain;
    }
  }

  .swiper {
    height: 100%;
    &::v-deep(.swiper-pagination) {
      position: absolute;
      bottom: 6px;

      .swiper-pagination-bullet {
        background: #777;
      }

      .swiper-pagination-bullet-active {
        background: #369;
      }
    }
  }
}
</style>
