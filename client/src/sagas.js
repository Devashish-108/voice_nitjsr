import { all } from "redux-saga/effects";

import { LoginSagas } from "./components/main/Login/login-sagas";
import { ProfileSagas } from "./components/main/Profile/profile-sagas";
import { UsersListSagas } from "./components/main/AdminSection/Users/users-list/user-list-sagas";
import { BulkSagas } from "./components/main/AdminSection/Users/Bulk-regn/bulk-sagas";
import { EventSagas } from "./components/main/Events/eventSagas";
import { FooterSaga } from "./components/footer/footer-sagas";
import { QueriesSagas } from "./components/main/Queries/queries-sagas";
import { QnAsSagas } from "./components/main/QnA/qna-sagas";
import { DonorsListSagas } from "./components/main/Finance/FinanceSagas";
import { TestimoniesSagas } from "./components/main/AdminSection/Testimonies/testimonies-sagas";
import { ContentSagas } from "./components/main/AdminSection/ContentUpload/content-upload-sagas";
import { blogsAdminSagas } from "./components/main/AdminSection/Blogs/blogs-admin-sagas";
import { blogsSagas } from "./components/main/Blogs/blogsSagas";

export default function* sagas() {
  yield all([
    ...LoginSagas,
    ...ProfileSagas,
    ...UsersListSagas,
    ...BulkSagas,
    ...EventSagas,
    ...FooterSaga,
    ...QueriesSagas,
    ...QnAsSagas,
    ...DonorsListSagas,
    ...TestimoniesSagas,
    ...ContentSagas,
    ...blogsSagas,
    ...blogsAdminSagas,
  ]);
}
