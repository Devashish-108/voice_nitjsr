import React from "react";
import history from "../../history";
import AdminNavComponent from "./admin-nav-component";
import { connect } from "react-redux";
import AdminBodyComponent from "./admin-body-component";

class AdminMainComponent extends React.Component {
  render() {
    if (!this.props.user || this.props.user.userType !== "admin") {
      history.push("/admin-section");
      return <> </>;
    }
    return <>
      <AdminNavComponent/>
      <AdminBodyComponent/>
    </>            
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.profileSection.user,
  };
};
export default connect(mapStateToProps)(AdminMainComponent);