<template>
    <IonGrid>
        <IonRow>
            <IonCol size="6">
                <KolaWhiteButton @click="back()">
                    {{ backText }}
                </KolaWhiteButton>
            </IonCol>
            <IonCol size="6">
                <KolaYellowButton @click="$emit('continue')">
                    {{ continueText }}
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

    props: {
        doDefaultBackAction: {
            default: true,
            type: Boolean
        },
        backText: {
            default: "Back",
            type: String
        },
        continueText: {
            default: "Continue",
            type: String
        }
    },

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
    },

    methods: {
        back() {
            if( this.doDefaultBackAction ) {
                this.$router.go(-1);
                return;
            }

            this.$emit('back');
        }
    }
})
</script>
