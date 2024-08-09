import firebase from "../../../../../fire";
import constants from "./user-list-constants";

export const getUsersList = () =>
  firebase.firestore().collection(constants.USERS).get();

export const updateUserType = ({ id, userType }) =>
  firebase.firestore().collection(constants.USERS).doc(id).update({ userType });
