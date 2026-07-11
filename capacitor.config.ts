import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.critaceous.app',
  appName: 'Critaceous',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      // Disable native HTTP interceptor to allow Angular HttpClient
      enabled: false,
    },
  },
};

export default config;