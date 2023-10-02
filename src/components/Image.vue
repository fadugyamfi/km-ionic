<template>
    <img :src="src || noImage" @error="onLoadError($event)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';


export default defineComponent({

    props: {
        src: {
            type: String as PropType<string|undefined>
        }
    },

    data() {
        return {
            noImage: '/images/no-image.png'
        }
    },

    methods: {
        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.noImage;
        }
    }
});
</script>

<style scoped lang="scss">
img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>
