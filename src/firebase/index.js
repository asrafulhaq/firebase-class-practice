import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVqfgyI4gZKz4dZ3hjix33HqHucPxSrG8",
  authDomain: "mern-stack-apps-42049.firebaseapp.com",
  projectId: "mern-stack-apps-42049",
  storageBucket: "mern-stack-apps-42049.appspot.com",
  messagingSenderId: "604385070956",
  appId: "1:604385070956:web:7fa009baaf04874d832d49",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// init storage
export const storage = getStorage(firebaseApp);

// init fire auth
export const auth = getAuth(firebaseApp);

// google auth provider
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
