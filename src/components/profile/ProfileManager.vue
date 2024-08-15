<template>
  <ion-content class="ion-padding" :fullscreen="true">
    <IonCard
      v-if="appStore.installingUpdate"
      color="primary"
      class="ion-no-margin ion-margin-bottom"
    >
      <IonCardContent class="d-flex ion-align-items-center">
        <IonSpinner
          name="crescent"
          class="ion-margin-end"
          color="light"
        ></IonSpinner>
        <IonText>{{ $t("profile.installingUpdates") }}</IonText>
      </IonCardContent>
    </IonCard>

    <ion-header id="profile-header" class="inner-header ion-margin-bottom">
      <ion-toolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <ion-title>{{ $t("profile.profile") }}</ion-title>
        <IonButtons slot="end">
          <NotificationButton></NotificationButton>
        </IonButtons>
      </ion-toolbar>
    </ion-header>

    <IonSegment value="company" mode="ios" v-model="viewing">
      <IonSegmentButton value="company" @click="swiperEl?.slideTo(0)">
        <ion-label>{{ $t("profile.company") }}</ion-label>
      </IonSegmentButton>
      <IonSegmentButton value="personal" @click="swiperEl?.slideTo(1)">
        <IonLabel>{{ $t("profile.personal") }}</IonLabel>
      </IonSegmentButton>
    </IonSegment>

    <Swiper
      :slides-per-view="1"
      @swiper="onSwiperInit($event)"
      @slide-change="onSlideChange($event)"
    >
      <SwiperSlide>
        <CompanyActions></CompanyActions>
      </SwiperSlide>
      <SwiperSlide>
        <PersonalActions></PersonalActions>
      </SwiperSlide>
    </Swiper>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToast,
  IonCard,
  IonCardContent,
  IonText,
  IonSpinner,
} from "@ionic/vue";
import { informationCircleOutline, search } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import PersonalActions from "@/components/profile/PersonalActions.vue";
import CompanyActions from "@/components/profile/CompanyActions.vue";
import { ref } from "vue";
import ModeToggleCard from "../cards/ModeToggleCard.vue";
import { useAppStore } from "../../stores/AppStore";
import GeneralActions from "./GeneralActions.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Ref } from "vue";
import { computed } from "vue";
import NotificationButton from "@/components/notifications/NotificationButton.vue";

const userStore = useUserStore();
const appStore = useAppStore();
const viewing = ref("company");

const canToggleModes = computed(() => {
  return (
    !userStore.activeRole?.isSalesAssociate()
  );
});

let swiperEl: Ref<any> = ref(null);

const onSwiperInit = (event: any) => {
  swiperEl.value = event;
};

const onSlideChange = (event: any) => {
  if (event.activeIndex == 1) {
    viewing.value = "personal";
  } else {
    viewing.value = "company";
  }
};
</script>

<style scoped lang="scss">
// See @/theme/profile.scss for global styles

ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>
