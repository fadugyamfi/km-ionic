<template>
    <section>
        <ion-toolbar>
            <ion-buttons slot="primary">
                <ion-button color="yellow">Delete</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </section>
</template>

<script lang="ts">
import { IonButton,IonButtons, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],

    components: {
        IonButton, IonToolbar, IonButtons
    }
})
</script>

<style scoped lang="css">
.kola-yellow-button {
    --background: #F5AA29 !important;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --color: #101828;
    --border-radius: 0.8em;
    --box-shadow: none;
    text-transform: none;
    font-weight: 600;
    font-size: 0.75em;
}
</style>
