<template>
    <IonButton expand="block" class="kola-white-button" type="button">
        <slot></slot>
    </IonButton>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],

    components: {
        IonButton
    }
})
</script>

<style scoped lang="css">
.kola-white-button {
    --background: #FFF !important;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --color: #101828;
    --border-style: solid;
    --border-color: #101828;
    --border-width: 1px;
    --border-radius: 0.8em;
    --box-shadow: none;
    text-transform: none;
    font-weight: 600;
}
</style>
