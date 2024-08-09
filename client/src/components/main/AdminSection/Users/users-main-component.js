import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../../../history";
import { changeUsersMainView } from "./users-list/user-list-actions";
import UsersList from "./users-list/users-list-component";
import BulkRegnComponent from "./Bulk-regn/bulk-regn-component";
import AddUser from "./addUser.js"

const UsersMainComponent = (props) => {

  useEffect(()=>{
    props.changeUsersMainView("masterList");
  }, [])
  const viewChangeHandler = (view) => {
    props.changeUsersMainView(view);
  };
  if (!props.user || props.user.userType !== "admin") {
    history.push("/");
    return <> </>;
  }

  return (
    <div className="mt-2" id="events_main" style={{ minHeight: "60vh" }}>
      <h1 className="mb-3 mt-3 text-center blueH1">USERS ADMIN</h1>
      <div className="event-admin-panel">
        <div className="controls">
          <p
            onClick={() => viewChangeHandler("masterList")}
            className="event-control-button"
          >
            Users List
          </p>
          <p
            onClick={() => viewChangeHandler("bulkAdd")}
            className="event-control-button"
          >
            Bulk Registeration
          </p>
          <p
            onClick={() => viewChangeHandler("addUser")}
            className="event-control-button"
          >
            Add User
          </p>
        </div>
        <div className="view">
          {props.view === 'masterList' && <UsersList />}
          {props.view === 'bulkAdd' && <BulkRegnComponent />}
          {props.view === 'addUser' && <AddUser />}
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.profileSection.user,
    view: state.userList.view,
  };
}

export default connect(mapStateToProps, { changeUsersMainView })(
    UsersMainComponent
);
