import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import UsersList from "../../main/AdminSection/Users/users-main-component.js";
import Testimonies from "./Testimonies/testimonies-component.js";
import EventAdminComponent from "../Events/EventAdmin/EventAdminComponent";
import EventDetails from "../Events/EventDetails";
import QueriesComponent from "../Queries/queries-component";
import FinanceAdmin from "../Finance/FinanceAdmin";
import QnaComponent from "../QnA/qna-component";
import ContentUpload from "../AdminSection/ContentUpload/content-upload-component";
import Under_construction from "../Under-construction";
import Blogs from "./Blogs/blogs-admin-component.js";

class AdminBodyComponent extends React.Component {
  render() {
    return (
        <Routes>
            <Route path="/users" element={<UsersList/>} />
            <Route path="/testimonies" element={<Testimonies/>} />
            <Route
                path="/events"
                element={<EventAdminComponent/>}
            />
            <Route path="/events/:id" element={<EventDetails/>} />
            <Route path="/courses" element={<Under_construction/>} />
            <Route path="/queries" element={<QueriesComponent/>} />
            <Route path="/qna" element={<QnaComponent/>} />
            <Route path="/finance" element={<FinanceAdmin/>} />
            <Route
                path="/content-upload"
                exact
                element={<ContentUpload/>}
            />
            <Route
                path="/blogs"
                exact
                element={<Blogs/>}
            />
            <Route path='*' element={<Navigate to="users" />} />
        </Routes>
    );
  }
}

export default AdminBodyComponent;
