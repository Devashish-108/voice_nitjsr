import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../main/Home/home-component";
import SQFrom from "../main/SQ/sq-component";
import QnaUser from "../main/QnA/qna-user-component";
import Under_construction from "../main/Under-construction";
import Events from "../main/Events/event-main-component";
import "./main-content.css";
import Profile from "../main/Profile/Profile-Component";
import AdminComponent from "../main/AdminSection/admin-main-component";
import EventDetails from "../main/Events/EventDetails";
import Blogs from "../main/Blogs/blogs-component";
import Donations from "../main/Donations/donations-component";
import { connect } from "react-redux";

const Content = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      {props.isLoggedIn && !props.isAnonymous && (
        <Route path="/user/profile" element={<Profile/>} />
      )}
      <Route path="/events" element={<Events/>} />
      <Route path="/events/:id" element={<EventDetails/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/donations" element={<Donations/>} />
      <Route path="/sq-form" element={<SQFrom/>} />
      <Route path="/qna-forum" element={<QnaUser/>} />
      <Route path="/under-construction" element={<Under_construction/>} />

      <Route path="/admin-section/*" element={<AdminComponent/>} />
      <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isAnonymous: state.auth.isAnonymous,
  };
}

export default connect(mapStateToProps, null)(Content);
