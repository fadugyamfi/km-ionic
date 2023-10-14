<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/signup/vendor/business-info"></IonBackButton>
                </IonButtons>
                <IonTitle></IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <header>
                <h5>{{ $t("signup.vendor.letsGetYouSellingOnKola") }}</h5>
                <p>
                    {{ $t("signup.vendor.summary.weWantToGetToKnowYourBusiness") }}
                </p>
            </header>

            <main>
                <form>
                    <IonInput
                        class="kola-input ion-margin-bottom"
                        :class="{ 'ion-invalid ion-touched': form.errors.year_established}"
                        :label="$t('signup.vendor.yearEstablished')"
                        labelPlacement="stacked"
                        fill="solid"
                        type="number"
                        name="year_established"
                        v-model="businessStore.registration.attributes.year_established"
                        :maxlength="4"
                        :min="1500"
                        :max="new Date().getFullYear()"
                        placeholder="e.g. 1950"
                        @ionChange="form.validate($event)"
                        required
                    ></IonInput>

                    <div class="ion-margin-top">
                        <h6 class="font-medium fw-bold">Social Media Presence</h6>
                        <p class="font-small" style="margin-top: 0px; margin-bottom: 1em;">
                            Please provide the handles for your brand's social media accounts.
                            This will help us connect and collaborate with you effectively.
                        </p>
                    </div>

                    <div class="input-group">
                        <IonItem lines="none">
                            <IonIcon :icon="logoInstagram" color="dark"></IonIcon>
                            <IonInput
                                label=""
                                placeholder="Instagram"
                                v-model="businessStore.registration.socials.instagram"
                            ></IonInput>
                        </IonItem>
                        <p class="optional ion-no-margin">optional</p>
                    </div>

                    <div class="input-group">
                        <IonItem lines="none">
                            <IonIcon :icon="logoFacebook" color="primary"></IonIcon>
                            <IonInput
                                label=""
                                placeholder="Facebook"
                                v-model="businessStore.registration.socials.facebook"
                            ></IonInput>
                        </IonItem>
                        <p class="optional ion-no-margin">optional</p>
                    </div>

                    <div class="input-group">
                        <IonItem lines="none">
                            <IonIcon :icon="globe" color="dark"></IonIcon>
                            <IonInput
                                label=""
                                placeholder="Website"
                                v-model="businessStore.registration.socials.website"
                            ></IonInput>
                        </IonItem>
                        <p class="optional ion-no-margin">optional</p>
                    </div>

                    <div>
                        <p class="font-small">
                            What are your goals and expectations for promoting your brand on Kola Market?
                        </p>
                        <IonTextarea fill="solid" class="kola-input" :maxlength="1000" :counter="true"></IonTextarea>
                        <p class="optional ion-no-margin">optional</p>
                    </div>
                </form>
            </main>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <FooterNavigation @continue="onContinue()"></FooterNavigation>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonCard, IonCardContent,  IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterNavigation from './FooterNavigation.vue';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useForm } from '@/composables/form';
import { logoFacebook, logoInstagram, logoTwitter, globe } from 'ionicons/icons';

export default defineComponent({

    components: { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonFooter, FooterNavigation, IonInput, IonItem, IonIcon, IonLabel, IonTextarea, IonText },

    data() {
        return {
            logoFacebook,
            logoInstagram,
            logoTwitter,
            globe,
            form: useForm({})
        }
    },

    computed: {
        ...mapStores( useBusinessStore )
    },

    methods: {
        onContinue() {
            if( this.form.hasErrors() ) {
                return;
            }

            this.businessStore.cacheRegistrationInfo();
            this.$router.push('/signup/vendor/location-info');
        }
    }
})
</script>

<style lang="scss">
header {

    margin-bottom: 20px;

    p {
        font-size: 0.75em;
    }
}

main {

}

.input-group {
    margin-bottom: 15px;

    ion-item {
        --background: #F6F6F6;
        --color: #74787C;
        --border-color: #E7E6E6;
        --border-width: 1px;
        --border-style: solid;
        --highlight-color-focused: #74787c;
        --border-radius: 8px;
        font-size: 0.9em;
    }
}

p.optional {
    margin-top: 2px;
    font-size: 0.65em;
    color: #a1a1a1;
}
</style>
