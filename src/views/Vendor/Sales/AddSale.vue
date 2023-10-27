<template>
    <IonPage>
        <IonRouterOutlet></IonRouterOutlet>
    </IonPage>
</template>

<script lang="ts">
import { IonPage, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
        IonRouterOutlet,
        IonPage
    }
})
</script>
