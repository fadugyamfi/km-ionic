<template>
    <IonButton expand="block" class="kola-yellow-button" type="button">
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
