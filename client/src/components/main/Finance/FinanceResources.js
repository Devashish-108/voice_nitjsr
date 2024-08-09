import firebase from "../../../fire.js";

export const getDonorsList = (payload) =>
  firebase.firestore().collection(payload).get();

export const getExpensesList = (payload) =>
  firebase.firestore().collection(payload).get();
