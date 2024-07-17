import { Geolocation } from "@capacitor/geolocation";
import { isPlatform, getPlatforms } from "@ionic/vue";
import { useUserStore } from "@/stores/UserStore";
import axios from "axios";
import { useToastStore } from "../stores/ToastStore";
import { Capacitor } from "@capacitor/core";

export const useGeolocation = () => {
  const hasPermission = async () => {
    if (Capacitor.isNativePlatform()) {
      const status = await Geolocation.checkPermissions();

      return status.location == "granted";
    }

    return false;
  };

  const requestPermissions = async () => {
    if (Capacitor.isNativePlatform()) {
      const permissionStatus = await Geolocation.requestPermissions();

      return (permissionStatus.location = "granted");
    }

    return false;
  };

  const getCurrentLocation = async (): Promise<any> => {
    const userStore = useUserStore();
    try {
      userStore.locationLoading = true;
      if ((isPlatform("ios") || isPlatform("android")) && !isPlatform('mobileweb')) {
        const status = await Geolocation.checkPermissions();

        if (status.location == "granted") {
          return await Geolocation.getCurrentPosition();
        }

        const permissionStatus = await Geolocation.requestPermissions();

        if ((permissionStatus.location = "granted")) {
          return await Geolocation.getCurrentPosition();
        }
      } else {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        if (position) {
          return position;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      userStore.locationLoading = false;
    }
  };

  const getDisplayName = async (coordinates: {
    coords: { latitude: number; longitude: number };
  }) => {
    const userStore = useUserStore();
    try {
      userStore.locationLoading = true;
      const lat = coordinates?.coords?.latitude;
      const lon = coordinates?.coords?.longitude;

      if (!lat && !lon) {
        const toastStore = useToastStore();
        toastStore.showError('Please enable device Location', 'Device Location Unknown', 'top');
        return null;
      }

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;

      const response = await axios.get(url);
      if (response && response.data) {
        const location = response.data.display_name;
        return location;
      } else {
        // alert($t("Error getting location information"));
        return null;
      }
    } catch (error) {
      return null;
    } finally {
      userStore.locationLoading = false;
    }
  };

  return {
    getCurrentLocation,
    hasPermission,
    requestPermissions,
    getDisplayName,
  };
};
