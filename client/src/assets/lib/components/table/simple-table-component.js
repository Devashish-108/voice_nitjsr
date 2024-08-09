import React from "react";

const SimpleTable = (props) => {
  const { columns, rows } = props;

  return (
    <table>
      <thead>
        <tr>{columns && columns.map((clmn) => <th>{clmn}</th>)}</tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => (
            <tr>{columns && columns.map((clmn) => <td>{row[clmn]}</td>)}</tr>
          ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
