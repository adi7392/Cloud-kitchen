import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cloudkitchen.app',
  appName: 'Cloud Kitchen',
  webDir: 'dist',
  server: {
    allowNavigation: [
      'checkout.razorpay.com'
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: false
    },
    CapacitorUpdater: {
      autoUpdate: 'atBackground',
      appId: 'com.cloudkitchen.app',
      autoSplashscreen: true
    },
    SplashScreen: {
      launchAutoHide: false
    }
  }
};

export default config;
