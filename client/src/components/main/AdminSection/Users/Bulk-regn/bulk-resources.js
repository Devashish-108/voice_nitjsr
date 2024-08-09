import firebase from "../../../../../fire";

export const registerUser = (payload) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password);
