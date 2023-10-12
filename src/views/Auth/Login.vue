<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <h3 class="header">{{ $t("auth.login.goodToSeeYouAgain") }}</h3>
            <p class="subtext">{{ $t("auth.login.enterDetailsBelowToLogin") }}</p>

            <div class="ion-margin-top">
                <section class="ion-padding-top ion-padding-bottom">
                    <IonLabel class="input-label">{{ $t("general.phoneNumber") }}</IonLabel>
                    <PhoneInput v-model="phoneNumber"/>
                </section>

                <section class="pin-entry">
                    <IonLabel class="input-label">{{ $t("general.pin") }}</IonLabel>
                    <IonInput v-model="pin" class="kola-input" type="password" placeholder="Enter 4 digit PIN" :maxlength="4" fill="outline"></IonInput>
                </section>

                <div class="forgot-pin-wrapper ion-padding-bottom">
                    <IonText router-link="/auth/forgot-pin" color="dark" class="forgot-pin-link">
                        {{ $t("auth.login.forgotYourPin") }}
                    </IonText>
                </div>
            </div>

            <IonButton expand="block" fill="clear" color="dark" router-link="/signup" class="login-prompt">
                {{ $t("auth.login.dontHaveAnAccount") }}&nbsp;
                <IonText color="primary" class="trigger">{{ $t("auth.login.signUp") }}</IonText>
            </IonButton>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton @click="login()">
                <IonSpinner v-if="fetching" name="crescent"></IonSpinner>
                <IonText v-else>{{ $t("auth.login.login") }}</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonContent, IonFooter, IonHeader, IonInput, IonLabel, IonPage, IonSpinner, IonText, IonToolbar, toastController } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { mapStores } from 'pinia';
import PhoneInput from '@/components/forms/PhoneInput.vue';

export default defineComponent({

    components: {
    KolaYellowButton,
    IonBackButton, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonSpinner, IonText, IonToolbar,
    PhoneInput,
    IonLabel,
    IonButton
},

    data() {
        return {
            fetching: false,
            phoneNumber: '',
            pin: ''
        }
    },

    computed: {
        ...mapStores( useUserStore )
    },

    methods: {

        login() {
            this.fetching = true;

            this.userStore.login({
                phone_number: this.phoneNumber,
                pin: this.pin
            })

            .then(() => this.$router.push('/shopper/home'))

            .catch(async (error: Error) => {
                const toast = await toastController.create({
                    message: error.message || 'Authentication Failed Unknown',
                    duration: 1500,
                    position: 'bottom',
                });

                await toast.present();
            })

            .finally(() => this.fetching = false);
        },

        handleOnChange() {},
        handleOnComplete() {}
    }
})

</script>

<style lang="scss">
.header {
    margin-bottom: 2px;
    margin-top: 0px;
}

.subtext {
    font-size: 0.8em;
    padding: 0px;
    margin: 0px;
    color: #555;
}


.forgot-pin-wrapper {
    padding-top: 5px;

    .forgot-pin-link {
        font-weight: bold;
        font-size: 0.9em;
    }
}

.login-prompt {
    font-size: 0.9em;
    text-transform: none;
    margin-top: 20px;
}

.login-prompt .trigger {
    font-weight: bold;
    color: #333;
}

.input-label {
    font-size: 0.8em;
    color: #919191;
}


.otp-input {
    display: flex;
    justify-content: space-around;

    .otp-input-field {
        text-align: center;
        font-size: 1em;
        font-weight: bold;
        border-radius: 5px;
        border: solid 1px #d7d7d7;
        vertical-align: middle;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 7px;
        padding-right: 7px;
    }
}
</style>
