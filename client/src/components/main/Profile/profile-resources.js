import firebase from "../../../fire";

export const getUserData = ({ userId }) =>
  firebase.firestore().collection("users").doc(userId).get();

export const updateUserProfile = ({ userId, values }) =>
  firebase.firestore().collection("users").doc(userId).update(values);
