<template>
  <div class="ion-padding">
    <div class="ion-text-center" style="margin-top: 2em">
      <img src="/images/disappointed.svg" style="width: 150px; height: 150px" />
    </div>

    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom">
        <b>{{ $t("notifications.noNotifications") }} </b>
      </h5>
      <p v-if="status !== 'denied'" class="ion-margin-top">
        {{ $t("notifications.newNotificationsWillAppearHere") }}
      </p>
      <p v-if="status == 'denied' && Capacitor.isNativePlatform()">
        {{ $t("notifications.notificationsAreBlockedOnNative") }}
      </p>
      <p v-if="status == 'denied' && !Capacitor.isNativePlatform()">
        {{ $t("notifications.notificationsAreBlockedOnWeb") }}
      </p>
    </div>
    <KolaYellowButton
      v-if="status == 'default'"
      style="margin-top: 30px"
      @click="enableNotification"
      >{{ $t("notifications.enableNotifications") }}</KolaYellowButton
    >
  </div>
</template>

<script lang="ts">
import { IonContent, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import KolaYellowButton from "../KolaYellowButton.vue";
import { notification } from "@/composables/notification";
import { setupPushNotifications } from "@/setupPushNotification";
import requestPermission from "@/setupPWAPushNotifications";
import { Capacitor } from "@capacitor/core";

export default defineComponent({
  components: {
    IonContent,
    IonLabel,
    KolaYellowButton,
  },

  data() {
    return {
      notification: notification(),
      status: null as any,
      Capacitor,
    };
  },
  methods: {
    async getNotificationStatus() {
      const { getNotificationStatus } = notification();
      this.status = await getNotificationStatus();
    },
    async enableNotification() {
      let result;
      if (Capacitor.isNativePlatform()) {
        result = await setupPushNotifications();
      } else {
        result = await requestPermission();
      }
      if (result) {
        this.$emit("refresh");
      }
    },
  },
  mounted() {
    this.getNotificationStatus();
  },
});
</script>

<style lang="scss" scoped>
p {
  font-size: 0.88em;
}
</style>
