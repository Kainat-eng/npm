import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCKm_nkddKMACaB-R-V2I9du0uJqQK6xzY",
  authDomain: "server-eye-c6fc8.firebaseapp.com",
  projectId: "server-eye-c6fc8",
  storageBucket: "server-eye-c6fc8.firebasestorage.app",
  messagingSenderId: "170087251153",
  appId: "1:170087251153:web:e9ff471aff1dcf8467d9f0",
  measurementId: "G-D7C3G2C9MX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }; // ✅ Export auth explicitly