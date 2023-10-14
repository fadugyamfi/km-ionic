<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/signup/vendor/summary"></IonBackButton>
                </IonButtons>
                <IonTitle></IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <HeaderArea
                :title="$t('signup.vendor.letsGetYouSellingOnKola')"
                :subtext="$t('signup.vendor.summary.weWantToGetToKnowYou')"
            ></HeaderArea>

            <form method="post" ref="form" @submit.prevent="onContinue()">
                <main>
                    <IonInput
                        class="kola-input ion-margin-bottom"
                        :class="{ 'ion-invalid ion-touched': form.errors.business_owner_name }"
                        :label="$t('signup.vendor.fullName')"
                        labelPlacement="stacked"
                        fill="solid"
                        v-model="businessStore.registration.business_owner_name"
                        required
                        name="business_owner_name"
                        @ion-input="form.validate($event)"
                    ></IonInput>

                    <IonInput
                        class="kola-input ion-margin-bottom"
                        :class="{ 'ion-invalid ion-touched': form.errors.phone_number }"
                        :label="$t('general.phoneNumber')"
                        labelPlacement="stacked"
                        fill="solid"
                        v-model="businessStore.registration.phone_number"
                        type="text"
                        name="phone_number"
                        :readonly="true"
                        @ion-input="form.validate($event)"
                    ></IonInput>

                    <h6 class="fw-bold font-medium" style="margin-bottom: 3px; margin-top: 30px;">{{ $t("signup.vendor.secureYourAccount") }}</h6>
                    <p class="font-small" style="margin-top: 0px; margin-bottom: 20px;">
                        Create a <b>4-Digit PIN code</b> for subsequent logins after signup
                    </p>

                    <div class="kola-input-item">
                        <IonItem lines="none">
                            <IonInput
                                ref="pin"
                                :class="{ 'ion-invalid ion-touched': form.errors.pin }"
                                :label="$t('signup.shopper.newPinCode')"
                                labelPlacement="stacked"
                                v-model="businessStore.registration.user.pin"
                                :type="pinVisible ? 'number' : 'password'"
                                :maxlength="4"
                                name="pin"
                                @ion-input="form.validate($event)"
                                required
                            ></IonInput>
                            <IonButton fill="clear" color="medium" @click="pinVisible = !pinVisible">
                                <IonIcon slot="icon-only" :icon="pinVisible ? eye : eyeOff"></IonIcon>
                            </IonButton>
                        </IonItem>
                    </div>

                    <div class="kola-input-item">
                        <IonItem lines="none">
                            <IonInput
                                :class="{ 'ion-invalid ion-touched': form.errors.pin_confirmation }"
                                :label="$t('signup.shopper.confirmPinCode')"
                                labelPlacement="stacked"
                                v-model="businessStore.registration.user.pin_confirmation"
                                name="pin_confirmation"
                                :type="confPinVisible ? 'number' : 'password'"
                                :maxlength="4"
                                @ion-input="form.validate($event)"
                                required
                            ></IonInput>
                            <IonButton fill="clear" color="medium" @click="confPinVisible = !confPinVisible">
                                <IonIcon slot="icon-only" :icon="confPinVisible ? eye : eyeOff"></IonIcon>
                            </IonButton>
                        </IonItem>
                    </div>
                </main>
            </form>
            </IonContent>

            <IonFooter class="ion-padding ion-no-border">
                <FooterNavigation @continue="onContinue()"></FooterNavigation>
            </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterNavigation from './FooterNavigation.vue';
import { mapStores } from 'pinia';
import { useProductCategoryStore } from '@/stores/ProductCategoryStore';
import { useLocationStore } from '@/stores/LocationStore';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useForm } from '@/composables/form';
import HeaderArea from './HeaderArea.vue';
import { eye, eyeOff } from 'ionicons/icons';

export default defineComponent({

    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonCard,
        IonCardContent,
        IonFooter,
        FooterNavigation,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        HeaderArea,
        IonIcon,
        IonItem
    },

    data() {
        return {
            eye,
            eyeOff,
            pinVisible: false,
            confPinVisible: false,
            form: useForm({})
        }
    },

    computed: {
        ...mapStores( useProductCategoryStore, useLocationStore, useBusinessStore )
    },

    methods: {
        formValid() {
            if( this.businessStore.registration.user.pin != this.businessStore.registration.user.pin_confirmation ) {
                this.form.errors['pin'] = true;
                this.form.errors['pin_confirmation'] = true;
            }

            return this.businessStore.registration.user.pin.length == 4
                && this.businessStore.registration.user.pin_confirmation.length == 4
                && this.businessStore.registration.user.pin == this.businessStore.registration.user.pin_confirmation
                && this.businessStore.registration.business_owner_name.length > 2;
        },

        onContinue() {
            if( this.form.hasErrors() || !this.formValid() ) {
                return;
            }

            this.businessStore.cacheRegistrationInfo();
            this.$router.push('/signup/vendor/business-info')
        }
    },

    mounted() {
        this.businessStore.loadCachedRegistrationInfo();
    }
})
</script>
