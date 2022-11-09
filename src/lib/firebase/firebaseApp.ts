import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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