import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'market.kola.app',
  appName: 'Kola Market',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
