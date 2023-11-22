<template>
    <IonModal :isOpen="isOpen" id="confirm-modal" ref="modal">
        <div class="wrapper ion-padding">
            <div class="ion-text-center">
                <p class="d-flex ion-justify-content-center">
                    <IonAvatar>
                        <IonIcon :icon="warningOutline" color="danger"></IonIcon>
                    </IonAvatar>
                </p>

                <p class="fw-semibold">
                    {{ title }}
                </p>
                <p>
                    <IonText color="muted">
                        {{ description }}
                    </IonText>
                </p>
            </div>

            <KolaYellowButton class="ion-margin-top" @click="confirm()">{{ $t('general.yes') }}</KolaYellowButton>
            <KolaWhiteButton style="margin-top: 8px;" @click="dismiss()">{{ $t('general.no') }}</KolaWhiteButton>


        </div>
    </IonModal>
</template>

<script lang="ts">
import { IonAvatar, IonIcon, IonModal, IonText } from '@ionic/vue';
import { warningOutline } from 'ionicons/icons';
import { PropType, defineComponent } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';


export default defineComponent({
    props: {
        isOpen: {
            default: false,
        },

        title: {
            default: 'Confirm Action',
            type: String
        },

        description: {
            default: 'Are you sure you want to proceed?',
            type: String
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
            this.$emit('dismiss');
            this.$el.dismiss();
        },

        confirm() {
            this.$emit('confirm');
            this.close();
        },

        dismiss() {
            this.close();
        }
    }
})
</script>

<style scoped>
ion-modal#confirm-modal {
    --width: fit-content;
    --min-width: 250px;
    --max-width: 90%;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#confirm-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#confirm-modal ion-icon {
    margin-right: 6px;
    width: 48px;
    height: 48px;
    padding: 4px 0;
}

ion-modal#delete-modal .wrapper {
    margin-bottom: 10px;
}


ion-modal#delete-modal .wrapper p {
    margin-bottom: 0.25em;
    margin-top: 0.25em;
}
</style>
