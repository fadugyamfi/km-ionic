<template>
  <section>
    <IonCard>
      <IonCardHeader class="ion-no-padding">
        <IonItem lines="none">
          <ProfileAvatar
            slot="start"
            :image="credit?.customer?.logo"
            :username="credit?.customer?.name"
            customSize="32px"
          ></ProfileAvatar>

          <IonLabel class="font-medium">{{ credit?.customer?.name }}</IonLabel>
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="product-list ion-no-padding">
        <IonList lines="none">
          <IonItem v-for="item in credit?.sale_items" :key="item.id">
            <IonLabel class="ion-text-wrap font-medium">
              {{ item.product?.product_name }}
              <section>
                <IonText color="medium" class="font-medium">
                  {{ item.quantity }} {{ getItemUnit(item) }}
                </IonText>
              </section>
            </IonLabel>
            <IonLabel
              slot="end"
              class="font-medium text-end ion-align-self-start ion-text-end"
            >
              {{
                Filters.currency(
                  item.total_price as number,
                  item.currency?.symbol as string
                )
              }}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel slot="start" class="ion-text-wrap font-medium fw-semibold">
              Total amount due
            </IonLabel>
            <IonLabel
              slot="end"
              class="font-medium text-end ion-align-self-start fw-semibold ion-text-end"
            >
            {{ Filters.currency( Number(credit?.total_sales_price) ) }}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
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
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";
import { OrderItem } from "../../../models/OrderItem";
import ProfileAvatar from "../../ProfileAvatar.vue";
import Credit from "@/models/Credit";

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
  },

  props: {
    credit: {
      type: Object as PropType<Credit | null>,
    },
  },

  data() {
    return {
      Filters,
    };
  },

  methods: {
    getItemUnit(saleItem: OrderItem) {
      if (saleItem.product_units_id == 2) {
        return this.$tc("general.units.piece", saleItem.quantity as number);
      }

      return this.$tc("general.units.box", saleItem.quantity as number);
    },
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
