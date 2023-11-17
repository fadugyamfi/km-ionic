<template>
  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <Image
              class="image-border"
              style="width: 32px"
              src="/img/icons/dollor.svg"
            ></Image>
            <IonLabel style="margin-left: 8px">
              <p class="fw-bold">Cash</p>
              <IonText color="medium" class="font-medium"
                >Pay cash on delivery</IonText
              >
            </IonLabel>
            <IonRadio color="medium" slot="end"></IonRadio>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>

  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <Image style="width: 32px" src="/img/icons/cash.svg"></Image>
            <IonLabel style="margin-left: 8px">
              <p class="fw-bold">Mobile Money</p>
              <IonText color="medium" class="font-medium"
                >Pay with mobile money</IonText
              >
            </IonLabel>
            <IonRadio color="medium" slot="end"></IonRadio>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>

  <section>
    <IonCard>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <Image style="width: 32px" src="/img/icons/visa.svg"></Image>
            <IonLabel style="margin-left: 8px">
              <p class="fw-bold">Visa Card</p>
              <IonText color="medium" class="font-medium"
                >*****************1234</IonText
              >
            </IonLabel>
            <IonRadio color="medium" slot="end"></IonRadio>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>

  <IonList lines="none">
              <IonItem>
                <Image style="width: 24px" src="/img/icons/plus-circle.svg"></Image>
                <IonLabel style="margin-left: 8px">
                  <IonText class="new-card"> Add new card</IonText>
                </IonLabel>
              </IonItem>
            </IonList>
</template>

<script lang="ts">
import {  defineComponent } from "vue";

import Image from "@/components/Image.vue";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonIcon,
  IonText,
} from "@ionic/vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";



export default defineComponent({
  // Define your component properties here if needed

  setup() {
    // Define your setup logic here if needed
  },
  components: {
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonIcon,
    Image,
    ProfileAvatar,
    IonText,
  },
});
</script>

<style scoped lang="scss">

.image-border {
  border-radius: 4px;
  background: var(--yellow, #f5aa29);
}

.new-card {
  color: #666EED !important;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

.ion-margin-bottom {
  margin-bottom: -5px;
}
</style>
