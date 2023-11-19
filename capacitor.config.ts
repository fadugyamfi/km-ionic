import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kola.market.androidApp',
  appName: 'Kola Market',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
,
    android: {
       buildOptions: {
          keystorePath: 'c:\Users\icewa\.android\keystore',
          keystoreAlias: 'key0',
       }
    }
  };

export default config;
