<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding" :scroll-y="false">
            <h3 class="header">Good To See You Again</h3>
            <p class="subtext"><small>Please provide you Phone Number and PIN to login</small></p>

            <div class="ion-margin-top">
                <section class="ion-padding-top ion-padding-bottom">
                    <IonLabel class="input-label">Phone Number</IonLabel>
                    <PhoneInput v-model="phoneNumber"/>
                </section>

                <section class="pin-entry">
                    <IonLabel class="input-label">PIN</IonLabel>
                    <IonInput v-model="pin" class="kola-input" type="password" placeholder="****" :maxlength="4" :counter="true" fill="outline"></IonInput>
                    <!-- <v-otp-input
                        ref="otpInput"
                        v-model:value="pin"
                        class="otp-input"
                        :conditionalClass="['one', 'two', 'three', 'four']"
                        :num-inputs="4"
                        :placeholder="['*', '*', '*', '*', '*', '*', '*', '*']"
                        :should-auto-focus="true"
                        input-classes="otp-input-field"
                        input-type="number"
                        required
                        separator="&nbsp; &nbsp; "
                        @on-change="handleOnChange"
                        @on-complete="handleOnComplete"></v-otp-input> -->
                </section>

                <div class="ion-padding-top ion-padding-bottom">
                    <IonText router-link="/auth/forgot-pin" color="dark" style="font-weight: bold; font-size: 0.9em;">Forgot Your PIN?</IonText>
                </div>
            </div>

            <IonText router-link="/signup">
                <p class="ion-text-center ion-padding login-prompt" >
                    Don't have an account?
                    <IonText color="primary" class="trigger">Sign Up</IonText>
                </p>
            </IonText>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton @click="login()">
                <IonSpinner v-if="fetching" name="crescent"></IonSpinner>
                <IonText v-else>Login</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonContent, IonFooter, IonHeader, IonInput, IonLabel, IonPage, IonSpinner, IonText, IonToolbar, toastController } from '@ionic/vue';
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
        IonLabel
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
}

.subtext {
    font-size: 1.05em;
    padding: 0px;
    margin: 0px;
}

.login-prompt {
    font-size: 1em;
}

.login-prompt .trigger {
    font-weight: bold;
    color: #333;
}

.input-label {
    font-size: 0.8em;
    color: #919191;
}

.pin-entry {
    // margin-top: 10px;
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
