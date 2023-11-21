<template>
  <section>
    <IonCard @click="viewDeliveryDetails">
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
      
          <IonItem >
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
            <Image
              class="image-border"
              style="width: 32px"
              src="/img/icons/cash.svg"
            ></Image>
            <IonLabel style="margin-left: 8px">
              <p class="fw-bold">Mobile Money or Card</p>
              <IonText color="medium" class="font-medium"
                >Pay now with Mobile Money or Card</IonText
              >
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Image from "@/components/Image.vue";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonText,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Rename the method to viewDeliveryDetails
const viewDeliveryDetails = () => {
  router.push(`/shopper/cart/business/${route.params.id}/delivery-details`);
 
};

export default defineComponent({
  setup() {
    // Define your setup logic here if needed

    return {
      viewDeliveryDetails,
    };
  },
  components: {
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    Image,
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
  color: #666eed !important;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.ion-margin-bottom {
  margin-bottom: -5px;
}
</style>
