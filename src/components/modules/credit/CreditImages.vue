<template>
  <div class="credit-slider">
    <Swiper ref="swiper" :slides-per-view="1" :pagination="true">
      <SwiperSlide v-for="(saleItem, index) in saleItems" :key="index">
        <IonCard>
          <Image :src="saleItem?.product?.product_images[0]?.image" w="400" h="400" />
        </IonCard>
      </SwiperSlide>
      <SwiperSlide v-if="saleItems?.length == 0">
        <IonCard>
          <Image :no-img-src="noImage" w="400" h="400" />
        </IonCard>
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { IonCard } from "@ionic/vue";
import Image from "../../Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default defineComponent({
  props: {
    saleItems: {
      type: Array as PropType<any[] | null>,
    },
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      noImage: "/images/product-placeholder.png",
    };
  },

  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    Image,
  },
});
</script>

<style scoped lang="scss">
.credit-slider {
  height: 200px;
  margin-bottom: 2em;

  ion-card {
    width: 100%;

    ion-img {
      height: 200px;
      object-fit: contain;
    }
  }
}
</style>
