<template>
  <section class="suppliers-near-you shopper-home-section">
    <header class="ion-padding-horizontal">
      <h6>{{ $t("shopper.home.suppliersNearYou") }}</h6>

      <router-link to="/guest/home/suppliers">
        {{ $t("shopper.home.viewAll") }}
      </router-link>
    </header>

    <main>
      <section v-if="slides.length == 0">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSkeletonText
                class="skeleton-card"
                :animated="true"
              ></IonSkeletonText>
            </IonCol>
            <IonCol>
              <IonSkeletonText
                class="skeleton-card"
                :animated="true"
              ></IonSkeletonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </section>

      <Swiper v-else>
        <SwiperSlide v-for="(slide, index) of slides" :key="slide">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <GuestBusinessCard :business="slide[0]"></GuestBusinessCard>
              </IonCol>
              <IonCol size="6" v-if="slide[1]">
                <GuestBusinessCard :business="slide[1]"></GuestBusinessCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>
      </Swiper>
    </main>
  </section>
</template>

<script lang="ts">
import "swiper/scss";
import "@ionic/vue/css/ionic-swiper.css";

import axios from "axios";
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import Business from "@/models/Business";
import { IonCol, IonGrid, IonRow, IonSkeletonText } from "@ionic/vue";
import GuestBusinessCard from "@/components/modules/business/GuestBusinessCard.vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import { mapStores } from "pinia";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    IonGrid,
    IonRow,
    IonCol,
    GuestBusinessCard,
    IonSkeletonText,
  },

  data() {
    return {
      backOff: 1,
      suppliers: [] as Business[],
      slides: [] as any,
    };
  },

  computed: {
    ...mapStores(useBusinessStore),
  },

  methods: {
    async fetchSuppliers() {
      this.slides = [];

      try {
        this.suppliers = await this.businessStore.getGuestSuppliers();

        for (let i = 0; i < this.suppliers.length; i += 2) {
          if (this.suppliers[i + 1]) {
            this.slides.push([this.suppliers[i], this.suppliers[i + 1]]);
          } else {
            this.slides.push([this.suppliers[i]]);
          }
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.fetchSuppliers();
          this.backOff += 1;
        }, 100 * this.backOff);
      }
    },
  },

  mounted() {
    this.fetchSuppliers();
  },
});
</script>

<style scoped>
.skeleton-card {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}
a {
  text-decoration: none;
}
</style>
