<template>
  <section>
    <IonCard>
      <IonCardHeader class="ion-no-padding d-flex">
        <IonItem lines="none">
          <ProfileAvatar
            slot="start"
            class="ion-align-self-start ion-margin-top"
            :image="request?.sale_agent?.photo"
            :username="request?.sale_agent?.name"
            size="s"
          ></ProfileAvatar>
          <IonText>
            <IonLabel class="font-medium ion-align-self-start">{{
              request?.sale_agent?.name
            }}</IonLabel>
            <IonLabel class="font-medium ion-align-self-end"
              >{{ request?.agent_request_items_count }} item(s)</IonLabel
            >
          </IonText>
          <IonText slot="end" class="font-medium">{{
            Filters.date(request?.created_at, "short")
          }}</IonText>
        </IonItem>
      </IonCardHeader>
    </IonCard>
  </section>
</template>

<script lang="ts">
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
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
import { OrderItem } from "@/models/OrderItem";
import ProfileAvatar from "@/components/ProfileAvatar.vue";

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    Image,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonText,
    IonButton,
    ProfileAvatar,
  },

  props: {
    request: {
      type: Object as PropType<any>,
    },
  },

  data() {
    return {
      Filters,
    };
  },

  computed: {
    showChangeDate() {
      return false;
    },

    showChangeAddress() {
      return false;
    },
  },

  methods: {
    getItemUnit(orderItem: OrderItem) {
      if (orderItem.product_units_id == 2) {
        return this.$tc("general.units.piece", orderItem.quantity as number);
      }

      return this.$tc("general.units.box", orderItem.quantity as number);
    },

    update() {
      this.$router.push({
        name: "OrderUpdate",
        params: { id: this.order?.id },
      });
    },
  },
});
</script>

<style scoped lang="scss">
ion-thumbnail {
  --size: 32px;
}

.product-list ion-item {
  --min-height: 16px;
  margin-bottom: 0.5em;

  ion-label {
    margin: 0px;
  }
}
</style>
