import firebase from "../../../fire";

export const uploadImage = (ref, title, image, callback) => {
  const uploadTask = firebase.storage().ref(`${ref}/${title}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
      callback(error, null);
    },
    () => {
      firebase
        .storage()
        .ref(ref)
        .child(title)
        .getDownloadURL()
        .then((url) => {
          callback(null, url);
        });
    }
  );
};
