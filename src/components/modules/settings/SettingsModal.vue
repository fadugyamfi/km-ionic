<template>
  <section class="ion-padding">
    <ion-header class="inner-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <IonButton @click="cancel()">
            <IonIcon :icon="close"></IonIcon>
          </IonButton>
        </ion-buttons>
        <ion-title size="small" class="fw-bold">
          {{ $t('settings.title') }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <IonIcon></IonIcon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding-top" :fullscreen="true" :scoll-y="false">

      <IonList lines="none">
        <IonItem v-if="isPwa" :detail="true" :button="true" class="profile-item" @click="refresh()">
          <IonAvatar slot="start">
            <IonIcon :icon="refreshOutline"></IonIcon>
          </IonAvatar>
          <IonLabel>{{ $t('settings.refreshApplication') }}</IonLabel>
        </IonItem>

        <IonItem :detail="true" :button="true" class="profile-item" @click="confirmClear()">
          <IonAvatar slot="start">
            <IonIcon :icon="close"></IonIcon>
          </IonAvatar>
          <IonLabel>
            <p><IonText color="dark">{{ $t('settings.clearCaches') }}</IonText></p>
            <p style="line-height: 1em;">
              <IonText color="medium" class="font-medium ion-text-wrap">
                {{ $t('settings.clearCachesDescription') }}
              </IonText>
            </p>
          </IonLabel>
        </IonItem>

        <IonItem class="profile-item" @click="incrementTaps()">
          <IonAvatar slot="start" class="ion-align-self-start">
            <IonIcon :icon="bookOutline"></IonIcon>
          </IonAvatar>
          <IonLabel>
            <p>{{ $t('settings.about') }}</p>
            <p class="font-medium">
              <IonText color="medium">App Version: {{ appVersion }}</IonText>
            </p>
            <section class="ion-margin-top" v-if="devMode">
              <p v-for="key in Object.keys(environmentVariables)" :key="key" class="font-medium ion-text-wrap ">
                <IonText color="medium"><b>{{ key }}:</b> {{ environmentVariables[key] }}</IonText>
              </p>
            </section>
          </IonLabel>
        </IonItem>
      </IonList>

      <ConfirmModal
        :is-open="showClearConfirm"
        :title="$t('settings.confirmClearCache')"
        :description="$t('settings.confirmClearCacheDescription')"
        @confirm="clearCaches()"
      ></ConfirmModal>

    </ion-content>
  </section>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
  modalController,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonList,
  IonItem,
  IonAvatar,
  IonText
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { isPlatform, getPlatforms } from '@ionic/vue';
import { arrowBack, close, refreshOutline, bookOutline } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import appPackage from '../../../../package.json';
import AppStorage from '@/stores/AppStorage';
import ConfirmModal from '../../modals/ConfirmModal.vue';
import { useToastStore } from '../../../stores/ToastStore';

const storage = new AppStorage();

export default defineComponent({

  components: {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonList,
    IonItem,
    IonAvatar,
    IonText,
    ConfirmModal
},

  data() {
    return {
      name: null,
      close,
      refreshOutline,
      bookOutline,
      showClearConfirm: false,
      devMode: false,
      taps: 0
    }
  },

  computed: {
    ...mapStores(useUserStore, useToastStore),

    isPwa() {
      return isPlatform('pwa') || isPlatform('mobileweb') || isPlatform('desktop')
    },

    appVersion() {
      return appPackage?.version || '0.0.0';
    },

    environmentVariables() {
      return import.meta.env;
    }
  },

  methods: {
    incrementTaps() {
      this.taps++;

      if( this.taps >= 10 ) {
        this.devMode = true;
      }
    },

    refresh() {
      window.location.reload();
    },

    cancel() {
      modalController.dismiss(null, 'cancel');
    },

    confirmClear() {
      this.showClearConfirm = false;
      setTimeout(() => this.showClearConfirm = true);
    },

    clearCaches() {
      this.showClearConfirm = false;
      storage.clearAll([
        'kola.user',
        'kola.user-businesses',
        'kola.auth',
        'kola.app-mode',
        'kola.active-business',
        'kola.onboarded'
      ])

      this.toastStore.showSuccess('Cached data cleared successfully')
    },

    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {

      }
    }
  },

 async  mounted() {
    console.log( import.meta.env );
    await storage.init();
  }
})

</script>

<style scoped lang="scss">
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>
