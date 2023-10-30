<template>
    <IonModal :isOpen="isOpen" id="delete-sale-modal" ref="modal">
        <div class="wrapper ion-padding">
            <div class="ion-text-center">
                <p class="d-flex ion-justify-content-center">
                    <IonAvatar>
                        <IonIcon :icon="warningOutline" color="danger"></IonIcon>
                    </IonAvatar>
                </p>

                <p class="fw-semibold">
                    {{ $t('vendor.sales.confirmDeleteSale') }}
                </p>
                <p>
                    <IonText color="muted">
                        {{ $t('vendor.sales.actionIsUnreversible') }}
                    </IonText>
                </p>
            </div>

            <KolaYellowButton class="ion-margin-top" @click="confirm()">{{ $t('general.delete') }}</KolaYellowButton>
            <KolaWhiteButton style="margin-top: 8px;" @click="dismiss()">{{ $t('general.cancel') }}</KolaWhiteButton>


        </div>
    </IonModal>
</template>

<script lang="ts">
import { IonAvatar, IonIcon, IonModal, IonText } from '@ionic/vue';
import { warningOutline } from 'ionicons/icons';
import { PropType, defineComponent } from 'vue';
import { Sale } from '../../../models/Sale';
import KolaYellowButton from '../../KolaYellowButton.vue';
import KolaWhiteButton from '../../KolaWhiteButton.vue';


export default defineComponent({
    props: {
        isOpen: {
            default: false,
        },

        sale: {
            default: null,
            type: Object as PropType<Sale | null>
        }
    },

    emits: ['dismiss', 'confirm'],

    data() {
        return {
            warningOutline
        };
    },

    components: { IonModal, IonIcon, IonAvatar, IonText, KolaYellowButton, KolaWhiteButton },

    methods: {
        close() {
            this.$el.dismiss();
        },

        confirm() {
            this.$emit('confirm');
            this.close();
        },

        dismiss() {
            this.$emit('dismiss');
            this.close();
        }
    }
})
</script>

<style scoped>
ion-modal#delete-sale-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#delete-sale-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#delete-sale-modal ion-icon {
    margin-right: 6px;
    width: 48px;
    height: 48px;
    padding: 4px 0;
}

ion-modal#delete-sale-modal .wrapper {
    margin-bottom: 10px;
}


ion-modal#delete-sale-modal .wrapper p {
    margin-bottom: 0.25em;
    margin-top: 0.25em;
}
</style>
