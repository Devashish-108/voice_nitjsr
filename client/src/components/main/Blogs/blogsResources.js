import firebase from "../../../fire";

const firestore = firebase.firestore();

// export const getAllNews = ({ userId }) =>
//   firebase.firestore().collection("blogs").doc(userId).get();

export const getAllBlogs = (payload) => firestore.collection("blogs").get();