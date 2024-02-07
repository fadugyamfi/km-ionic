<template>
    <section class="brand-pill">
        <IonAvatar>
            <Image alt="brand name" :src="brand.logo" w="150" />
        </IonAvatar>
        <p>{{ brand.name }}</p>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonAvatar } from '@ionic/vue';
import Brand from '@/models/Brand';
import Image from '@/components/Image.vue';


export default defineComponent({

    props: {
        brand: {
            required: true,
            type: Brand
        }
    },

    components: { IonAvatar, Image },

    data() {
        return {

        }
    },

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
