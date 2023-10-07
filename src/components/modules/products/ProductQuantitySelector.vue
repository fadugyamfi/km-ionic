<template>
    <section class="quantity-selector d-flex ion-align-items-center ion-justify-content-center">
        <IonButton fill="clear" size="small" @click="decreaseQuantity()">
            <IonIcon slot="icon-only" :icon="remove" color="dark"></IonIcon>
        </IonButton>

        <IonInput v-model="quantity" type="number" fill="outline"></IonInput>

        <IonButton fill="clear" size="small" @click="increaseQuantity()">
            <IonIcon slot="icon-only" :icon="add" color="dark"></IonIcon>
        </IonButton>
    </section>
</template>

<script lang="ts">
import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import { add, remove } from 'ionicons/icons';

export default defineComponent({

    components: { IonItem, IonButton, IonInput, IonIcon },

    data() {
        return {
            add,
            remove,
            quantity: 0,
        }
    },

    emits: ['change'],

    methods: {
        decreaseQuantity() {
            if( this.quantity == 0 ) {
                return;
            }

            --this.quantity;
            this.$emit('change', this.quantity);
        },

        increaseQuantity() {
            if( this.quantity >= 1000 ) {
                return;
            }

            ++this.quantity;
            this.$emit('change', this.quantity);
        }
    }
})
</script>

<style lang="scss">
.quantity-selector {
    background-color: #F5F5F5;
    border: none;
    border-radius: 12px;
    margin: 10px 0px;
    padding: 5px 10px;

    ion-input {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        width: 30%;
        min-height: 32px !important;
        height: 32px;
        border-radius: 8px;
        margin: 0px 15px;
    }
}
</style>
