import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlbMrWuF7uqaU_G_kTHabThxp5vaKTK6Y",
  authDomain: "musicplayer-a0c3a.firebaseapp.com",
  projectId: "musicplayer-a0c3a",
  storageBucket: "musicplayer-a0c3a.firebasestorage.app",
  messagingSenderId: "814894706039",
  appId: "1:814894706039:web:b327a0f55427934a118572",
  measurementId: "G-CQMCPDYT5H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
