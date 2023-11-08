<template>
  <div class="order-slider">
    <Swiper ref="swiper" :slides-per-view="1" :pagination="true">
      <SwiperSlide v-for="(orderItem, index) in order?.order_items" :key="index">
        <IonCard>

          <Image :src="orderItem.product?.image" />
        </IonCard>
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { Order } from '@/models/Order';
import { PropType, defineComponent } from 'vue';
import { IonCard } from '@ionic/vue';
import Image from '../../Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default defineComponent({

  props: {
    order: {
      type: Object as PropType<Order | null>,
      required: true,
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
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },


  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    Image
  },


});
</script>

<style scoped lang="scss">
.order-slider {
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
