<template>
  <ion-page>
    <ion-header class="ion-padding ion-no-border">
      <ion-header id="profile-header" class="inner-header">
        <ion-toolbar>
          <IonButtons slot="start">
            <IonBackButton :defaultHref="`/shopper/profile`"></IonBackButton>
          </IonButtons>
          <ion-title>{{ $t("notifications.title") }}</ion-title>
          <IonButtons slot="end"> </IonButtons>
        </ion-toolbar>
      </ion-header>
    </ion-header>
    <ion-content class="ion-padding-horizontal">
      <IonList lines="none">
        <IonItem
          class="profile-item notification-item"
          :disabled="false"
          router-link="/profile/address"
        >
          <ion-toggle
            ref="notificationToggle"
            label-placement="start"
            justify="space-between"
            :checked="deviceIsRegistered"
            :disabled="loading"
            mode="ios"
            @click="toggleNotifications"
            ><IonLabel class="ion-text-wrap">
              {{ $t("notifications.enableNotifications") }}
              <p>{{ $t("notifications.subscribeToNotifications") }}</p>
            </IonLabel></ion-toggle
          >
        </IonItem>
      </IonList>
      <NotificationSheet :isOpen="showSheet" @didDismiss="cancel()" />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonLabel,
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonPage,
  IonToggle,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import { useDeviceStore } from "@/stores/DeviceStore";
import { useNotificationStore } from "@/stores/NotificationStore";
import AppStorage from "@/stores/AppStorage";
import NotificationSheet from "@/components/notifications/NotificationSheet.vue";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { setupPushNotifications } from "@/setupPushNotification";
import requestPermission from "@/setupPWAPushNotifications";

const storage = new AppStorage();
const deviceStore = useDeviceStore();
const notificationStore = useNotificationStore();
const notificationToggle = ref(null);

const showSheet = ref(false);
const loading = ref(false);

const cancel = () => {
  showSheet.value = false;
  notificationStore.cacheNotificationStatus("cancel");
};

const registeredDevices = computed(() => deviceStore.registeredDevices);
const deviceId = computed(() => deviceStore.deviceId);

const deviceIsRegistered = computed(() =>
  registeredDevices.value.some((device) => device.device_id == deviceId.value)
);
const registeredDevice = computed(() =>
  registeredDevices.value.find((device) => device.device_id == deviceId.value)
);

const toggleNotifications = async (event: any) => {
  try {
    loading.value = true;
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    const value = event.target.checked;
    if (!value) {
      const fcm_token = await storage.get("kola.fcm-token");
      await storage.remove("kola.notification-status");
      
      if (!fcm_token) {
        if (Capacitor.isNativePlatform()) {
          const permission = await PushNotifications.checkPermissions();
          if (permission.receive == "granted") {
            await setupPushNotifications();
            return;
          }
        }
        if (!Capacitor.isNativePlatform()) {
          const permission = window.Notification.permission;
          if (permission == "granted") {
            await requestPermission();
            return;
          }
        }
        const res = await notificationStore.askForNotificationPermission();
        if (res) return (showSheet.value = true);
      }
      await deviceStore.registerDevice(fcm_token);
    } else {
      await deviceStore.unRegisterDevice(registeredDevice.value.id);
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  deviceStore.getDeviceId();
  deviceStore.getUserRegisteredDevices();
});
</script>

<style scoped lang="scss">
.notification-item {
  ion-toggle {
    // --handle-height:
    ion-label {
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
