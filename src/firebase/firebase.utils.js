import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAp5xX6oYHCGrQZNoKXSC4CW-dUKMDFxZw",
  authDomain: "crwn-db-38998.firebaseapp.com",
  databaseURL: "https://crwn-db-38998.firebaseio.com",
  projectId: "crwn-db-38998",
  storageBucket: "crwn-db-38998.appspot.com",
  messagingSenderId: "420044472551",
  appId: "1:420044472551:web:db46f415b103f9b3fc2242",
  measurementId: "G-WHX4F3V9EV",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
