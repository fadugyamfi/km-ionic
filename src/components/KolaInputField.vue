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
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

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
        },
        modelValue: { required: false },
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

    components: { IonInput, IonItem, IonLabel, IonText },

    emits: ['update:modelValue'],

    methods: {
        onChange(value: string): void {
            this.$emit('update:modelValue', value);
        }
    }
});
</script>

<style lang="scss">
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
