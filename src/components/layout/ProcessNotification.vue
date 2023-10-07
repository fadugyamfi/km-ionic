<template>
    <section v-show="toastStore.showUIBlock">
        <IonBackdrop></IonBackdrop>
        <div id="processing" >
            <IonSpinner name="bubbles" color="warning"></IonSpinner>
            <IonText>{{ toastStore.blockText || 'Please wait...' }}</IonText>
        </div>
    </section>
</template>

<script lang="ts">
import { IonBackdrop, IonSpinner, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useToastStore } from '@/stores/ToastStore';
import { mapStores } from 'pinia';

export default defineComponent({

    components: {
    IonBackdrop,
    IonText,
    IonSpinner
},

    computed: {
        ...mapStores( useToastStore )
    }
})
</script>

<style lang="scss">
ion-backdrop {
    --background: #000;
    opacity: 0.8;
}

#processing {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 0px;
    right: 0px;
    margin-top: -80px;
    font-size: 0.9em;
    color: #fff;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    ion-spinner {
        width: 80px;
        height: 80px;
    }
}
</style>
