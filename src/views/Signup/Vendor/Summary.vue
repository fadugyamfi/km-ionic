<template>
  <IonPage class="vendor-signup-summary">
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/signup/vendor"></IonBackButton>
        </IonButtons>
        <IonTitle></IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <HeaderArea
        :title="$t('signup.vendor.letsGetYouSellingOnKola')"
        :subtext="$t('signup.vendor.toSetUpYourShop')"
      ></HeaderArea>

      <main>
        <IonCard color="light" class="ion-no-margin">
          <IonCardContent>
            <section class="item">
              <span class="connector">
                <img src="/images/vendor/connector-wrap.svg" />
              </span>

              <span class="content">
                <h6>{{ $t("signup.vendor.summary.personalDetails") }}</h6>
                <p>
                  {{ $t("signup.vendor.summary.pleaseProvidePersonalInfo") }}
                </p>
              </span>
            </section>

            <section class="item">
              <span class="connector">
                <img src="/images/vendor/connector-wrap.svg" />
              </span>

              <span class="content">
                <h6>{{ $t("signup.vendor.summary.shopSetup") }}</h6>
                <p>
                  {{ $t("signup.vendor.summary.aFewDetailsAboutYourShop") }}
                </p>
              </span>
            </section>

            <section class="item">
              <span class="connector" style="height: 32px; overflow: hidden">
                <img src="/images/vendor/connector-wrap.svg" />
              </span>

              <span class="content">
                <h6>{{ $t("signup.vendor.summary.review") }}</h6>
                <p>
                  {{
                    $t(
                      "signup.vendor.summary.ensureAllInformationProvidedIsAccurate"
                    )
                  }}
                </p>
              </span>
            </section>
          </IonCardContent>
        </IonCard>

        <p
          class="fw-semibold"
          style="font-size: 0.85em; color: #667085; margin-top: 25px"
        >
          {{
            $t("signup.vendor.summary.estimatedTimeToComplete", { minutes: 10 })
          }}
        </p>
      </main>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <FooterNavigation
        :doDefaultBackAction="userStore?.isInShoppingMode()"
        :backText="$t('general.cancel')"
        @back="$router.replace('/signup')"
        @continue="onContinue()"
      ></FooterNavigation>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
import HeaderArea from "./HeaderArea.vue";
import FooterNavigation from "./FooterNavigation.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonFooter,
    KolaYellowButton,
    HeaderArea,
    FooterNavigation,
  },

  data() {
    return {};
  },

  computed: {
    ...mapStores(useBusinessStore, useUserStore),
  },

  methods: {
    onContinue() {
      if (this.userStore.appMode !== "guest") {
        this.businessStore.cacheRegistrationInfo();
        this.$router.push("/profile/company/business-info");
        return;
      }
      this.$router.push("/signup/vendor/personal-info");
    },
    autoFillDetails() {
      Object.assign(
        this.businessStore.registration,
        { ...this.userStore.activeBusiness, country_id: 83, region_id: 54 },
        { attributes: this.businessStore.registration.attributes },
        { socials: this.businessStore.registration.socials },
        { user: this.businessStore.registration.user }
      );
    },
  },
  mounted() {
    if (this.userStore.appMode !== "guest") {
      this.autoFillDetails();
    }
  },
});
</script>

<style scoped lang="scss">
.vendor-signup-summary {
  header {
    margin-bottom: 20px;

    p {
      font-size: 0.75em;
    }
  }

  main {
    ion-card-content {
      padding-top: 30px !important;
      background-color: #f6f6f6;
    }

    .item {
      display: flex;
      align-items: start;
      margin-top: -10px;

      .connector {
        padding: 0px 10px;
      }

      h6 {
        font-weight: 500;
        font-size: 1em;
        margin-bottom: 5px;
      }

      p {
        font-size: 0.8em;
        color: #74787c;
      }
    }
  }
}
</style>
