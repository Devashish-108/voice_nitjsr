import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import { reducer as fromReducer } from "redux-form";
import auth from "./components/main/Login/auth-reducer";
import view from "./components/main/Login/view-reducer";
import profileSection from "./components/main/Profile/user-reducer";
import userList from "./components/main/AdminSection/Users/users-list/user-list-reducer";
import bulkSection from "./components/main/AdminSection/Users/Bulk-regn/bulk-reducer";
import eventSection from "./components/main/Events/eventsReducer";
import footerReducer from "./components/footer/footer-reducer";
import queries from "./components/main/Queries/queries-reducer";
import qnas from "./components/main/QnA/qna-reducer";
import donorsList from "./components/main/Finance/FinanceReducer";
import testimoniesSection from "./components/main/AdminSection/Testimonies/testimonies-reducer";
import dynamicContentState from "./components/main/AdminSection/ContentUpload/content-upload-reducer";
import blogsSection from "./components/main/Blogs/blogsReducer"
import blogsAdminSection from "./components/main/AdminSection/Blogs/blogs-admin-reducer";

const appReducer = combineReducers({
  auth,
  form: fromReducer,
  view,
  profileSection,
  userList,
  bulkSection,
  eventSection,
  footerReducer,
  queries,
  qnas,
  donorsList,
  testimoniesSection,
  dynamicContentState,
  blogsSection,
  blogsAdminSection,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, middleware);

sagaMiddleware.run(sagas);

export default store;
