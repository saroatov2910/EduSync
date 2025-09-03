import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6n_5qN0Dtb5gj3scI37jhoHY-1lqBGn4",
  authDomain: "communication-update.firebaseapp.com",
  projectId: "communication-update",
  storageBucket: "communication-update.firebasestorage.app",
  messagingSenderId: "163847987709",
  appId: "1:163847987709:web:88384b9da53c9504b63994"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);