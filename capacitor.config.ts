import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kola.market.androidApp',
  appName: 'Kola Market',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },

  android: {
    buildOptions: {
      keystorePath: '.\keystore',
      keystoreAlias: 'key0',
    }
  },

  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
