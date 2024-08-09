import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Modal from "../../../../assets/lib/components/modal/modal"


import {
    fetchBlogs,
    deleteBlog,
    updateBlogStatus,
    addBlog,
} from "./blogs-admin-actions";

import "./blogs-admin-component.css";

const BlogComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [isSelectedDelete, setDelete] = useState({});

  const onBlogClick = (data, isdelete) => {
    setSelectedBlog(data);
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
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Description",
      selector: (row) => row.desc,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Status",
      selector: (row) => (
        <span className="blog-request-message" onClick={() => onBlogClick(row, false)}>
          <u>
            {row.isApproved? "Approved" : "Unapproved"}
          </u>
        </span>
      ),
      reorder: true,
    },
    {
      id: 6,
      name: "Date",
      cell: (row) =>
        row.timestamp ? moment(new Date(row.timestamp.toDate())).format("DD/MM/yyyy, h:mm a") : 'Timestamp not available',
      sortable: true,
    },
    {
      id: 7,
      name: " ",
      sortable: false,
      cell: (row) => (
        <span className="me-5" onClick={() => onBlogClick(row, true)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      ),
    },
  ];
  useEffect(() => {
    props.getBlogs();
  }, []);
  useEffect(() => {
    renderStatusChangeButton();
    show();
  }, [selectedBlog]);
  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedBlog({});
  };
  const renderDeleteButton = (q) => {
    return (
      <button
        style={{ fontSize: "inherit" }}
        className="btn btn-outline-danger blog-request-button"
        onClick={() => {
          console.log("delete", selectedBlog);
          props.deleteBlog({ id: selectedBlog.id });
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
          className="btn btn-outline-success blog-request-button"
          onClick={() => setTimeout(onModalClose, 400)}
        >
          Cancel
        </button>
      </div>
    );
  };
  const renderStatusChangeButton = () => {
    var button;
    if (selectedBlog.isApproved) {
      button = (
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-danger "
          onClick={() => {
            props.updateBlogStatus({ id: selectedBlog.id, isApproved: false });
            setSelectedBlog({ ...selectedBlog, isApproved: false });
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
            props.updateBlogStatus({ id: selectedBlog.id, isApproved: true });
            setSelectedBlog({ ...selectedBlog, isApproved: true });
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
            <h1 style={{ color: "#131e30" }}>Blog</h1>
          </div>
          <div>
            <span className="blog-request-details-title">
              Are you sure you want to delete this Blog ?
            </span>
          </div>
          <div>
            <span className="blog-request-details-title">Title : </span>
            {selectedBlog.title}
          </div>
          <div className="blog-request-details-2button">
            {renderCloseButton()}
            {renderDeleteButton()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1 style={{ color: "#131e30" }}>Blog</h1>
          </div>
          <div>
            <span className="blog-request-details-title">Author : </span>
            {selectedBlog.author}
          </div>
          <div>
            <span className="blog-request-details-title">Title : </span>
            {selectedBlog.title}
          </div>
          <div>
            <span className="blog-request-details-title">Description : </span>{" "}
            {selectedBlog.desc}
          </div>
          <div>
            <span className="blog-request-details-title">Status : </span>{" "}
            {selectedBlog.isApproved ? "Approved" : "Unapproved"}
          </div>
          <div className="blog-request-details-button">{renderStatusChangeButton()}</div>
        </div>
      );
    }
  };
  function show() {
    return (
      <DataTable
        title="Blog"
        columns={columns}
        data={props.blogs}
        defaultSortFieldId={1}
        pagination={true}
        highlightOnHover
      />
    );
  }
  return (
    <div className="blog-request-parent-container">
      <Modal open={isModalOpen} onClose={onModalClose}>
        <div className="blog-request-details-container">{renderModelUI()}</div>
      </Modal>
      {show()}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    blogs: state.blogs.blogs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlogs: bindActionCreators(fetchBlogs, dispatch),
    deleteBlog: bindActionCreators(deleteBlog, dispatch),
    updateBlogStatus: bindActionCreators(updateBlogStatus, dispatch),
    addBlog: bindActionCreators(addBlog, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogComponent);
