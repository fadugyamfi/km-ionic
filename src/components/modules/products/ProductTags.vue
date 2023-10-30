<template>
    <section>
        <IonChip
            v-for="tag in product?.tags" :key="tag.name"
        >
            {{ tag.name }}
        </IonChip>
    </section>
</template>

<script lang="ts">
import { IonChip } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import Product from '@/models/Product';

export default defineComponent({

    props: {
        product: {
            type: Object as PropType<Product | null>
        }
    },

    components: { IonChip },

    data() {
        return {

        }
    }
})
</script>

<style lang="css">
ion-chip {
    --color: var(--kola-blue);
    --background: #F0F9FF;
    font-size: 0.8em;
    border-radius: 16px;
    padding: 6px 10px 6px 10px;
    margin-right: 3px;
    height: auto;
}
</style>
