import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { register } from "./bulk-action";
import history from "../../../../history";
import "./bulk-regn.css"

const BulkRegistration = (props) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    insertDataToFirebase(list);

    setData(list);
    setColumns(columns);
  };

  const insertDataToFirebase = (list) => {
    dispatch(register(list));
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  if (!props.user || props.user.userType !== "admin") {
    history.push("/");
    return <> </>;
  }

  return (
    <div id="container" className="pt-3" style={{width:"100%"}}>
      <h3>Upload CSV File</h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload}/>
      {/* <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    csvCols: state.columns,
    csvData: state.data,
    user: state.profileSection.user,
  };
};

export default connect(mapStateToProps, { register })(BulkRegistration);
