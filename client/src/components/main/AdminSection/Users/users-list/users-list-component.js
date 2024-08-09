import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import "./user-list.css";

import UserDetails from "./user-details/user-details";

import { fetchUsersList } from "./user-list-actions";
import history from "../../../../history";
class UserList extends React.Component {
  columns = [
    {
      id: 1,
      name: "Name",
      selector: (row) => (
        <span
          className="user-list-name"
          onClick={() => {
            this.onUserClick(row);
          }}
        >
          {row.name}
        </span>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "User Type",
      selector: (row) => row.userType,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Grad Year",
      selector: (row) => row.yearOfPassing ? row.yearOfPassing : row.gradYear,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Current Job",
      selector: (row) => row.currentJob,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "Current Job Role",
      selector: (row) => row.currentJobRole,
      sortable: true,
      reorder: true,
    },
  ];
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedUser: {},
      searchInput: "",
    };
  }

  handleSearch = (evt) => {
    const searchInput = evt.target.value;

    this.setState(
      {
        searchInput,
      },
      () => {
        this.props.fetchUsersListAction({ searchInput });
      }
    );
  };

  getSubHeaderComponent = () => {
    return (
      <div>
        Search:{" "}
        <input onChange={this.handleSearch} value={this.state.searchInput} />
      </div>
    );
  };

  onUserClick = (data) => {
    this.setState({
      selectedUser: data,
      isModalOpen: true,
    });
  };

  onModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  componentDidMount() {
    this.props.fetchUsersListAction({});
  }

  render() {
    const { usersList } = this.props;
    if (!this.props.user || this.props.user.userType !== "admin") {
      history.push("/");
      return <> </>;
    }
    return (
      <div className="user-list-parent-container">
        {this.state.isModalOpen && (
          <UserDetails
            data={this.state.selectedUser}
            onModalClose={this.onModalClose}
          />
        )}
        <DataTable
          columns={this.columns}
          data={usersList}
          defaultSortFieldId={1}
          pagination={true}
          subHeader
          subHeaderComponent={this.getSubHeaderComponent()}
          // selectableRows={false}
          // expandableRows={true}
          // expandableRowsComponent={UserDetails}
          // expandableRowsComponentProps={(d)=>d}
          // onRowClicked={this.onUserClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersList: state.userList.usersList,
    user: state.profileSection.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsersListAction: bindActionCreators(fetchUsersList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
