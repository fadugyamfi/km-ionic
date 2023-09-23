<template>
    <div class="ion-padding">
        <div class="ion-text-center" style="margin-top: 2em;">
            <img src="/images/disappointed.svg" style="width: 150px; height: 150px;" />
        </div>

        <div class="ion-text-center ion-margin-bottom">
            <h5 class="ion-margin-bottom"><b>No Notifications</b></h5>
            <p class="ion-margin-top" style="font-size: 0.88em;">
                When you have new notifications they will appear here.
                To get push notifications from Kola, open your phone settings
                and allow notifications
            </p>
        </div>

        <KolaYellowButton style="margin-top: 30px;">Enable Notifications</KolaYellowButton>
    </div>
</template>

<script lang="ts">
import { IonContent, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import KolaYellowButton from '../KolaYellowButton.vue';

export default defineComponent({

    components: {
        IonContent,
        IonLabel,
        KolaYellowButton
    }
})
</script>
