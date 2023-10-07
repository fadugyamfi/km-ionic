<template>
    <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <KolaWhiteButton @click="$router.go(-1)">
                            Back
                        </KolaWhiteButton>
                    </IonCol>
                    <IonCol size="6">
                        <KolaYellowButton @click="$emit('continue')">
                            Continue
                        </KolaYellowButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';

export default defineComponent({

    components: {
        IonGrid,
        IonRow,
        IonCol,
        KolaWhiteButton,
        KolaYellowButton
    },

    emits: ['back', 'continue'],

    data() {
        return {

        }
    }
})
</script>
