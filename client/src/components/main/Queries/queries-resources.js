import firebase from "../../../fire";

const db = firebase.firestore().collection("contact-us");
export const fetchQueriesList = () =>
  db
    .get()
    .then((res) => res.docs.map((d) => ({ ...d.data(), id: d.id })))
    .catch((err) => err);

export const updateQueryStatus = ({ id, status }) =>
  db.doc(id).update({ status });

export const deleteQuery = ({ id }) => db.doc(id).delete();
