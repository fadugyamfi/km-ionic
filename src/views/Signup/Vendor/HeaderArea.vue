<template>
    <header>
        <h5>{{ title }}</h5>
        <p>
            {{ subtext }}
        </p>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({

    props: {
        title: {
            default: "Title Text",
            type: String
        },
        subtext: {
            default: "Subtext here",
            type: String
        }
    },

    data() {
        return {

        }
    }
})
</script>

<style scoped lang="scss">
header {

    margin-bottom: 20px;

    h5 {
        margin-top: 0px;
    }

    p {
        font-size: 0.75em;
    }
}
</style>
