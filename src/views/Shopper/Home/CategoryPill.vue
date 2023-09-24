<template>
    <section class="category-pill">
        <IonAvatar>
            <img alt="category name"
                :src="category.image || '/images/no-image.png'"
                @error="onError($event)"
            />
        </IonAvatar>
        <p>{{ category.name }}</p>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonAvatar } from '@ionic/vue';
import ProductCategory from '@/models/ProductCategory';


export default defineComponent({

    props: {
        category: {
            required: true,
            type: ProductCategory
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

<style lang="scss">
.category-pill {
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
