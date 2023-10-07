<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title></ion-title>
            </ion-toolbar>
        </ion-header>


        <ion-content :fullscreen="true" class="ion-padding" :scroll-y="false">
            <h3>The best way to grow your sales</h3>
            <p>
                We help you to sell, buy, manage your customers and inventory simply and securely in one app!
            </p>

            <IonCard class="option-card ion-no-border">
                <IonCardContent class="ion-text-center">
                    <h4>How do you intend to use Kola?</h4>

                    <div class="ion-padding">
                        <IonButton
                            :class="{ selected: selectedOption == 'buy' }"
                            expand="block"
                            class="ion-margin-bottom option-button"
                            fill="outline"
                            @click="selectOption('buy')"
                        >
                            To Buy
                        </IonButton>

                        <IonButton
                            :class="{ selected: selectedOption == 'sell' }"
                            expand="block"
                            class="option-button"
                            fill="outline"
                            @click="selectOption('sell')"
                        >
                            To Sell
                        </IonButton>
                    </div>

                </IonCardContent>
            </IonCard>

            <IonText router-link="/auth/login">
                <p class="ion-text-center ion-padding login-prompt">
                    Already have an account?
                    <IonText color="primary" class="trigger">Log In</IonText>
                </p>
            </IonText>
        </ion-content>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton :disabled="!isOptionSelected" @click="redirectToSignup()">
                Continue
            </KolaYellowButton>
        </IonFooter>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonBackButton,
    IonButtons,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonFooter,
IonText
} from '@ionic/vue';
import { Ref, computed, ref } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
const router = useRouter();
let selectedOption: Ref<string | null> = ref(null);
const isOptionSelected = computed(() => selectedOption.value != null);
const selectOption = (option: string) => selectedOption.value = option;

const redirectToSignup = () => {
    userStore.registering = true;
    userStore.registrationFlow = selectedOption.value as string;

    if( selectedOption.value == 'buy' ) {
        router.push('/auth/verify-number');
    } else {
        router.push('/signup/vendor');
    }
}
</script>

<style scoped lang="css">
.option-card {
    margin-top: 50px;
    --background: #F6F6F6;
    font-size: 1em;
}

.option-button {
    --border-width: 0px;
    --background: #fff;
    --color: #333;
    text-transform: none;
    font-size: 1em;
    font-weight: 500px;
}

.option-button.selected {
    --border-width: 1px;
    --border-color: #333;
}

h4 {
    border-bottom: solid 1px #ccc;
    text-align: center;
    padding: 10px;
}

.login-prompt {
    font-size: 0.9em;
}

.login-prompt .trigger {
    font-weight: bold;
    color: #333;
}
</style>
