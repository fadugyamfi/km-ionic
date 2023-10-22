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
      </div>
</template>

<script lang="ts">
import { IonText } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
    props: {

        title: {
            default: "No Results Found",
            type: String
        },
        description: {
            default: "Please try again",
            type: String
        }
    },

    components: { IonText }
});
</script>
