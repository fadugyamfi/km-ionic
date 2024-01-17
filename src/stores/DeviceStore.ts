import axios from "axios";
import { defineStore } from "pinia";
import { Device } from "@capacitor/device";
import { useUserStore } from "./UserStore";
import { handleAxiosRequestError } from "@/utilities";
import appPackage from "../../package.json";

type useDeviceState = {
  deviceInfo: {
    model: string;
    operatingSystem: any;
    osVersion: string;
    androidSDKVersion?: any;
  };
  deviceId: any;
};

export const useDeviceStore = defineStore("device", {
  state: (): useDeviceState => ({
    deviceInfo: {
      model: "",
      operatingSystem: "",
      osVersion: "",
    },
    deviceId: null,
  }),

  actions: {
    async logDeviceInfo() {
      const info = await Device.getInfo();
      this.deviceInfo = info;
    },
    async getDeviceId() {
      const { identifier } = await Device.getId();
      this.deviceId = identifier;
    },
    async registerDevice(fcm_token: any) {
      try {
        await this.logDeviceInfo();
        await this.getDeviceId();

        const response = await axios.post(
          `/v2/users/${useUserStore().user?.id}/devices`,
          {
            cms_users_id: useUserStore().user?.id,
            device_id: this.deviceId,
            device_os: this.deviceInfo?.operatingSystem,
            app_version: appPackage?.version || "0.0.0",
            device_model: this.deviceInfo?.model,
            fcm_token: fcm_token,
            fcm_code: null,
            android_version: this.deviceInfo?.osVersion,
          }
        );
        if (response) {
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
  },
});
