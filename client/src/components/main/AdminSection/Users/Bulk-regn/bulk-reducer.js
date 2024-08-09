import firebase from "../../../../../fire";

const initial_state = { bulkUser: null };

const bulkSection = (state = initial_state, action) => {
  switch (action.type) {
    case "BULK_REGN_SUCCESS":
      var obj = {
        name: action.payload.name,
        email: action.payload.user.email,
        contact: action.payload.contact,
        address: action.payload.address,
        pincode: action.payload.pincode,
        gotra: action.payload.gotra,
        batch: action.payload.batch,
        wifeName: action.payload.wifeName,
        fatherName: action.payload.fatherName,
        motherName: action.payload.motherName,
        initiatedName: action.payload.initiatedName,
        whatsapp: action.payload.whatsapp,
        gradYear: action.payload.gradYear,
        dateOfBirth: action.payload.dateOfBirth,
        counsellorName: action.payload.counsellorName,
        currentJob: action.payload.currentJob,
        currentJobRole: action.payload.currentJobRole,
        joined: new Date().toLocaleDateString(),
      };
      var uid = firebase.auth().currentUser.uid;

      firebase.firestore().collection("users").doc(uid).set(obj);

      return { ...state, bulkUser: action.payload };
    case "BULK_REGN_FAILURE":
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default bulkSection;
