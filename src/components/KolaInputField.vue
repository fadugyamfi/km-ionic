<template>
    <section>
        <IonInput
            class="kola-input"
            :class="{ 'ion-invalid ion-touched': hasError }"
            :type="type"
            :label="label"
            :label-placement="labelPlacement"
            fill="outline"
            :value="modelValue"
            @change="onChange($event.target.value)"
            :required="required"
            :error-text="errorText"
            :maxlength="maxlength"
            :counter="counter"
        >
        </IonInput>
    </section>
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: {
            default: 'Enter Label',
        },
        labelPlacement: {
            default: 'floating'
        },
        type: {
            default: 'text',
            type: String
        },
        modelValue: {
            required: false
        },
        required: {
            default: false
        },
        errorText: {
            default: ''
        },
        hasError: {
            default: false
        },
        counter: {
            default: false
        },
        maxlength: {

        }
    },

    components: { IonInput },

    emits: ['update:modelValue'],

    methods: {
        onChange(value: string): void {
            this.$emit('update:modelValue', value);
        }
    }
});
</script>

<style scoped lang="scss">
.kola-input {
    --background: #F6F6F6;
    --color: #74787C;
    --border-color: #E7E6E6;
    --highlight-color-focused: #74787c;
    --border-radius: 8px;

    &:not(.has-focus):not(.input-label-placement-stacked) {
        .label-text-wrapper {
            bottom: 2.5em;
        }
    }
}


</style>
