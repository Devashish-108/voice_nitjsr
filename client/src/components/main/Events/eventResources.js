import firebase from "../../../fire";
import { query, getDocs, where } from "firebase/firestore";

const firestore = firebase.firestore();

const startOfToday = new Date();
startOfToday.setUTCHours(0, 0, 0, 0);

export const getAllEvents = (payload) => firestore.collection("events").get();

export const getEvent = ({ collection, id }) =>
  firestore.collection(collection).doc(id).get();

export const addEvent = ({ collection, event }) =>
  firestore.collection(collection).add(event);

export const updateEvent = ({ eventId, values }) =>
  firestore.collection("events").doc(eventId).update(values);

export const deleteEvent = ({ collection, id }) =>
  firestore.collection(collection).doc(id).delete();

export const getEventImages = ({ collection, doc, subCollection }) =>
  firestore.collection(`${collection}/${doc}/${subCollection}`).get();

export const deleteImageFromStorage = ({ filename }) =>
  firebase.storage().ref(`eventsPosters/${filename}`).delete();

export const deleteImageFromDB = ({ dbcollection, docId }) =>
  firestore.collection(dbcollection).doc(docId).delete();
