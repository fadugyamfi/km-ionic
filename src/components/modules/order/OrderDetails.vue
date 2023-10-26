<template>
    <ion-page>
      <section class="ion-padding">
        <IonHeader class="inner-header">
          <IonToolbar class="ion-align-items-center">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/shopper/home"></IonBackButton>
            </IonButtons>
            <IonTitle size="small" class="fw-bold">
              {{order.id}}
            </IonTitle>
           <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
            <IonButtons slot="end">
             <ion-icon name="chatbubble-outline"></ion-icon >
            </IonButtons>
        </IonToolbar>
     </IonHeader>
      </section>
      <ion-content :fullscreen="true">
        <ion-card>
    <ion-slides pager="true" ref="imageSlider">
      <ion-slide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" @click="nextImage" />

      </ion-slide>
    </ion-slides>
  </ion-card>
 <ion-card>
  <IonItem v-for="order in filteredOrders" :key="order.id">
      <IonAvatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </IonAvatar>
      <IonLabel>
        <h2>{{ order.id }}</h2>
         </IonLabel>
      <IonIcon slot="end" :icon="ellipsisHorizontal"></IonIcon>
    </IonItem>
  </ion-card>

 </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSlides, IonSlide } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonAvatar,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSlides, IonSlide },
  data() {
    return {
      images: [
        'https://ionicframework.com/docs/img/demos/card-media-1.png',
        'https://ionicframework.com/docs/img/demos/card-media-2.png',
        'https://ionicframework.com/docs/img/demos/card-media-3.jpg',
      ],
    };
  },
});
</script>

<style scoped>

</style>