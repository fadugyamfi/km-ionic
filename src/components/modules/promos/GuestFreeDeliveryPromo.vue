<template>
    <section class="d-flex ion-justify-content-between ion-align-items-start">
        <section>
            <h4 class="ion-text-uppercase">
                Best Prices, Easy Returns, Free Delivery
            </h4>
            <p>
                Receive items within 48 hours, free of charge. Easily inspect and return items to delivery agents on delivery.
            </p>

            <KolaYellowButton class="shop-now" expand="none" router-link="/guest/home/categories">
                Shop Now
            </KolaYellowButton>
        </section>
        <section class="image">
            <IonImg src="/images/shopper/free-delivery-promo.png"></IonImg>
        </section>
    </section>
</template>

<script lang="ts">
import { IonImg } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({

    components: {
        IonImg, KolaYellowButton
    },

    data() {
        return {

        }
    }
})
</script>

<style scoped lang="scss">
h4 {
    font-size: 1.1em;
    font-weight: bold;
    color: #000;
}

p {
    color: #111;
    font-size: 0.8em;
}

.image {
    margin-left: 10px;
}

ion-img {
    width: 90px;
}

ion-button.shop-now {
    font-size: 0.92em;
    --padding-top: 8px;
    --padding-bottom: 8px;
    --padding-start: 24px;
    --padding-end: 24px;
    margin-top: 10px;
}
</style>
