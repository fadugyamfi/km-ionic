<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/signup/vendor"></IonBackButton>
                </IonButtons>
                <IonTitle></IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <header>
                <h5>Let's get you selling on Kola</h5>
                <p>
                    To set up your shop you will upload images, share your story and choose your shop settings
                </p>
            </header>

            <main>
                <IonCard color="light" class="ion-no-margin">
                    <IonCardContent>
                        <section class="item">
                            <span class="connector">
                                <img src="/images/vendor/connector-wrap.svg" />
                            </span>

                            <span class="content">
                                <h6>Personal Details</h6>
                                <p>Please provide personal info</p>
                            </span>
                        </section>

                        <section class="item">
                            <span class="connector">
                                <img src="/images/vendor/connector-wrap.svg" />
                            </span>

                            <span class="content">
                                <h6>Shop Setup</h6>
                                <p>A few details about your shop</p>
                            </span>
                        </section>

                        <section class="item">
                            <span class="connector" style="height: 32px; overflow: hidden;">
                                <img src="/images/vendor/connector-wrap.svg" />
                            </span>

                            <span class="content">
                                <h6>Review</h6>
                                <p>Ensure all information provided is accurate</p>
                            </span>
                        </section>
                    </IonCardContent>
                </IonCard>

                <p class="fw-semibold" style="font-size: 0.85em; color: #667085; margin-top: 25px;">
                    Estimated time to complete: 10 minutes
                </p>
            </main>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton router-link="/signup/vendor/business-info">
                Continue
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import KolaYellowButton from '../../../components/KolaYellowButton.vue';

export default defineComponent({

    components: { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonFooter, KolaYellowButton },

    data() {
        return {

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
    ion-card-content {
        padding-top: 30px !important;
        background-color: #F6F6F6;
    }

    .item {
        display: flex;
        align-items: start;
        margin-top: -10px;

        .connector {
            padding: 0px 10px;
        }

        h6 {
            font-weight: bold;
            font-size: 1em;
            margin-bottom: 5px;
        }

        p {
            font-size: 0.8em;
            color: #74787C;
        }
    }
}
</style>
