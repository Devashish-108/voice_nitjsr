import * as XLSX from "xlsx";

export const getColumns = (json_object) => {
  const columns = {};

  json_object.map((obj) => {
    Object.keys(obj).map((ob) => (columns[ob] = 1));
  });

  return Object.keys(columns);
};

export const excelToJson = (file, callBack) => {
  var reader = new FileReader();

  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary",
    });
    workbook.SheetNames.forEach(function (sheetName) {
      // Here is your object sheet_to_row_object_array , sheet_to_row_object_array
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName]
      );
      var json_object = JSON.stringify(XL_row_object);
      json_object = JSON.parse(json_object);

      const columns = getColumns(json_object);

      callBack({ columns, rows: json_object });
    });
  };

  reader.onerror = function (ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};
