import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import constants from "./dynamic-content-constants";
import "./dynamic-content-component.css";
import { fetchDynamicContent } from "../../AdminSection/ContentUpload/content-upload-action";
import SimpleTable from "../../../../assets/lib/components/table/simple-table-component";

const DynamicContentComponent = (props) => {
  useEffect(() => {
    props.fetchDynamicContent();
  }, []);
  if (props.dynamicContent && props.dynamicContent.length) {
    return (
      <div className="dynamic-content-component">
        <hr/>
        {props.dynamicContent.map((cnt) => {
          if (cnt.type === constants.FILE_TYPES.PDF) {
            return (
              <div key={cnt.url} className="dynamic-content-component-child">
                <object
                  width="100%"
                  height="400"
                  data={cnt.url}
                  type={cnt.applicationType}
                >
                  {" "}
                </object>
              </div>
            );
          } else if (
            cnt.type === constants.FILE_TYPES.XLSX ||
            cnt.type === constants.FILE_TYPES.XLS
          ) {
            return (
              <div key={cnt.url} className="dynamic-content-component-child dynamic-content-component-xlsx">
                <SimpleTable rows={cnt.data.rows} columns={cnt.data.columns} />
              </div>
            );
          } else if (cnt.type === constants.FILE_TYPES.IMAGE) {
            return (
              <div key={cnt.url} className="dynamic-content-component-child">
                <img className="dynamic-content-component-image" src={cnt.url} />
              </div>
            );
          }
        })}
      </div>
    );
  }
  return "";
};

function mapStateToProps(state) {
  return {
    dynamicContent: state.dynamicContentState.dynamicContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDynamicContent: bindActionCreators(fetchDynamicContent, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicContentComponent);
