<template>
    <IonModal ref="modal" :initial-breakpoint="0.50" :breakpoints="[0, 0.50]">
        <IonContent>
            <header class="fw-semibold ion-padding ion-text-center">
                Filter Sales History
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

                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonLabel>Sale Type</IonLabel>
                            <IonSelect class="kola-input" fill="solid" label-placement="stacked"
                                       v-model="form.sale_types_id" :label="$t('vendor.sales.selectSaleType')">
                                <IonSelectOption value="1">{{ 'Cash Sale' }}</IonSelectOption>
                                <IonSelectOption value="5">{{ 'Credit Sale' }}</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </main>
            <footer class="ion-padding">
                <KolaYellowButton @click="update()">
                    {{ $t('general.update') }}
                </KolaYellowButton>
            </footer>
        </IonContent>
    </IonModal>
</template>

<script lang="ts">
import { IonCol, IonContent, IonFooter, IonGrid, IonInput, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption } from '@ionic/vue';
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
        IonInput,
        IonSelect,
        IonSelectOption
    },

    data() {
        return {
            form: {
                start_dt: '',
                end_dt: '',
                sale_types_id: ''
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
