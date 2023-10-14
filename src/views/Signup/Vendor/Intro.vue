<template>
    <IonPage class="vendor-signup-intro">
        <IonContent :fullscreen="true">
            <header class="intro-header">
                <p class="d-flex ion-justify-content-center">
                    <IonImg src="/images/kola-logo.svg"></IonImg>
                </p>

                <h5>Join us to unlock a world of opportunities</h5>
                <p class="join-text">
                    Join our vibrant community of vendors & retailers and start maximizing your sales
                    potential today
                </p>

                <section>
                    <PhoneInput v-model="phoneNumber" :required="true"></PhoneInput>

                    <KolaYellowButton class="ion-margin-top" @click="onContinue()">
                        <IonSpinner v-if="validating" name="crescent"></IonSpinner>
                        <IonText v-else>Start Selling</IonText>
                    </KolaYellowButton>

                    <IonButton class="ion-margin-top login-prompt" fill="clear" expand="block" router-link="/auth/login">
                        Already Have An Account? &nbsp;<IonText color="warning" class="fw-bold">Log in</IonText>
                    </IonButton>
                </section>
            </header>

            <main class="ion-padding">
                <section class="intro-point">
                    <span class="icon">
                        <IonImg src="/images/vendor/coin-stack.svg"></IonImg>
                    </span>

                    <section class="content">
                        <h6>Increase Sales</h6>
                        <p>
                            Leverage our marketing tools and personalized recommendations to captivate
                            customers and increase your sales potential.
                        </p>
                    </section>
                </section>

                <section class="intro-point">
                    <span class="icon">
                        <IonImg src="/images/vendor/trending.svg"></IonImg>
                    </span>

                    <section class="content">
                        <h6>Maximize your reach</h6>
                        <p>
                            Kola connects you with a diverse community of customers actively seeking quality products like
                            yours.
                        </p>
                    </section>
                </section>

                <section class="intro-point">
                    <span class="icon">
                        <IonImg src="/images/vendor/phone-outgoing.svg"></IonImg>
                    </span>

                    <section class="content">
                        <h6>Reliable Support</h6>
                        <p>
                            Whether you have questions, need technical guidance, our experts are here to provide reliable
                            support and ensure your success.
                        </p>
                    </section>
                </section>
            </main>

            <footer class="intro-footer">
                <h6>
                    Experience the benefits of thriving online and watch your business flourish like never before
                </h6>

                <IonButton fill="outline" expand="block" color="dark">
                    Sign up now
                </IonButton>
            </footer>
        </IonContent>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonInput, IonText, IonLabel, IonImg, IonButton, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';
import PhoneInput from '@/components/forms/PhoneInput.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { handleAxiosRequestError } from '@/utilities';
import { useUserStore } from '@/stores/UserStore';
import { useToastStore } from '@/stores/ToastStore';
import { useBusinessStore } from '@/stores/BusinessStore';

export default defineComponent({

    components: { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonInput, PhoneInput, KolaYellowButton, IonText, IonLabel, IonImg, IonButton, IonSpinner },

    data() {
        return {
            phoneNumber: '',
            validating: false
        }
    },

    methods: {
        onContinue() {
            const userStore = useUserStore();
            const toastStore = useToastStore();

            if( !this.phoneNumber ) {
                toastStore.showError('Phone Number Required');
                return;
            }

            this.validating = true;

            userStore.verifyPhoneNumber({
                phone_number: this.phoneNumber
            })
                .then(response => {
                    const json = response.data;

                    if (!json.two_factor_auth_sent && json.has_pin_number) {
                        this.$router.push('/auth/login');
                        toastStore.showError("Account already exists. Please login to continue");
                    } else {
                        this.$router.push('/auth/verify-otp');
                    }
                })
                .catch(error => {
                    handleAxiosRequestError(error)
                })
                .finally(() => this.validating = false);
        }
    },

    mounted() {
        const businessStore = useBusinessStore();
        businessStore.clearCachedRegistrationInfo();
    }
})
</script>

<style scoped lang="scss">
.vendor-signup-intro {
    .intro-header {
        background-color: #000000ea;
        padding: 15px;
        color: #fff;
        position: relative;

        &::before {
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-image: url('/images/vendor/signup-intro-bg.png');
            background-repeat: no-repeat;
            background-position: 50% 0;
            background-size: cover;
        }

        ion-input {
            --border-color: white;
            --border-radius: 16px;
            --color: white;
            --padding-bottom: 5px;
            --padding-top: 5px;
            --highlight-color-focused: orange;
            font-size: 0.9em;
            min-height: 42px;
        }

        .join-text {
            font-size: 0.75em;
            margin-bottom: 30px;
        }

        .login-prompt {
            font-size: 0.8em;
            text-transform: none;
            color: white;
            font-weight: normal;
        }
    }

    .iti {
        width: 100%;

        .phone-input {
            background-color: transparent;
            color: #f9f9f9;
            border: solid 1px #f1f1f1;
            border-radius: 10px;
            padding: 10px 30px;
            padding-left: 60px;
            width: 100%;

            &::placeholder {
                color: #f1f1f1;
            }
        }

        &:focus {
            border-color: #74787c;
        }
    }

    .intro-point {
        display: flex;
        align-items: start;
        padding: 8px 10px;

        .icon {
            background-color: #F5AA2933;
            min-width: 50px;
            min-height: 50px;
            border-radius: 50%;
            padding: 12px;
            margin-right: 10px;
        }

        .content {
            h6 {
                font-weight: bold;
                font-size: 0.85em;
                margin-bottom: 5px;
                margin-top: 5px;
            }

            p {
                margin-top: 0px;
                margin-bottom: 0px;
                font-size: 0.65em;
                line-height: 1.8em;
                color: #74787C;
            }
        }
    }

    .intro-footer {
        background-color: #FFFBF5;
        padding: 30px;

        h6 {
            font-size: 0.8em;
            font-weight: bold;
            margin-bottom: 20px;
            margin-top: 0px;
            text-align: center;
        }

        ion-button {
            font-size: 0.7em;
            --border-radius: 10px;
            --border-width: 1px;
            text-transform: none;
            font-weight: bold;
        }
    }
}
</style>
