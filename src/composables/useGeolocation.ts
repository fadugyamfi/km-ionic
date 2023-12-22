import { Geolocation } from "@capacitor/geolocation";
import { isPlatform } from "@ionic/vue";

export const useGeolocation = () => {

  const hasPermission = async () => {
    if (isPlatform("ios") || isPlatform("android")) {
      const status = await Geolocation.checkPermissions();

      return status.location == "granted";
    }

    return false;
  }

  const requestPermissions = async () => {
    if (isPlatform("ios") || isPlatform("android")) {
      const permissionStatus = await Geolocation.requestPermissions();

      return permissionStatus.location = "granted";
    }

    return false;
  }

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

  return {
    getCurrentLocation,
    hasPermission,
    requestPermissions
  };
};
