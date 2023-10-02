<template>
    <section class="brand-pill">
        <IonAvatar>
            <img alt="brand name"
                :src="brand.logo || '/images/no-image.png'"
                @error="onError($event)"
            />
        </IonAvatar>
        <p>{{ brand.name }}</p>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonAvatar } from '@ionic/vue';
import Brand from '@/models/Brand';


export default defineComponent({

    props: {
        brand: {
            required: true,
            type: Brand
        }
    },

    components: { IonAvatar },

    data() {
        return {

        }
    },

    methods: {
        onError(event: Event) {
            (event.target as HTMLImageElement).src = '/images/no-image.png';
        }
    }
})
</script>

<style scoped lang="scss">
.brand-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80px;
    padding: 10px;

    ion-avatar {
        max-width: 60px;
        max-height: 60px;

        img {
            width: 60px !important;
            height: 60px !important;
            object-fit: cover;
        }
    }

    p {
        margin-top: 5px;
        font-size: 0.6em;
        line-height: 1em;
        text-wrap: wrap;
        text-overflow: ellipsis;
    }
}
</style>
