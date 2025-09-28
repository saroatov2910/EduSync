import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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
export const auth = getAuth(app);
export const functions = getFunctions(app);

// Connect to Firebase Emulators when running locally
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
}
