import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Example HTTP function
export const helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase Functions!");
});

// Example Firestore trigger
export const onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    console.log("New user created:", snap.data());
    return null;
  });
