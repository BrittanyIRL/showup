import * as firebase from "firebase";

import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

export function getDatabaseRef(reference) {
  return firebase.database().ref(reference);
}
