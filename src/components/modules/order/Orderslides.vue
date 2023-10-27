<ion-card>
    <ion-slides pager="true" ref="imageSlider">
      <ion-slide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" @click="nextImage" />

      </ion-slide>
    </ion-slides>
  </ion-card>
      <ion-item>
        
        <ion-slides pager="true" :options="slideOpts">
          <ion-slide>
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Image 1" />
          </ion-slide>
          <ion-slide>
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Image 2" />
          </ion-slide>
          <ion-slide>
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Image 3" />
          </ion-slide>
        </ion-slides>
        </ion-item>