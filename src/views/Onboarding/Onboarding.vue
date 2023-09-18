<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-padding">
            <h1>Welcome To Kola Wholesale Market</h1>
            <p>
                We help you to buy and sell wholesale, manage your customers and inventory, simply and securely in one app!
            </p>

            <img src="/images/onboarding_message.svg" />
        </ion-content>

        <IonFooter class="ion-no-border ion-color-light ion-padding">
            <KolaYellowButton router-link="/signup">
                Get Started
            </KolaYellowButton>
        </IonFooter>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonFooter } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
</script>

<style lang="css">
h1 {
    font-size: 21px;
}
p {
    font-size: 12px;
}

</style>
