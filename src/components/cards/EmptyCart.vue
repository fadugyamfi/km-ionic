<template>
      
      <IonList class="ion-text-center">
            <section>
                <img src="/images/vendor/shopping-cart.png" width="70" height="70" />
            </section>
            <section>
                <h1>Your cart is empty</h1>
                <p>Looks like you haven’t added anything to your cart yet. Add items to get started.</p>
            </section>
            <section class="ion-text-center">
                <ion-button color="yellow" class="centered-button">Start Shopping</ion-button>
            </section>
        </IonList>
</template>
  

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonList} from '@ionic/vue';
import { Order } from '@/models/Order';

export default defineComponent({
    data() {
        return {
            orders: [] as Order[]
        }
    }
});
</script>

<style lang="scss" scoped>
.centered-button {
    display: flex;
    justify-content: center;
    background-color: yellow;
    color: #101828;
}
h{
    
}

p {
    font-size: 0.75em;
    font-weight: normal;
    color: #74787C;
    margin-top: 0px
}

.img{
    width: 122.37px;
height: 120px;

}
main {
    display: block;
    padding-bottom: 50px 50px;

}
</style>
