import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHwAKQjmPGNs9kKl8Iz_HfAum5jWrPZGc",
  authDomain: "fb-project-273b5.firebaseapp.com",
  projectId: "fb-project-273b5",
  storageBucket: "fb-project-273b5.appspot.com",
  messagingSenderId: "540970186458",
  appId: "1:540970186458:web:b03519c46f1328501497e3",
  measurementId: "G-DFD5BTGDX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db= getFirestore(app);
export const storage = getStorage(app);