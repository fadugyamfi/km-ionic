import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {

    const getCurrentLocation = async () => {
        try {
            const status = await Geolocation.checkPermissions();

            if( status.location == 'granted' ) {
                return await Geolocation.getCurrentPosition();
            }

            const permissionStatus = await Geolocation.requestPermissions();

            if( permissionStatus.location = 'granted' ) {
                return await Geolocation.getCurrentPosition();
            }

        } catch(error) {
            console.log(error);
        }
    }

    return {
        getCurrentLocation
    }
}
