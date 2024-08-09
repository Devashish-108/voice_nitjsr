import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Modal from "../../../assets/lib/components/modal/modal";

import {
  fetchQnAsList,
  deleteQnA,
  updateQnAStatus,
  addQnA,
} from "./qna-actions";

import "./qna-component.css";

const QnAComponent = (props) => {
  const [QnAData, setQnAData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQnA, setSelectedQnA] = useState({});
  const [isSelectedDelete, setDelete] = useState({});

  const onQnAClick = (data, isdelete) => {
    setSelectedQnA(data);
    setIsModalOpen(true);
    setDelete(isdelete);
  };
  const columns = [
    {
      id: 1,
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Answered By",
      selector: (row) => row.ans_auth,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Answer",
      selector: (row) => row.answer,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Status",
      selector: (row) => (
        <span className="qna-message" onClick={() => onQnAClick(row, false)}>
          <u>{row.status}</u>
        </span>
      ),
      reorder: true,
    },
    {
      id: 6,
      name: "Date",
      cell: (row) =>
        moment(new Date(row.timestamp.toDate())).format("DD/MM/yyyy, h:mm a"),
      sortable: true,
    },
    {
      id: 7,
      name: " ",
      sortable: false,
      cell: (row) => (
        <span className="me-5" onClick={() => onQnAClick(row, true)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      ),
    },
  ];
  useEffect(() => {
    props.getQnAs();
  }, []);
  useEffect(() => {
    renderStatusChangeButton();
    show();
  }, [selectedQnA]);
  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedQnA({});
  };
  const renderDeleteButton = (q) => {
    return (
      <button
        style={{ fontSize: "inherit" }}
        className="btn btn-outline-danger qna-button"
        onClick={() => {
          console.log("delete", selectedQnA);
          props.deleteQnA({ id: selectedQnA.id });
          setTimeout(onModalClose, 1000);
        }}
      >
        Delete
      </button>
    );
  };
  const renderCloseButton = () => {
    return (
      <div className="me-4">
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-success qna-button"
          onClick={() => setTimeout(onModalClose, 400)}
        >
          Cancel
        </button>
      </div>
    );
  };
  const renderStatusChangeButton = () => {
    var button;
    if (selectedQnA.status === "approved") {
      button = (
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-danger "
          onClick={() => {
            props.updateQnAStatus({ id: selectedQnA.id, status: "unapproved" });
            setSelectedQnA({ ...selectedQnA, status: "unapproved" });
          }}
        >
          Mark Unapproved
        </button>
      );
    } else {
      button = (
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-success "
          onClick={() => {
            props.updateQnAStatus({ id: selectedQnA.id, status: "approved" });
            setSelectedQnA({ ...selectedQnA, status: "approved" });
          }}
        >
          Mark Approved
        </button>
      );
    }

    return <div className="me-5">{button}</div>;
  };
  const renderModelUI = () => {
    if (isSelectedDelete) {
      return (
        <div>
          <div>
            <h1 style={{ color: "#131e30" }}>QnA</h1>
          </div>
          <div>
            <span className="qna-details-title">
              Are you sure you want to delete this QnA ?
            </span>
          </div>
          <div>
            <span className="qna-details-title">Question : </span>
            {selectedQnA.question}
          </div>
          <div className="qna-details-2button">
            {renderCloseButton()}
            {renderDeleteButton()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1 style={{ color: "#131e30" }}>QnA</h1>
          </div>
          <div>
            <span className="qna-details-title">Author : </span>
            {selectedQnA.author}
          </div>
          <div>
            <span className="qna-details-title">Question : </span>
            {selectedQnA.question}
          </div>
          <div>
            <span className="qna-details-title">Answered By : </span>
            {selectedQnA.ans_auth}
          </div>
          <div>
            <span className="qna-details-title">Answer : </span>{" "}
            {selectedQnA.answer}
          </div>
          <div>
            <span className="qna-details-title">Status : </span>{" "}
            {selectedQnA.status}
          </div>
          <div className="qna-details-button">{renderStatusChangeButton()}</div>
        </div>
      );
    }
  };
  function show() {
    return (
      <DataTable
        title="QnA"
        columns={columns}
        data={props.qnas}
        defaultSortFieldId={1}
        pagination={true}
        highlightOnHover
      />
    );
  }
  return (
    <div className="qna-parent-container">
      <Modal open={isModalOpen} onClose={onModalClose}>
        <div className="qna-details-container">{renderModelUI()}</div>
      </Modal>
      {show()}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    qnas: state.qnas.QnAs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQnAs: bindActionCreators(fetchQnAsList, dispatch),
    deleteQnA: bindActionCreators(deleteQnA, dispatch),
    updateQnAStatus: bindActionCreators(updateQnAStatus, dispatch),
    addQnA: bindActionCreators(addQnA, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QnAComponent);
