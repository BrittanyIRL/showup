import * as firebase from "firebase";

import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

export function getDatabaseRef(reference) {
  return firebase.database().ref(reference);
}

export function getFirebaseCurrentUser() {
  return firebase.auth().currentUser;
}

export function getFirebaseSignUp({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function getFirebaseSignIn({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function getFirebaseSignOut() {
  firebase.auth().signOut();
}
