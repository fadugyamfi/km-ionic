<template>
  <div class="order-slider">
    <Swiper ref="swiper" :slides-per-view="1" pagination :modules="modules" >
      <SwiperSlide v-for="(orderItem, index) in order?.order_items" :key="index">
        <IonCard>
          <IonCardContent>
            <Image :src="orderItem.product?.image" w="400" />
          </IonCardContent>
        </IonCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { Order } from '@/models/Order';
import { PropType, defineComponent } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue';
import Image from '../../Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

export default defineComponent({

  props: {
    order: {
      type: Object as PropType<Order | null>
    },
  },

  data() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      swiperOptions: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          enabled: true
        } as PaginationOptions,
      },
    };
  },


  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    Image,
    IonCardContent
},


});
</script>

<style lang="scss">
.order-slider {
  height: 250px;
  margin-bottom: 2em;

  ion-card {
    width: 100%;

    ion-img {
      height: 200px;
      object-fit: contain;
    }
  }

  .swiper {

    .swiper-pagination {
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
