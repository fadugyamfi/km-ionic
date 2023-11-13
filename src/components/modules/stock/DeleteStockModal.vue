<template>
    <IonModal :isOpen="isOpen" id="delete-customer-modal" ref="modal">
      <div class="wrapper ion-padding">
        <div class="ion-text-center">
          <p class="d-flex ion-justify-content-center">
            <IonAvatar>
              <Image src="/images/vendor/alert-triangle-icon.svg" />
            </IonAvatar>
          </p>
          <h6 class="fw-semibold">
           Are you sure you want to remove this stock?
          </h6>
          <p>
            <IonText color="muted">
              {{ $t("profile.customers.actionIsUnreversible") }}
            </IonText>
          </p>
        </div>
  
        <KolaYellowButton class="ion-margin-top" @click="confirm()">{{
          $t("profile.customers.remove")
        }}</KolaYellowButton>
        <KolaWhiteButton style="margin-top: 8px" @click="dismiss()">{{
          $t("general.cancel")
        }}</KolaWhiteButton>
      </div>
    </IonModal>
  </template>
  
  <script lang="ts">
  import { IonAvatar, IonIcon, IonModal, IonText } from "@ionic/vue";
  import { warningOutline } from "ionicons/icons";
  import { defineComponent } from "vue";
  import KolaYellowButton from "../../KolaYellowButton.vue";
  import KolaWhiteButton from "../../KolaWhiteButton.vue";
  import Image from "@/components/Image.vue";
  export default defineComponent({
    props: {
      isOpen: {
        default: false,
      },
    },
  
    emits: ["dismiss", "confirm"],
  
    data() {
      return {
        warningOutline,
      };
    },
  
    components: {
      IonModal,
      IonIcon,
      IonAvatar,
      IonText,
      KolaYellowButton,
      KolaWhiteButton,
      Image,
    },
  
    methods: {
      close() {
        this.$el.dismiss();
      },
  
      confirm() {
        this.$emit("confirm");
        this.close();
      },
  
      dismiss() {
        this.$emit("dismiss");
        this.close();
      },
    },
  });
  </script>
  
  <style scoped>
  ion-modal#delete-customer-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    padding: 23px;
  }
  
  ion-modal#delete-customer-modal h6 {
    margin: 20px 20px 10px 20px;
    color: var(--gray-900, #101828);
  }
  
  ion-modal#delete-customer-modal ion-icon {
    margin-right: 6px;
    width: 18px;
    height: 28px;
    padding: 4px 0;
    background: var(--warning-100, #fef0c7);
  }
  
  ion-modal#delete-customer-modal .wrapper {
    margin-bottom: 10px;
  }
  
  ion-modal#delete-customer-modal .wrapper p {
    margin-bottom: 1.8em;
    margin-top: 0.25em;
    color: var(--gray-500, #667085);
  }
  </style>
  