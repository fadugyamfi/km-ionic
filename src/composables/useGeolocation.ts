import { Geolocation } from "@capacitor/geolocation";
import { isPlatform } from "@ionic/vue";
import axios from "axios";

export const useGeolocation = () => {
  const hasPermission = async () => {
    if (isPlatform("ios") || isPlatform("android")) {
      const status = await Geolocation.checkPermissions();

      return status.location == "granted";
    }

    return false;
  };

  const requestPermissions = async () => {
    if (isPlatform("ios") || isPlatform("android")) {
      const permissionStatus = await Geolocation.requestPermissions();

      return (permissionStatus.location = "granted");
    }

    return false;
  };

  const getCurrentLocation = async (): Promise<any> => {
    try {
      if (isPlatform("ios") || isPlatform("android")) {
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
    }
  };

  const getDisplayName = async (coordinates: {
    coords: { latitude: number; longitude: number };
  }) => {
    try {
      const lat = coordinates?.coords?.latitude;
      const lon = coordinates?.coords?.longitude;
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
      console.log(error);
    }
  };

  return {
    getCurrentLocation,
    hasPermission,
    requestPermissions,
    getDisplayName,
  };
};
