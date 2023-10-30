<template>
    <IonModal ref="modal" :initial-breakpoint="0.50" :breakpoints="[0, 0.50]">
        <IonContent >
            <header class="fw-semibold ion-padding ion-text-center">
                Filter Order History
            </header>
            <main class="ion-padding-vertical">
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonLabel>Date From</IonLabel>
                            <IonInput class="kola-input" type="date" v-model="form.start_dt"></IonInput>
                        </IonCol>
                        <IonCol size="6">
                            <IonLabel>Date To</IonLabel>
                            <IonInput class="kola-input" type="date" v-model="form.end_dt"></IonInput>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </main>
            <footer class="ion-padding">
                <KolaYellowButton @click="update()">
                    Update
                </KolaYellowButton>
            </footer>
        </IonContent>
    </IonModal>
</template>

<script lang="ts">
import { IonCol, IonContent, IonFooter, IonGrid, IonInput, IonLabel, IonModal, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import KolaYellowButton from '../../KolaYellowButton.vue';


export default defineComponent({

    components: {
        IonModal,
        IonContent,
        IonFooter,
        KolaYellowButton,
        IonGrid,
        IonRow,
        IonCol,
        IonLabel,
        IonInput
    },

    data() {
        return {
            form: {
                start_dt: '',
                end_dt: ''
            }
        }
    },

    emits: ['update'],

    methods: {
        update() {
            this.$el.dismiss();
            this.$emit('update', this.form);
        }
    }
})
</script>

<style scoped>
header {
    border-bottom: solid #efefef 1px;
}


ion-modal {
    --border-radius: 2em;
}

ion-input {
    --padding-start: 0.4em;
    --padding-end: .4em;
}
</style>
