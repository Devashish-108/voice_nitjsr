export const register = (user) => {
  return {
    type: "BULK_REGN",
    payload: user,
  };
};
