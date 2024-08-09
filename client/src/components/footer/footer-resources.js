import firebase from "../../fire";

export const submitQuery = (queryInfo) =>
  firebase.firestore().collection("contact-us").add(queryInfo);
