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
                    <PhoneInput v-model="phoneNumber"/>
                </section>

                <section class="pin-entry">
                    <PinEntryField v-model="pin" :label="$t('general.pin')"></PinEntryField>
                </section>

                <IonButton fill="clear" color="dark" @click="forgotPIN()" style="text-transform: none; padding-left: 0px;">
                    {{ $t("auth.login.forgotYourPin") }}
                </IonButton>
            </div>

            <IonButton expand="block" fill="clear" color="dark" router-link="/signup" class="login-prompt">
                {{ $t("auth.login.dontHaveAnAccount") }}&nbsp;
                <IonText color="primary" class="trigger">{{ $t("auth.login.signUp") }}</IonText>
            </IonButton>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border" id="footer">
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
import { useUserStore } from '@/stores/UserStore';
import { mapStores } from 'pinia';
import PhoneInput from '@/components/forms/PhoneInput.vue';
import PinEntryField from './PinEntryField.vue';
import { useToastStore } from '../../stores/ToastStore';

export default defineComponent({

    components: {
        KolaYellowButton,
        IonBackButton,
        IonContent,
        IonFooter,
        IonHeader,
        IonInput,
        IonPage,
        IonSpinner,
        IonText,
        IonToolbar,
        PhoneInput,
        IonLabel,
        IonButton,
        PinEntryField
    },

    data() {
        return {
            fetching: false,
            phoneNumber: '',
            pin: ''
        }
    },

    computed: {
        ...mapStores( useUserStore, useToastStore ),

        loginDisabled() {
            return !!import.meta.env.VITE_LOGIN_DISABLED == true;
        }
    },

    methods: {

        login() {
            this.fetching = true;

            this.userStore.login({
                phone_number: this.phoneNumber,
                pin: this.pin
            })

            .then(() => {
                if( this.userStore.user?.isSaleAgent() || this.userStore.user?.isSalesManager() ) {
                    this.userStore.setAppModeAsVendor();
                    this.$router.replace('/agent/home');
                    return;
                }

                this.$router.replace('/shopper/home');
            })

            .catch(async (error: Error) => {
                this.toastStore.showError(error.message || this.$t('Authentication Failed Unknown'), '', 'bottom', 'footer');
            })

            .finally(() => this.fetching = false);
        },

        forgotPIN() {
            this.userStore.resettingPIN = true;
            this.$router.push('/auth/verify-number');
        },

        handleOnChange() {},
        handleOnComplete() {}
    },

    mounted() {
        if( this.loginDisabled ) {
            this.$router.push('/signup');
        }
    }
})

</script>

<style scoped lang="scss">
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
    margin-top: 60px;
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

.iti input {
    min-height: 56px;
}
</style>
