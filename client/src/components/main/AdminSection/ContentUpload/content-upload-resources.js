import firebase from "../../../../fire";

const collection = "dynamic-content";

export const addDynamicContent = (payload) =>
  firebase.firestore().collection(collection).add(payload);

export const fetchDynamicContent = () =>
  firebase.firestore().collection(collection).get();
