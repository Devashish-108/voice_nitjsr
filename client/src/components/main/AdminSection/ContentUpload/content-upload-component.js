import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { excelToJson } from "../../../../assets/lib/utils/readExcel";
import { v4 as uuid } from "uuid";
import "./content-upload-component.css";
import { uploadImage } from "../../../../assets/lib/utils/uploadImage";
import { addDynamicContent } from "./content-upload-action";
import dynamicContentConstants from "../../Home/Dynamic-Contents/dynamic-content-constants";

const ContentUpload = (props) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState();
  const handleFile = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      // console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const getSavedFile = (err, url) => {
    if (err) {
      return setFileUploadError(err);
    }
    if (url) {
      setLoading(false);
      if (
        file.type === dynamicContentConstants.FILE_TYPES.XLSX ||
        file.type === dynamicContentConstants.FILE_TYPES.XLS
      ) {
        excelToJson(file, (data) => {
          console.log(data);
          props.addDynamicContent({ url, type: file.type, data });
        });
      } else {
        props.addDynamicContent({ url, type: file.type, data: null });
      }
    }
  };

  const handleUpload = () => {
    if (file) {
      setLoading(true);
      uploadImage(
        "dynamic-content",
        `${uuid()}_${file.name}_${file.type}`,
        file,
        getSavedFile
      );
    }
  };

  return (
    <div className="admin-section-container content-upload-container">
      <h3>Content Upload</h3>
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}> Upload </button>
      {loading && <p>Loading...</p>}
      {fileUploadError && <p>{fileUploadError.message}</p>}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addDynamicContent: bindActionCreators(addDynamicContent, dispatch),
  };
}

const mapStateToProps = (state) => {
  return {
    dynamicContent: state.dynamicContentState.dynamicContent,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentUpload);
