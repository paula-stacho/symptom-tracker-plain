import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: 'AIzaSyD7_-6Dv_lNqwGmCoAM1-wiMkgjyOA5o5Y',
  authDomain: 'symptom-tracker-plain.firebaseapp.com',
  projectId: 'symptom-tracker-plain',
  storageBucket: 'symptom-tracker-plain.appspot.com',
  messagingSenderId: '1064080435759',
  appId: '1:1064080435759:web:17dfc2e5a944e8d8fab4da'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const { RE_CAPTCHA_KEY } = APP_CONFIG;
if (!RE_CAPTCHA_KEY) { console.error('App misconfiguration - missing reCaptchaKey'); }
console.log({ RE_CAPTCHA_KEY });

// Initialize AppCheck
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RE_CAPTCHA_KEY),
  isTokenAutoRefreshEnabled: true
});