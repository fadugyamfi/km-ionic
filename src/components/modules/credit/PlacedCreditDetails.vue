<template>
  <section>
    <ion-card>
      <IonCardHeader class="ion-no-padding">
        <IonItem lines="none">
          <IonLabel class="font-medium fw-bold">Credit Details</IonLabel>
        </IonItem>
      </IonCardHeader>
      <IonCardContent class="product-list ion-no-padding">
        <IonList lines="none">
          <IonItem lines="full" class="ion-padding-bottom">
            <IonLabel>
              <p class="font-medium">
                <IonText color="medium">
                  Order date:
                  {{
                    Filters.date(
                      credit?.order?.created_at as string,
                      "short"
                    ) || "N/A"
                  }}
                </IonText>
              </p>
              <p>
                <IonChip color="danger" class="font-medium fw-bold">
                  {{ credit?.order?.days_overdue }} days overdue
                </IonChip>
              </p>
              <p class="font-medium">
                <IonText
                  color="medium"
                  style="gap: 5px;"
                >
                  <ion-icon :icon="locationOutline"></ion-icon>
                  {{ credit?.order?.delivery_location || "Unknown" }}</IonText
                >
              </p>
              <p class="font-medium">
                <IonText
                  color="medium"
                  class="d-flex ion-align-items-center"
                  style="gap: 5px"
                >
                  <ion-icon :icon="timeOutline"></ion-icon> Order delivered on -
                  {{
                    credit?.order?.delivery_date
                      ? Filters.date(
                          credit?.order?.delivery_date as string,
                          "short"
                        )
                      : "TBD"
                  }}</IonText
                >
              </p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel slot="start" class="ion-text-wrap font-medium fw-bold">
              Total amount due
            </IonLabel>
            <IonLabel
              slot="end"
              class="font-medium text-end ion-align-self-start fw-bold ion-text-end"
            >
              {{ Filters.currency(Number(credit?.total_sales_price)) }}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </ion-card>
  </section>
</template>
<script lang="ts">
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonText,
  IonButton,
  IonChip,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import { OrderItem } from "../../../models/OrderItem";
import ProfileAvatar from "../../ProfileAvatar.vue";
import Credit from "@/models/Credit";
import { locationOutline, timeOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonIcon,
    Image,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonText,
    IonButton,
    ProfileAvatar,
    IonChip,
  },

  props: {
    credit: {
      type: Object as PropType<Credit | null>,
    },
  },

  data() {
    return {
      Filters,
      locationOutline,
      timeOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.product-list ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
</style>
