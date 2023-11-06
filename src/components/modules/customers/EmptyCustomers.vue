<template>
  <div class="ion-text-center ion-padding-horizontal">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em">
      <img src="/images/disappointed.svg" style="width: 150px; height: 150px" />
    </div>
    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom"><b>You have no customers</b></h5>
      <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
        You can start by adding new customers
      </p>
    </div>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="addCustomer()" class="ion-margin-bottom">
        Add Customer
      </KolaYellowButton>
      <KolaGreenButton> Invite customers </KolaGreenButton>
    </IonFooter>
  </div>
</template>

<script lang="ts">
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaGreenButton from "@/components/KolaGreenButton.vue";
import { IonText, IonFooter } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonText, IonFooter, KolaYellowButton, KolaGreenButton },

  methods: {
    addCustomer() {
      this.$router.push('/profile/company/customers/add-customer');
    },
  },
});
</script>
