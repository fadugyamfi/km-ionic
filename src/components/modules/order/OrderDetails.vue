<template>
    <ion-page>
      <section class="ion-padding">
        <IonHeader class="inner-header">
          <IonToolbar class="ion-align-items-center">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/shopper/home"></IonBackButton>
            </IonButtons>
            <IonTitle size="small" class="fw-bold">
              {{credit.id }}
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
      <ion-slide v-for="(image, index) in order" :key="index">
        <img :src="image" alt="Image" @click="nextImage" />
      </ion-slide>
    </ion-slides>
  </ion-card>
 </ion-content>
    </ion-page>
</template>


</script>

<style scoped>

</style>