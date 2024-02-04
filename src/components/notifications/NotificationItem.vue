<template>
    <IonItem :button="true" class="notification-item success">
        <IonIcon slot="start" :icon="checkmarkCircleOutline"></IonIcon>
        <IonLabel>
            <header>{{ notification?.title }}</header>
            <footer>{{ format(notification?.created_at) }}</footer>
        </IonLabel>
    </IonItem>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmarkCircleOutline, checkmark, checkmarkCircle, warningOutline } from 'ionicons/icons';
import { relativeTime } from '@/utilities';


export default defineComponent({

    props: ['notification'],

    components: {
        IonIcon,
        IonItem,
        IonLabel
    },

    data() {
        return {
            checkmarkCircleOutline,
            checkmark,
            checkmarkCircle,
            warningOutline,
        }
    },

    methods: {
        format(value: string) {
            return relativeTime(value);
        }
    }
})
</script>

<style scoped lang="scss">
.notification-item {
    ion-icon {
        padding: 5px 5px;
        border-radius: 50%;
        align-items: center;
        display: flex;
        justify-content: center;
        margin-right: 10px;
    }

    &.success {
        ion-icon {
            background-color: #21d1882f;
            color: #21D187;
        }
    }

    &.error {
        ion-icon {
            background-color: #ff2d2d46;
            color: #FF2D2D;
        }
    }

    ion-label {
        font-weight: normal;

        header {
            font-size: 0.9em;
        }

        footer {
            font-size: 0.75em;
            color: #9B9EA0;
        }
    }
}


</style>
