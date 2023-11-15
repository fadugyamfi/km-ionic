<template>


<IonCard>
      <IonCardContent class="ion-no-padding">
          <IonList lines="none">
              <IonItem>
                  <IonLabel class="font-medium">Frytol Geisha</IonLabel>
                  <IonLabel slot="end" class="font-medium">
                      GHS 0.00
                  </IonLabel>
              </IonItem>

              <IonItem>
                  <IonLabel class="font-medium">Tax/Vat</IonLabel>
                  <IonLabel slot="end" class="font-medium">
                      GHS 0.00
                  </IonLabel>
              </IonItem>
         
              <IonItem>
                  <IonLabel class="font-medium">Delivery free</IonLabel>
                  <IonLabel slot="end" class="font-medium">
                      GHS 0.00
                  </IonLabel>
              </IonItem>
           
              <IonItem>
                  <IonLabel class="font-medium">Total Cost</IonLabel>
                  <IonLabel slot="end" class="font-medium">
                      GHS 0.00
                  </IonLabel>
              </IonItem>
           
       
          </IonList>
      </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { locationOutline, timeOutline } from "ionicons/icons";
import { Order } from '@/models/Order';
import Filters from '../../../utilities/Filters';
import { IonCard, IonCardContent, IonItem, IonLabel, IonList } from '@ionic/vue';


export default defineComponent({
  props: {
      order: {
          type: Object as PropType<Order>
      },
      showChangeAddress: {
          default: true
      },
      showChangeDate: {
          default: true
      }
  },
  data() {
      return {
          Filters
      };
  },
  components: { IonCard, IonCardContent, IonList, IonItem, IonLabel }
})
</script>

<style scoped lang="scss">
ion-item {
--min-height: 16px;
margin-bottom: 0.5em;

ion-label {
  margin: 0px;
}
}
</style>
