<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <IonImg
        src="/images/vendor/signup-complete-header.jpg"
        height="400"
      ></IonImg>

      <main class="ion-padding">
        <HeaderArea
          :title="$t('signup.vendor.youAreOnTheWaitlist')"
          :subtext="$t('signup.vendor.congratulatoryMessage')"
        ></HeaderArea>
      </main>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        v-if="!loginDisabled"
        router-link="/shopper"
        class="ion-margin-bottom"
      >
        {{ $t("signup.vendor.continueToShopping") }}
      </KolaYellowButton>

      <KolaWhiteButton href="https://wa.me/233270404501">
        {{ $t("signup.vendor.chatWithKola") }}
      </KolaWhiteButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
import HeaderArea from "./HeaderArea.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    IonImg,
    HeaderArea,
  },

  data() {
    return {};
  },

  computed: {
    ...mapStores(useBusinessStore, useUserStore),

    loginDisabled() {
      return !!import.meta.env.VITE_LOGIN_DISABLED == true;
    },
  },

  mounted() {
    this.businessStore.loadCachedRegistrationInfo();

    if (!this.loginDisabled && this.userStore.appMode == "guest") {
      this.userStore.fetchUserInfo();
      // this.userStore.fetchUserBusinesses();
    }
  },
});
</script>
