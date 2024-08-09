export const filter = (data, params, text, caseSensitive) => {
  data.filter((d) => {
    return params.some((p) => {
      const property = caseSensitive ? d[p] : d[p].toLowerCase();
      const searchText = caseSensitive ? text : text.toLowerCase();
      return property.includes(searchText);
    });
  });
};

export const singleFilter = (data, params, text, caseSensitive) => {
  return params.some((p) => {
    if (data[p]) {
      const property = caseSensitive ? data[p] : data[p].toLowerCase();
      const searchText = caseSensitive ? text : text.toLowerCase();
      return property.includes(searchText);
    }
    return false;
  });
};
