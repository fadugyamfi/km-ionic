<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-padding" :scroll-y="false">
            <h1>{{ $t("onboarding.welcomeToKolaMarket") }}</h1>
            <p>
                {{ $t("onboarding.weHelpYouBuyAndSell") }}
            </p>

            <img src="/images/onboarding_message.svg" />
        </ion-content>

        <IonFooter class="ion-no-border ion-color-light ion-padding">
            <KolaYellowButton @click="getStarted()">
                {{ $t("onboarding.getStarted") }}
            </KolaYellowButton>
        </IonFooter>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonFooter } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();

const getStarted = () => {
    userStore.storeOnboarded(true);
    router.push("/preloading");
}
</script>

<style lang="css">
h1 {
    font-size: 21px;
}
p {
    font-size: 0.75em;
}

</style>
