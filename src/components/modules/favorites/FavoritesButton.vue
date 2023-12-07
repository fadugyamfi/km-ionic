<template>
    <IonButton @click="showFavorites()">
        <IonIcon :icon="heartOutline" color="dark"></IonIcon>
    </IonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FavoritesModal from './FavoritesModal.vue';
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import { heartOutline } from 'ionicons/icons';

export default defineComponent({

    components: {
        IonButton,
        FavoritesModal,
        IonIcon
    },

    data() {
        return {
            heartOutline
        }
    },

    methods: {
        async showFavorites() {
            const modal = await modalController.create({
                component: FavoritesModal,
            });

            modal.present();

            const { data, role } = await modal.onWillDismiss();

            if (role === 'confirm') {
                // message.value = `Hello, ${data}!`;
            }
        }
    }
});
</script>
