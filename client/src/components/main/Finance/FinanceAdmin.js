import React from "react";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import { fetchDonorsList } from "./FinanceActions";
import FinanceDetails from "./FinanceDetails.js";
import ExpenseDetails from "./ExpenseDetails.js";
import firebase from "../../../fire.js";

import "./Finance.css";

class FinanceAdmin extends React.Component {
  state = { month: null, total: null };
  handleFileUpload = (e) => {
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

      const dataStringLines = data.split(/\r\n|\n/);

      const headers = dataStringLines[2].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );

      // for(let i = 3; i < dataStringLines.length; i++){
      //     var rowData = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
      //     if(!rowData[1]) break;

      //     var donorId = rowData[1]; var name = rowData[2]

      //     // console.log({donorId,name})
      //     var donorObject = {donorId,name};
      //     donorObject[headers[3]] = rowData[3];
      //     donorObject[headers[4]] = rowData[4];

      //     for(var j = 6; j < headers.length; j++){
      //         var [month,year] = headers[j].split("'")
      //         var k = month.substr(0,3).toUpperCase()+year
      //         donorObject[k] = rowData[j] ? Number(rowData[j]) : 0;
      //     }
      //     console.log(donorObject)
      //     firebase.firestore().collection('donors').doc(donorId).set(donorObject)
      // }
    };
    //     if(file)
    //         reader.readAsBinaryString(file);
  };

  handleExpenseFileUpload = (e) => {
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

      const dataStringLines = data.split(/\r\n|\n/);
      const month = dataStringLines[0]
        .split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[1]
        .split("'")
        .join("");

      const headers = dataStringLines[1].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      console.log(headers);
      var expense = [];
      for (let i = 2; i < dataStringLines.length; i++) {
        var rowData = dataStringLines[i].split(
          /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );

        if (!rowData[0]) break;

        var expenseMonthObject = {};
        expenseMonthObject[headers[0]] = rowData[0];
        expenseMonthObject[headers[1]] = Number(rowData[1]);

        expense.push(expenseMonthObject);
      }

      console.log(expense);
      firebase.firestore().collection("expenses").doc(month).set({ expense });
    };
    if (file) reader.readAsBinaryString(file);
  };
  render() {
    var x = new Date().toLocaleDateString().split("/");
    if (x[0].length === 1) {
      x[0] = "0" + x[0];
    }
    return (
      <div className="ps-5 pe-5">
        <h1 className="blueH1 text-center mt-3 mb-2">FINANCE ADMIN</h1>
        <div className="p-5 pb-2 d-flex justify-content-around">
          <div className="m-1 me-2">
            <h3>Upload Donation File</h3>
            <input
              type="file"
              className="m-1 form-control"
              accept=".csv,.xlsx,.xls"
              onChange={this.handleFileUpload}
            />
          </div>
          <div className="m-1 ms-2">
            <h3>Upload Expense File</h3>
            <input
              type="file"
              className="m-1 form-control"
              accept=".csv,.xlsx,.xls"
              onChange={this.handleExpenseFileUpload}
            />
            <br />
            <a
              href="https://docs.google.com/spreadsheets/d/1DXBFyYUMRe-78NOcFQ04RdTyqFDKgNOYTaUSVtMqqik/edit?usp=sharing"
              target="_blank"
            >
              Sample File Format
            </a>
          </div>
        </div>
        <div className="d-flex pt-2">
          <FinanceDetails />
          <ExpenseDetails />
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//     return {
//         donors: state.donorsList.donorsList
//     }
// }
export default connect(null, {})(FinanceAdmin);
