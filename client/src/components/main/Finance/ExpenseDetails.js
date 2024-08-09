import React from "react";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";

import { fetchExpensesList } from "./FinanceActions";
import { map } from "../Events/EventDetails.js";

class ExpenseDetails extends React.Component {
  state = { month: null, total: null };

  componentDidMount = () => {
    this.props.fetchExpensesList();
  };

  expensesDataTable = () => {
    var month = this.state.month;

    if (!month) return;
    var columns = [
      // {
      //     id: 1,
      //     name: "DONOR ID",
      //     selector: (row) => row.donorId,
      //     sortable: true,
      //     reorder: true,
      // },
      {
        id: 2,
        name: "Category",
        selector: (row) => row["CATEGORY"],
        sortable: true,
        reorder: true,
      },
    ];
    if (this.state.month) {
      columns.push({
        id: 3,
        name: `AMOUNT`,
        selector: (row) => row["AMOUNT"],
        sortable: true,
        reorder: true,
      });
    }
    var data = this.props.expenses[month].expense;
    return (
      <div className="finance-parent-container">
        <DataTable
          title="Expense Details"
          columns={columns}
          data={data}
          defaultSortFieldId={3}
          pagination={true}
        />
      </div>
    );
  };

  applyMonthFilter = (e) => {
    var [year, month] = e.target.value.split("-");
    year = Number(year) - 2000;
    month = map[month].substr(0, 3).toUpperCase() + year;
    this.setState({ month });

    var total = this.props.expenses[month].expense.reduce(
      (a, b) => a + b["AMOUNT"],
      0
    );

    this.setState({ total });
  };

  render() {
    var x = new Date().toLocaleDateString().split("/");
    if (x[0].length === 1) {
      x[0] = "0" + x[0];
    }
    return (
      <div className="p-1 finance-table-div">
        <div className="p-2">
          <div className="ps-5 d-flex flex-column align-items-center">
            <label htmlFor="monthInput">
              Pick month to view expense records
            </label>
            <input
              style={{ width: "300px" }}
              id="monthInput"
              className="form-control mb-2"
              type="month"
              name="month"
              min="2022-01"
              max={`${x[2]}-${x[0]}`}
              onChange={this.applyMonthFilter}
            />
          </div>
          <div className="text-center m-3">
            <h5 className="money-summary">
              {this.state.total
                ? `Total Expenditure in ${this.state.month} was ₹${this.state.total}.00`
                : null}
            </h5>
          </div>
          {this.props.expenses ? this.expensesDataTable() : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    expenses: state.donorsList.expenses,
  };
};
export default connect(mapStateToProps, { fetchExpensesList })(ExpenseDetails);