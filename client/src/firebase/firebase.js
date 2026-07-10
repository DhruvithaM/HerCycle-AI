import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEF4IxGgwe2Y07LkdhUrxQIzJpOLFsVwI",
  authDomain: "hercycle-ai-a4afd.firebaseapp.com",
  projectId: "hercycle-ai-a4afd",
  storageBucket: "hercycle-ai-a4afd.firebasestorage.app",
  messagingSenderId: "17287263164",
  appId: "1:17287263164:web:8420f15c2de7df9947f1b9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;