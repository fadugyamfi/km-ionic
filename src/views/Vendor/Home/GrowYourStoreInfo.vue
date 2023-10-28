<template>
    <IonCard>
        <IonCardContent>
            <section class="intro-point">
                <span class="icon">
                    <IonImg src="/images/vendor/coin-stack.svg"></IonImg>
                </span>

                <section class="content">
                    <h6>Invite Customers</h6>
                    <p>
                        Invite your customers offline to find your store and shop from you.
                        Shops who use this approach see a spike in order value and repeat purchases
                    </p>
                </section>
            </section>

            <IonButton expand="block" class="intro-btn success ion-margin-bottom">
                {{ $t("vendor.home.inviteCustomers") }}
            </IonButton>

            <section class="intro-point">
                <span class="icon">
                    <IonImg src="/images/vendor/trending.svg"></IonImg>
                </span>

                <section class="content">
                    <h6>Promote Your Store</h6>
                    <p>
                        Kola connects you with a diverse community of customers actively seeking quality products like
                        yours.
                        We promote your store for FREE for 4 weeks. Keep promoting your store to get more orders
                    </p>
                </section>
            </section>

            <section class="intro-point">
                <span class="icon">
                    <IonImg src="/images/vendor/phone-outgoing.svg"></IonImg>
                </span>

                <section class="content">
                    <h6>Offers, discounts & promotions</h6>
                    <p>
                        Shops who offer discounts and FREE Delivery receive 2x more orders.
                        Get in touch with us to set up your first promotion.
                        We use data to help you optimise for sales
                    </p>
                </section>
            </section>

            <IonButton expand="block" class="intro-btn warning ion-margin-bottom" @click="openWhatsAppChat()">
                {{ $t("vendor.home.chatWithUs") }}
            </IonButton>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {};
    },

    components: {
        IonCard,
        IonCardContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonImg,
        IonButton
    },

    methods: {
        openWhatsAppChat() {
            window.open('https://wa.me/233270404501', '_system', 'location=yes')
        }
    }
})
</script>

<style scoped>
ion-card {
    --background: #FFFBF5;
}

ion-card ion-card-content {
    --padding-top: 50px;
}

.intro-point {
    display: flex;
    align-items: start;
    margin-bottom: 1em;
}

.intro-point .icon {
    background-color: #F5AA2933;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    padding: 12px;
    margin-right: 10px;
}

.content h6 {
    font-weight: bold;
    font-size: 1em;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #111;
}

.content p {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 0.75em;
    line-height: 1.8em;
    color: #74787C;
}

.intro-btn {
    text-transform: none;
    font-weight: bold;
    font-size: 0.85em;
}

.intro-btn.success {
    --background: #66F48E;
    --color: #101828;
    --box-shadow: none;
    --border-radius: 8px;
    margin-bottom: 3em;
}

.intro-btn.warning {
    --background: #F5AA29;
    --color: #101828;
    --box-shadow: none;
    --border-radius: 8px;
    margin-top: 1em;
}
</style>
