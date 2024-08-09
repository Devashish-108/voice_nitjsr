import firebase from "../../../fire";

const db = firebase.firestore().collection("qna");
export const fetchQnAList = () =>
  db
    .get()
    .then((res) => res.docs.map((d) => ({ ...d.data(), id: d.id })))
    .catch((err) => err);
export const deleteQnA = ({ id }) => db.doc(id).delete();
export const updateQnAStatus = ({ id, status }) =>
  db.doc(id).update({ status });
export const addQnA = (payload) => db.add(payload);
