import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Modal from "../../../assets/lib/components/modal/modal";

import {
  fetchQueriesList,
  updateQueryStatus,
  deleteQuery,
} from "./queries-actions";

import "./queries-component.css";

const QueriesComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState({});

  const onQueryClick = (data) => {
    setSelectedQuery(data);
    setIsModalOpen(true);
  };
  const columns = [
    {
      id: 1,
      name: "Name",
      selector: (row) => row.name,
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
      name: "Message",
      selector: (row) => (
        <span className="queries-message" onClick={() => onQueryClick(row)}>
          {row.message}
        </span>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Date",
      selector: (row) => row.date.sort,
      sortable: true,
      reorder: true,
      cell: (row) => row.date.display,
    },
    {
      id: 5,
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
    },
  ];

  useEffect(() => {
    props.getQueries();
  }, []);
  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuery({});
  };
  const renderStatusChangeButton = (q) => {
    var button;
    if (q.status === "resolved") {
      button = (
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-danger"
          onClick={() => {
            props.updateQueryStatus({ id: q.id, status: "unresolved" });
            setSelectedQuery({ ...q, status: "unresolved" });
          }}
        >
          Mark Unresolved
        </button>
      );
    } else {
      button = (
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-success"
          onClick={() => {
            props.updateQueryStatus({ id: q.id, status: "resolved" });
            setSelectedQuery({ ...q, status: "resolved" });
          }}
        >
          Mark Resolved
        </button>
      );
    }

    return <div className="me-5">{button}</div>;
  };
  const renderDeleteButton = (q) => {
    return (
      <button
        style={{ fontSize: "inherit" }}
        className="btn btn-outline-danger"
        onClick={() => {
          props.deleteQuery({ id: q.id });
          setTimeout(onModalClose, 1000);
        }}
      >
        Delete
      </button>
    );
  };
  return (
    <div className="queries-parent-container">
      <Modal open={isModalOpen} onClose={onModalClose}>
        <div className="queries-details-container">
          <div>
            <span className="queries-details-title">Name:</span>{" "}
            {selectedQuery.name}
          </div>
          <div>
            <span className="queries-details-title">Email:</span>{" "}
            {selectedQuery.email}
          </div>
          <div>
            <span className="queries-details-title">Message:</span>{" "}
            {selectedQuery.message}
          </div>
          <div className="d-flex mt-2">
            {renderStatusChangeButton(selectedQuery)}
            {renderDeleteButton(selectedQuery)}
          </div>
        </div>
      </Modal>
      <DataTable
        title="Queries"
        columns={columns}
        data={props.queries}
        defaultSortFieldId={1}
        pagination={true}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    queries: state.queries.queries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQueries: bindActionCreators(fetchQueriesList, dispatch),
    updateQueryStatus: bindActionCreators(updateQueryStatus, dispatch),
    deleteQuery: bindActionCreators(deleteQuery, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueriesComponent);
