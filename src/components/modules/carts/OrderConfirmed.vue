<template>
  <ion-card class="div">
    <ion-card-content>
      <ion-row class="div-2">
        <ion-img
          loading="lazy"
          :srcset="imageSrcset"
          class="img"
        />
        <ion-col class="div-3">Racy Ventures</ion-col>
      </ion-row>
      <ion-row class="div-4">
        <ion-col class="div-5">Frytol, Geisha</ion-col>
        <ion-col class="div-6">GHS 35.00</ion-col>
      </ion-row>
      <ion-row class="div-7">
        <ion-col class="div-8">Tax/VAT</ion-col>
        <ion-col class="div-9">GHS 35.00</ion-col>
      </ion-row>
      <ion-row class="div-10">
        <ion-col class="div-11">Delivery fee</ion-col>
        <ion-col class="div-12">GHS 35.00</ion-col>
      </ion-row>
      <ion-row class="div-13">
        <ion-col class="div-14">Total cost</ion-col>
        <ion-col class="div-15">GHS 35.00</ion-col>
      </ion-row>
      <ion-row class="div-16">
        <ion-img
          loading="lazy"
          :src="locationImageSrc"
          class="img-2"
        />
        <ion-col class="div-17">Achimota Golf Club, 180a</ion-col>
      </ion-row>
      <ion-row class="div-18">
        <ion-img
          loading="lazy"
          :src="calendarImageSrc"
          class="img-3"
        />
        <ion-col class="div-19">Delivery Date- 14-08-2023</ion-col>
      </ion-row>
    </ion-card-content>
  </ion-card>
</template>

<script  lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  data() {
    return {
      imageSrcset: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d1ae8ab-e80e-480a-8028-f4fa8580d03d?apiKey=76d19367cfa34bd4a80bc8549db79d6e&width=100 100w, ...", // Replace with actual values
      locationImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/68d4ee2a-9993-45ca-af62-2b1f58544eef?apiKey=76d19367cfa34bd4a80bc8549db79d6e&",
      calendarImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c032753-c542-40b1-82b0-fe9decf5dda6?apiKey=76d19367cfa34bd4a80bc8549db79d6e&",
    };
  },
};
</script>

<style scoped>

</style>
