<template>
    <IonCard>
        <IonCardContent>
            <section v-if="mode == 'shopping'">
                <IonCardTitle>Shopping Mode</IonCardTitle>
                <IonCardSubtitle>
                    You are currently in shopping mode.
                    Toggle the button to switch to your vendor profile
                </IonCardSubtitle>
            </section>

            <section v-if="mode == 'vendor'">
                <IonCardTitle>Vendor Mode</IonCardTitle>
                <IonCardSubtitle>
                    You are currently in Vendor mode.
                    Toggle the button to switch to your Shopper profile
                </IonCardSubtitle>
            </section>

            <section>
                <IonToggle @ion-change="onToggle()"></IonToggle>
            </section>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonText, IonToggle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            mode: 'shopping'
        };
    },

    components: { IonCard, IonCardContent, IonText, IonCardTitle, IonCardSubtitle, IonToggle },

    methods: {
        onToggle() {
            this.mode = this.mode == 'shopping' ? 'vendor' : 'shopping';
        }
    }
});
</script>


<style scoped lang="scss">

ion-card {
    ion-card-content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        ion-card-title {
            font-size: 1em;
            font-weight: bold;
            border-bottom: solid 1px #F1F1F1;
            padding-top: 5px;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        ion-card-subtitle {
            font-size: 0.75em;
        }

        ion-toggle {
            margin-left: 2em;
        }
    }
}
</style>
