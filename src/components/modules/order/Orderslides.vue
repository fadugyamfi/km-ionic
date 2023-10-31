<template>
  <div class="order-slider">
    <swiper :options="swiperOptions" ref="swiper">
      <swiper-slide v-for="(order, index) in order" :key="index">
        <img :src="order.orderItem.image" alt="Order Image" />
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script setup lang = ts>
import { Swiper, SwiperSlide } from 'swiper/vue';
import {useOrderStore} from '@/stores/OrderStore';
import {OrderItem} from '@/models/OrderItem';
import  {Order} from '@/models/Order';


export default {
  
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
      orders: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
       axios.get('yo').then(response => {
        this.orders = response.data;
       });
    },
  },
};
</script>

<style>
.order-slider {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
