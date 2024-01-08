<template>
    <div class="ion-text-center ion-padding-horizontal">
        <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em;">
            <img src="/images/disappointed.svg" style="width: 150px; height: 150px;" />
        </div>

        <p class="fw-bold ion-no-margin">
            {{ title }}
        </p>

        <IonText color="medium" class="" style="font-weight: normal;">
          {{ description }}
        </IonText>

        <KolaYellowButton v-if="showActionButton" class="ion-margin-top" @click="doAction()">
            {{ actionButtonText }}
        </KolaYellowButton>
      </div>
</template>

<script lang="ts">
import { IonText } from '@ionic/vue';
import { defineComponent } from 'vue';
import KolaYellowButton from '../KolaYellowButton.vue';


export default defineComponent({
    props: {

        title: {
            default: "No Results Found",
            type: String
        },
        description: {
            default: "Please try again",
            type: String
        },
        showActionButton: {
            default: false
        },
        actionButtonText: {
            default: "Refresh",
            type: String
        }
    },

    components: { IonText, KolaYellowButton },

    emits: ['action'],

    methods: {
        doAction() {
            this.$emit('action');
        }
    }
});
</script>
