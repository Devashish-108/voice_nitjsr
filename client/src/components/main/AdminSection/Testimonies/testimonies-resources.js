import firebase from "../../../../fire";

const collection = "testimonies";

export const addTestimonies = (payload) =>
  firebase.firestore().collection(collection).add(payload);

export const fetchTestimonies = () =>
  firebase.firestore().collection(collection).get();
