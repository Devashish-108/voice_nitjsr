import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./bulk-resources";

export function* registerUser({ payload }) {
  // todo: need to make it for an array of users
  // registration is working, profile creation pending
  try {
    var response = yield call(restApi.registerUser, payload[0]);

    response = {
      ...response,
      name: payload[0].name,
      contact: payload[0].mobile,
      address: payload[0].address,
      pincode: payload[0].pincode,
      gotra: payload[0].gotra,
      batch: payload[0].batch,
      wifeName: payload[0].wifeName,
      fatherName: payload[0].fatherName,
      motherName: payload[0].motherName,
      initiatedName: payload[0].initiatedName,
      whatsapp: payload[0].whatsapp,
      gradYear: payload[0].gradYear,
      dateOfBirth: payload[0].dateOfBirth,
      counsellorName: payload[0].counsellorName,
      currentJob: payload[0].currentJob,
      currentJobRole: payload[0].currentJobRole,
    };

    yield put({ type: "BULK_REGN_SUCCESS", payload: response });
  } catch (err) {
    yield put({ type: "BULK_REGN_FAILURE", payload: err });
  }
}

export function* watchRegisterUser() {
  yield takeLatest("BULK_REGN", registerUser);
}

export const BulkSagas = [fork(watchRegisterUser)];
