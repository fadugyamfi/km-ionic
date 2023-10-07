<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/signup/vendor/brand-info"></IonBackButton>
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

            </main>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <FooterNavigation
                @continue="$router.push('/signup/vendor/stock-info')"
            ></FooterNavigation>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonPage,  IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterNavigation from './FooterNavigation.vue';

export default defineComponent({

    components: { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonFooter, FooterNavigation },

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

main {}
</style>
