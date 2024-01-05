<template>
    <section class="category-pill">
        <IonAvatar>
            <img alt="category name" :src="category.image" />
        </IonAvatar>
        <p>{{ category.name }}</p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonAvatar } from '@ionic/vue';
import ProductCategory from '@/models/ProductCategory';
import Image from '@/components/Image.vue';


export default defineComponent({

    props: {
        category: {
            required: true,
            type: ProductCategory
        }
    },

    components: { IonAvatar, Image },

    data() {
        return {

        }
    },

})
</script>

<style lang="scss">
.category-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80px;
    padding: 10px;

    ion-avatar {
        width: 60px;
        height: 60px;
        min-height: 60px;
        background-color: #f9f9f9;

        img {
            width: 60px !important;
            height: 60px !important;
            min-height: 60px;
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
