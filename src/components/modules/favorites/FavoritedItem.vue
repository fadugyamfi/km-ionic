<template>
    <IonItem class="favorite-item success">
        <ProfileAvatar
            :username="title"
            :image="image"
        >
        </ProfileAvatar>
        <IonLabel>
            <header>{{ title }}</header>
            <footer>{{ format(favorite?.created_at) }}</footer>
        </IonLabel>
    </IonItem>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmarkCircleOutline, checkmark, checkmarkCircle, warningOutline } from 'ionicons/icons';
import { relativeTime } from '@/utilities';
import ProfileAvatar from '../../ProfileAvatar.vue';


export default defineComponent({

    props: ['favorite'],

    components: {
        IonIcon,
        IonItem,
        IonLabel,
        ProfileAvatar
    },

    data() {
        return {
            checkmarkCircleOutline,
            checkmark,
            checkmarkCircle,
            warningOutline,
        }
    },

    computed: {
        title() {
            if( this.favorite.favoritable_type?.includes('Product') ) {
                return this.favorite.favoritable?.product_name;
            }

            return this.favorite.favoritable?.name;
        },

        image() {
            if( this.favorite.favoritable_type?.includes('Product') ) {
                return this.favorite.favoritable?.image;
            }

            if( this.favorite.favoritable_type?.includes('Brand') ) {
                return this.favorite.favoritable?.logo;
            }

            return this.favorite.favoritable?.logo;
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
.favorite-item {
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
