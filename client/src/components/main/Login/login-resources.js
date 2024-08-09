import firebase from "../../../fire";

export const getAnonymousLoginData = () => firebase.auth().signInAnonymously();

export const deleteAnonymousLoginUser = () => {
  if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
    return firebase.auth().currentUser.delete();
  }
};

export const getLoginData = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const forgotPassword = ({ email }) =>
  firebase.auth().sendPasswordResetEmail(email);

export const doRegistration = ({ email, password }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
